function round(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function validateNumber(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} is required and must be a valid number.`);
  }
}

function validateNonNegativeNumber(value, label) {
  validateNumber(value, label);
  if (value < 0) {
    throw new Error(`${label} must be zero or greater.`);
  }
}

function validatePositiveNumber(value, label) {
  validateNumber(value, label);
  if (value <= 0) {
    throw new Error(`${label} must be greater than zero.`);
  }
}

function parseDate(value, label) {
  if (!value) {
    throw new Error(`${label} is required.`);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${label} must be a valid date.`);
  }

  return parsed;
}

function parseTime(value, label) {
  if (!value) {
    throw new Error(`${label} is required.`);
  }

  const parts = value.split(":").map(Number);
  if (parts.length !== 2 || parts.some((part) => Number.isNaN(part))) {
    throw new Error(`${label} must be a valid time.`);
  }

  return parts;
}

function calculateLoanPayment({ principal, annualRate, years }) {
  validatePositiveNumber(principal, "Loan amount");
  validateNonNegativeNumber(annualRate, "Annual interest rate");
  validatePositiveNumber(years, "Loan term");

  if (years > 50) {
    throw new Error("Loan term looks unrealistic. Please enter 50 years or less.");
  }

  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? principal / numberOfPayments
      : (principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: round(monthlyPayment),
    totalPayment: round(totalPayment),
    totalInterest: round(totalInterest),
  };
}

function calculatePercentage({ value, percentage }) {
  validateNonNegativeNumber(value, "Base value");
  validateNumber(percentage, "Percentage");

  const result = (value * percentage) / 100;
  return {
    result: round(result),
    percentageLabel: `${round(percentage, 2)}% of ${new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(value)}`,
  };
}

function calculateCompoundInterest({ principal, annualRate, timesPerYear, years }) {
  validatePositiveNumber(principal, "Starting amount");
  validateNonNegativeNumber(annualRate, "Annual rate");
  validatePositiveNumber(timesPerYear, "Compounds per year");
  validatePositiveNumber(years, "Years");

  if (years > 100) {
    throw new Error("Years looks unrealistic. Please enter 100 years or less.");
  }

  const amount = principal * Math.pow(1 + annualRate / 100 / timesPerYear, timesPerYear * years);
  return {
    finalAmount: round(amount),
    interestEarned: round(amount - principal),
  };
}

