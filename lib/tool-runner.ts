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
