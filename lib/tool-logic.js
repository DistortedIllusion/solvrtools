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
  if (
    parts.length !== 2 ||
    parts.some((part) => Number.isNaN(part)) ||
    parts[0] < 0 ||
    parts[0] > 23 ||
    parts[1] < 0 ||
    parts[1] > 59
  ) {
    throw new Error(`${label} must be a valid time.`);
  }

  return parts;
}

function formatMinutesAsHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  }

  if (hours === 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  return `${hours} hour${hours === 1 ? "" : "s"} ${minutes} minute${minutes === 1 ? "" : "s"}`;
}

function getCurrentTimeInZone(timeZone) {
  try {
    const date = new Date();
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    throw new Error("Please choose valid time zones.");
  }
}

function getTimeZoneOffsetHours(timeZone) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    hour: "2-digit",
  });
  const parts = formatter.formatToParts(now);
  const zonePart = parts.find((part) => part.type === "timeZoneName")?.value;

  if (!zonePart) {
    throw new Error("Could not determine the selected time zone offset.");
  }

  if (zonePart === "GMT" || zonePart === "UTC") {
    return 0;
  }

  const match = zonePart.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) {
    throw new Error("Could not determine the selected time zone offset.");
  }

  const sign = match[1] === "+" ? 1 : -1;
  const hours = Number(match[2]);
  const minutes = Number(match[3] ?? 0);

  return sign * (hours + minutes / 60);
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

function calculateTip({ billTotal, tipPercentage }) {
  validateNonNegativeNumber(billTotal, "Bill total");
  validateNonNegativeNumber(tipPercentage, "Tip percentage");

  return {
    tipAmount: round((billTotal * tipPercentage) / 100),
    tipLabel: `${round(tipPercentage, 2)}% tip on ${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(billTotal)}`,
  };
}