function calculateDateDifference({ startDate, endDate }) {
  const start = parseDate(startDate, "Start date");
  const end = parseDate(endDate, "End date");
  const reversed = end < start;

  const diffMs = Math.abs(end.getTime() - start.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = round(days / 7, 1);

  return {
    days,
    weeks,
    directionNote: reversed
      ? "The dates were reversed, so the calculator returned the absolute difference."
      : "The result shows the forward difference between the selected dates.",
  };
}

function calculateAge({ birthDate, asOfDate }) {
  const birth = parseDate(birthDate, "Birth date");
  const asOf = asOfDate ? parseDate(asOfDate, "As-of date") : new Date();

  if (birth > asOf) throw new Error("Birth date must be on or before the as-of date.");

  let years = asOf.getFullYear() - birth.getFullYear();
  let months = asOf.getMonth() - birth.getMonth();
  let days = asOf.getDate() - birth.getDate();

  if (days < 0) {
    const previousMonthDays = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
    days += previousMonthDays;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  if (years > 130) throw new Error("Age looks unrealistic. Please check the dates.");

  const ageParts = [
    { value: years, unit: "year" },
    { value: months, unit: "month" },
    { value: days, unit: "day" },
  ]
    .filter((part) => part.value > 0)
    .map((part) => `${part.value} ${part.unit}${part.value === 1 ? "" : "s"}`);

  return {
    years,
    months,
    days,
    ageText: ageParts.length > 0 ? ageParts.join(", ") : "0 days",
    ageLabel: `Age as of ${asOf.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
  };
}

function calculateTimeDuration({ startTime, endTime }) {
  const [startHours, startMinutes] = parseTime(startTime, "Start time");
  const [endHours, endMinutes] = parseTime(endTime, "End time");

  let startTotal = startHours * 60 + startMinutes;
  let endTotal = endHours * 60 + endMinutes;
  const crossesMidnight = endTotal < startTotal;

  if (crossesMidnight) {
    endTotal += 24 * 60;
  }

  const durationMinutes = endTotal - startTotal;
  return {
    hours: Math.floor(durationMinutes / 60),
    minutes: durationMinutes % 60,
    totalMinutes: durationMinutes,
    durationLabel: crossesMidnight
      ? "Calculated as an overnight time span."
      : "Calculated within the same day.",
  };
}

function convertTemperature({ value, fromUnit, toUnit }) {
  validateNumber(value, "Temperature value");

  const toCelsius = {
    celsius: value,
    fahrenheit: ((value - 32) * 5) / 9,
    kelvin: value - 273.15,
  }[fromUnit];

  if (toCelsius === undefined) throw new Error("Please choose a valid starting temperature unit.");
  if (fromUnit === "kelvin" && value < 0) throw new Error("Kelvin cannot be below zero.");

  const converted = {
    celsius: toCelsius,
    fahrenheit: (toCelsius * 9) / 5 + 32,
    kelvin: toCelsius + 273.15,
  }[toUnit];

  if (converted === undefined) throw new Error("Please choose a valid target temperature unit.");

  return { convertedValue: round(converted) };
}

function convertLength({ value, fromUnit, toUnit }) {
  validateNonNegativeNumber(value, "Length value");

  const factors = {
    millimeters: 0.001,
    centimeters: 0.01,
    meters: 1,
    kilometers: 1000,
    inches: 0.0254,
    feet: 0.3048,
    yards: 0.9144,
  };

  if (!factors[fromUnit] || !factors[toUnit]) {
    throw new Error("Please choose valid length units.");
  }

  const meters = value * factors[fromUnit];
  return { convertedValue: round(meters / factors[toUnit], 4) };
}

function analyzeWordCount({ text }) {
  const rawText = String(text ?? "");
  const normalized = rawText.trim();

  if (!normalized) {
    throw new Error("Please enter some text to analyze.");
  }

  const words = normalized ? normalized.split(/\s+/).length : 0;
  const characters = rawText.length;
  const charactersNoSpaces = rawText.replace(/\s/g, "").length;

  return { words, characters, charactersNoSpaces };
}

function convertCase({ text, mode }) {
  const value = String(text ?? "");

  if (!value.trim()) {
    throw new Error("Please enter text to convert.");
  }

  const modes = {
    uppercase: value.toUpperCase(),
    lowercase: value.toLowerCase(),
    titlecase: value.replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()),
    sentencecase: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
  };

  if (!modes[mode]) {
    throw new Error("Please choose a valid case conversion mode.");
  }

  return { convertedText: modes[mode] };
}

function calculatePaint({ unitSystem, width, height, doors, windows, coats, coveragePerGallon }) {
  validatePositiveNumber(width, "Wall width");
  validatePositiveNumber(height, "Wall height");
  validateNonNegativeNumber(doors, "Number of doors");
  validateNonNegativeNumber(windows, "Number of windows");
  validatePositiveNumber(coats, "Number of coats");
  validatePositiveNumber(coveragePerGallon, "Coverage");

  const isMetric = unitSystem === "metric";
  const doorArea = isMetric ? 1.86 : 20;
  const windowArea = isMetric ? 1.39 : 15;
  const totalSurfaceArea = width * height;
  const openingsArea = doors * doorArea + windows * windowArea;
  const area = Math.max(totalSurfaceArea - openingsArea, 0);
  const paintNeeded = (area * coats) / coveragePerGallon;

  return {
    area: round(area),
    paintNeeded: round(paintNeeded, 2),
    unitLabel: isMetric
      ? "Results shown in square meters and litres."
      : "Results shown in square feet and gallons.",
  };
}

function calculateSquareFootage({ length, width }) {
  validatePositiveNumber(length, "Length");
  validatePositiveNumber(width, "Width");

  return {
    squareFeet: round(length * width),
  };
}

module.exports = {
  calculateLoanPayment,
  calculatePercentage,
  calculateCompoundInterest,
  calculateDateDifference,
  calculateAge,
  calculateTimeDuration,
  convertTemperature,
  convertLength,
  analyzeWordCount,
  convertCase,
  calculatePaint,
  calculateSquareFootage,
};
