import * as logic from "@/lib/tool-logic.js";
import { getToolDefinition } from "@/lib/tool-definitions";

function parseNumber(value: string, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function runToolCalculation(category: string, slug: string, values: Record<string, string>) {
  const tool = getToolDefinition(category, slug);

  if (!tool) {
    throw new Error("Tool not found.");
  }

  switch (slug) {
    case "loan-payment-calculator":
      return logic.calculateLoanPayment({
        principal: parseNumber(values.principal),
        annualRate: parseNumber(values.annualRate),
        years: parseNumber(values.years),
      });
    case "percentage-calculator":
      return logic.calculatePercentage({
        value: parseNumber(values.value),
        percentage: parseNumber(values.percentage),
      });
    case "compound-interest-calculator":
      return logic.calculateCompoundInterest({
        principal: parseNumber(values.principal),
        annualRate: parseNumber(values.annualRate),
        timesPerYear: parseNumber(values.timesPerYear),
        years: parseNumber(values.years),
      });
    case "date-difference-calculator":
      return logic.calculateDateDifference({
        startDate: values.startDate,
        endDate: values.endDate,
      });
    case "age-calculator":
      return logic.calculateAge({
        birthDate: values.birthDate,
        asOfDate: values.asOfDate,
      });
    case "time-duration-calculator":
      return logic.calculateTimeDuration({
        startTime: values.startTime,
        endTime: values.endTime,
      });
    case "time-zone-calculator":
      return logic.calculateTimeZoneDifference({
        currentTimeZone: values.currentTimeZone,
        convertedTimeZone: values.convertedTimeZone,
      });
    case "timesheet-calculator":
      return logic.calculateTimesheet({
        startTime: values.startTime,
        endTime: values.endTime,
        breakMinutes: parseNumber(values.breakMinutes),
      });
    case "temperature-converter":
      return logic.convertTemperature({
        value: parseNumber(values.value),
        fromUnit: values.fromUnit,
        toUnit: values.toUnit,
      });
    case "length-converter":
      return logic.convertLength({
        value: parseNumber(values.value),
        fromUnit: values.fromUnit,
        toUnit: values.toUnit,
      });
    case "weight-converter":
      return logic.convertWeight({
        value: parseNumber(values.value),
        fromUnit: values.fromUnit,
        toUnit: values.toUnit,
      });
    case "volume-converter":
      return logic.convertVolume({
        value: parseNumber(values.value),
        fromUnit: values.fromUnit,
        toUnit: values.toUnit,
      });
    case "random-number-generator":
      return logic.generateRandomNumber({
        min: parseNumber(values.min),
        max: parseNumber(values.max),
      });
    case "dice-roller":
      return logic.rollDie({
        sides: parseNumber(values.sides),
      });
    case "coin-flipper":
      return logic.flipCoin();
    case "reading-time-calculator":
      return logic.calculateReadingTime({
        text: values.text,
        readingSpeed: parseNumber(values.readingSpeed),
      });
    case "word-counter":
      return logic.analyzeWordCount({ text: values.text });
    case "case-converter":
      return logic.convertCase({ text: values.text, mode: values.mode });
    case "paint-calculator":
      return logic.calculatePaint({
        unitSystem: values.unitSystem,
        width: parseNumber(values.width),
        height: parseNumber(values.height),
        doors: parseNumber(values.doors),
        windows: parseNumber(values.windows),
        coats: parseNumber(values.coats),
        coveragePerGallon: parseNumber(values.coveragePerGallon),
      });
    case "square-footage-calculator":
      return logic.calculateSquareFootage({
        length: parseNumber(values.length),
        width: parseNumber(values.width),
      });
    case "bmi-calculator":
      return logic.calculateBmi({
        unitSystem: values.unitSystem,
        heightCm: parseNumber(values.heightCm),
        weightKg: parseNumber(values.weightKg),
        heightFeet: parseNumber(values.heightFeet),
        heightInches: parseNumber(values.heightInches),
        weightPounds: parseNumber(values.weightPounds),
      });
    default:
      throw new Error(`No calculator configured for ${slug}.`);
  }
}