function calculateSavingsGoal({ goalAmount, contributionAmount, frequency }) {
  validatePositiveNumber(goalAmount, "Savings goal");
  validatePositiveNumber(contributionAmount, "Contribution amount");

  const periodsPerMonth = {
    weekly: 52 / 12,
    biweekly: 26 / 12,
    monthly: 1,
  }[frequency];

  if (!periodsPerMonth) {
    throw new Error("Please choose a valid contribution frequency.");
  }

  if (contributionAmount >= goalAmount) {
    return {
      contributionsNeeded: 1,
      estimatedMonths: round(1 / periodsPerMonth, 2),
      estimatedTimeText: "1 contribution",
      frequencyLabel: `Saving ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(contributionAmount)} ${frequency} reaches the goal in a single contribution.`,
    };
  }

  const contributionsNeeded = Math.ceil(goalAmount / contributionAmount);
  const estimatedMonths = round(contributionsNeeded / periodsPerMonth, 2);
  const years = Math.floor(estimatedMonths / 12);
  const remainingMonths = round(estimatedMonths - years * 12, 2);

  let estimatedTimeText = `${estimatedMonths} months`;
  if (years > 0) {
    estimatedTimeText = remainingMonths === 0
      ? `${years} year${years === 1 ? "" : "s"}`
      : `${years} year${years === 1 ? "" : "s"} and ${remainingMonths} months`;
  }

  return {
    contributionsNeeded,
    estimatedMonths,
    estimatedTimeText,
    frequencyLabel: `${contributionsNeeded} ${frequency} contribution${contributionsNeeded === 1 ? "" : "s"} needed to reach ${new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(goalAmount)}.`,
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

function calculateTimeZoneDifference({ currentTimeZone, convertedTimeZone }) {
  if (!currentTimeZone || !convertedTimeZone) {
    throw new Error("Both time zones are required.");
  }

  const currentTime = getCurrentTimeInZone(currentTimeZone);
  const convertedTime = getCurrentTimeInZone(convertedTimeZone);
  const hourDifference = round(getTimeZoneOffsetHours(convertedTimeZone) - getTimeZoneOffsetHours(currentTimeZone), 2);

  return {
    currentTimeZoneTime: currentTime,
    convertedTimeZoneTime: convertedTime,
    hourDifference,
    differenceLabel:
      hourDifference === 0
        ? "Both selected time zones are currently aligned to the same UTC offset."
        : `${convertedTimeZone} is ${Math.abs(hourDifference)} hour${Math.abs(hourDifference) === 1 ? "" : "s"} ${hourDifference > 0 ? "ahead of" : "behind"} ${currentTimeZone}.`,
  };
}

function calculateTimesheet({ startTime, endTime, breakMinutes }) {
  validateNonNegativeNumber(breakMinutes, "Break duration");

  const [startHours, startMinutes] = parseTime(startTime, "Start time");
  const [endHours, endMinutes] = parseTime(endTime, "End time");

  let startTotal = startHours * 60 + startMinutes;
  let endTotal = endHours * 60 + endMinutes;
  const crossesMidnight = endTotal < startTotal;

  if (crossesMidnight) {
    endTotal += 24 * 60;
  }

  const workedMinutesBeforeBreaks = endTotal - startTotal;

  if (breakMinutes > workedMinutesBeforeBreaks) {
    throw new Error("Break duration cannot be longer than the full shift length.");
  }

  const workedMinutes = workedMinutesBeforeBreaks - breakMinutes;

  return {
    totalHours: Math.floor(workedMinutes / 60),
    totalMinutes: workedMinutes % 60,
    totalWorkedMinutes: workedMinutes,
    workedTimeText: formatMinutesAsHoursAndMinutes(workedMinutes),
    shiftLabel: crossesMidnight
      ? "Calculated as an overnight shift after subtracting breaks."
      : "Calculated within the same day after subtracting breaks.",
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

function convertWeight({ value, fromUnit, toUnit }) {
  validateNonNegativeNumber(value, "Weight value");

  const factors = {
    milligrams: 0.001,
    grams: 1,
    kilograms: 1000,
    ounces: 28.349523125,
    pounds: 453.59237,
    tons: 907184.74,
  };

  if (!factors[fromUnit] || !factors[toUnit]) {
    throw new Error("Please choose valid weight units.");
  }

  const grams = value * factors[fromUnit];
  return { convertedValue: round(grams / factors[toUnit], 4) };
}

function convertVolume({ value, fromUnit, toUnit }) {
  validateNonNegativeNumber(value, "Volume value");

  const factors = {
    milliliters: 1,
    liters: 1000,
    teaspoons: 4.92892159375,
    tablespoons: 14.78676478125,
    cups: 236.5882365,
    fluidOunces: 29.5735295625,
    pints: 473.176473,
    quarts: 946.352946,
    gallons: 3785.411784,
  };

  if (!factors[fromUnit] || !factors[toUnit]) {
    throw new Error("Please choose valid volume units.");
  }

  const milliliters = value * factors[fromUnit];
  return { convertedValue: round(milliliters / factors[toUnit], 4) };
}

function generateRandomNumber({ min, max }) {
  validateNumber(min, "Minimum value");
  validateNumber(max, "Maximum value");

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new Error("Minimum and maximum values must be whole numbers.");
  }

  if (max < min) {
    throw new Error("Maximum value must be greater than or equal to the minimum value.");
  }

  return {
    randomNumber: Math.floor(Math.random() * (max - min + 1)) + min,
    rangeLabel: `Generated from ${min} to ${max}.`,
  };
}

function rollDie({ sides }) {
  validatePositiveNumber(sides, "Number of sides");

  const validSides = [4, 6, 8, 10, 12, 20, 100];

  if (!Number.isInteger(sides) || !validSides.includes(sides)) {
    throw new Error("Please choose a standard dice side count: 4, 6, 8, 10, 12, 20, or 100.");
  }

  return {
    rollResult: Math.floor(Math.random() * sides) + 1,
    diceLabel: `Rolled a d${sides}.`,
  };
}

function flipCoin() {
  const result = Math.random() < 0.5 ? "Heads" : "Tails";

  return {
    coinResult: result,
    flipLabel: "Single coin flip result.",
  };
}

function calculateReadingTime({ text, readingSpeed }) {
  const rawText = String(text ?? "").trim();

  if (!rawText) {
    throw new Error("Text is required.");
  }

  validatePositiveNumber(readingSpeed, "Reading speed");

  const words = rawText.split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = words / readingSpeed;
  const totalSeconds = Math.max(1, Math.ceil(readingTimeMinutes * 60));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const readableTime = minutes === 0
    ? `${seconds} second${seconds === 1 ? "" : "s"}`
    : seconds === 0
      ? `${minutes} minute${minutes === 1 ? "" : "s"}`
      : `${minutes} minute${minutes === 1 ? "" : "s"} ${seconds} second${seconds === 1 ? "" : "s"}`;

  return {
    wordCount: words,
    readingTimeMinutes: round(readingTimeMinutes, 2),
    readingTimeText: readableTime,
    speedLabel: `${readingSpeed} words per minute reading speed used.`,
  };
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

function calculateBmi({
  unitSystem,
  heightCm,
  weightKg,
  heightFeet,
  heightInches,
  weightPounds,
}) {
  let heightMeters;
  let weightKilograms;

  if (unitSystem === "metric") {
    validatePositiveNumber(heightCm, "Height");
    validatePositiveNumber(weightKg, "Weight");

    heightMeters = heightCm / 100;
    weightKilograms = weightKg;
  } else if (unitSystem === "imperial") {
    validatePositiveNumber(heightFeet, "Height (feet)");
    validateNonNegativeNumber(heightInches, "Additional height (inches)");
    validatePositiveNumber(weightPounds, "Weight");

    const totalInches = heightFeet * 12 + heightInches;
    validatePositiveNumber(totalInches, "Total height");

    heightMeters = totalInches * 0.0254;
    weightKilograms = weightPounds * 0.45359237;
  } else {
    throw new Error("Please choose a valid unit system.");
  }

  const bmi = weightKilograms / Math.pow(heightMeters, 2);

  let category = "Obesity";
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Healthy weight";
  } else if (bmi < 30) {
    category = "Overweight";
  }

  return {
    bmi: round(bmi, 1),
    category,
    healthyRange:
      unitSystem === "metric"
        ? "18.5 to 24.9 is generally considered a healthy BMI range for adults."
        : "18.5 to 24.9 is generally considered a healthy BMI range for adults.",
  };
}

module.exports = {
  calculateLoanPayment,
  calculatePercentage,
  calculateCompoundInterest,
  calculateTip,
  calculateSavingsGoal,
  calculateDateDifference,
  calculateAge,
  calculateTimeDuration,
  convertTemperature,
  convertLength,
  convertWeight,
  convertVolume,
  generateRandomNumber,
  rollDie,
  flipCoin,
  calculateTimeZoneDifference,
  calculateTimesheet,
  calculateReadingTime,
  analyzeWordCount,
  convertCase,
  calculatePaint,
  calculateSquareFootage,
  calculateBmi,
};
