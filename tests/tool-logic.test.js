import test from "node:test";
import assert from "node:assert/strict";
import logic from "../lib/tool-logic.js";

test("calculateLoanPayment returns expected monthly payment", () => {
  const result = logic.calculateLoanPayment({
    principal: 25000,
    annualRate: 6.5,
    years: 5,
  });

  assert.equal(result.monthlyPayment, 489.15);
});

test("calculatePercentage returns percentage of value", () => {
  const result = logic.calculatePercentage({ value: 240, percentage: 15 });
  assert.equal(result.result, 36);
});

test("calculateCompoundInterest returns growth values", () => {
  const result = logic.calculateCompoundInterest({
    principal: 10000,
    annualRate: 5,
    timesPerYear: 12,
    years: 10,
  });

  assert.equal(result.finalAmount, 16470.09);
});

test("calculateDateDifference returns absolute days", () => {
  const result = logic.calculateDateDifference({
    startDate: "2026-01-01",
    endDate: "2026-01-31",
  });

  assert.equal(result.days, 30);
});

test("calculateAge returns years-only result when months and days are zero", () => {
  const result = logic.calculateAge({
    birthDate: "2000-01-19",
    asOfDate: "2025-01-19",
  });

  assert.equal(result.years, 25);
  assert.equal(result.months, 0);
  assert.equal(result.days, 0);
  assert.equal(result.ageText, "25 years");
});

test("calculateAge returns years and months when days are zero", () => {
  const result = logic.calculateAge({
    birthDate: "2000-01-19",
    asOfDate: "2025-04-19",
  });

  assert.equal(result.years, 25);
  assert.equal(result.months, 3);
  assert.equal(result.days, 0);
  assert.equal(result.ageText, "25 years, 3 months");
});

test("calculateAge returns years, months, and days when all are present", () => {
  const result = logic.calculateAge({
    birthDate: "1990-06-15",
    asOfDate: "2026-04-19",
  });

  assert.equal(result.years, 35);
  assert.equal(result.months, 10);
  assert.equal(result.days, 4);
  assert.equal(result.ageText, "35 years, 10 months, 4 days");
});

test("calculateAge omits zero-value units from readable age text", () => {
  const result = logic.calculateAge({
    birthDate: "2000-01-16",
    asOfDate: "2025-01-19",
  });

  assert.equal(result.years, 25);
  assert.equal(result.months, 0);
  assert.equal(result.days, 3);
  assert.equal(result.ageText, "25 years, 3 days");
});

test("calculateAge returns months and days when years is zero", () => {
  const result = logic.calculateAge({
    birthDate: "2024-10-14",
    asOfDate: "2025-01-19",
  });

  assert.equal(result.years, 0);
  assert.equal(result.months, 3);
  assert.equal(result.days, 5);
  assert.equal(result.ageText, "3 months, 5 days");
});

test("calculateAge returns 0 days when all readable units are zero", () => {
  const result = logic.calculateAge({
    birthDate: "2026-04-19",
    asOfDate: "2026-04-19",
  });

  assert.equal(result.years, 0);
  assert.equal(result.months, 0);
  assert.equal(result.days, 0);
  assert.equal(result.ageText, "0 days");
});

test("calculateAge handles leap-year birthdays deterministically", () => {
  const result = logic.calculateAge({
    birthDate: "2020-02-29",
    asOfDate: "2021-03-01",
  });

  assert.equal(result.years, 1);
  assert.equal(result.months, 0);
  assert.equal(result.days, 0);
  assert.equal(result.ageText, "1 year");
});

test("calculateTimeDuration handles overnight spans", () => {
  const result = logic.calculateTimeDuration({
    startTime: "22:15",
    endTime: "01:45",
  });

  assert.equal(result.totalMinutes, 210);
});

test("convertTemperature handles celsius to fahrenheit", () => {
  const result = logic.convertTemperature({
    value: 100,
    fromUnit: "celsius",
    toUnit: "fahrenheit",
  });

  assert.equal(result.convertedValue, 212);
});

test("convertLength handles meters to feet", () => {
  const result = logic.convertLength({
    value: 10,
    fromUnit: "meters",
    toUnit: "feet",
  });

  assert.equal(result.convertedValue, 32.8084);
});

test("convertWeight handles pounds to kilograms", () => {
  const result = logic.convertWeight({
    value: 150,
    fromUnit: "pounds",
    toUnit: "kilograms",
  });

  assert.equal(result.convertedValue, 68.0389);
});

test("convertVolume handles cups to milliliters", () => {
  const result = logic.convertVolume({
    value: 2,
    fromUnit: "cups",
    toUnit: "milliliters",
  });

  assert.equal(result.convertedValue, 473.1765);
});

test("generateRandomNumber respects inclusive range", () => {
  const originalRandom = Math.random;
  Math.random = () => 0.5;

  const result = logic.generateRandomNumber({ min: 1, max: 10 });

  assert.equal(result.randomNumber, 6);
  assert.equal(result.rangeLabel, "Generated from 1 to 10.");
  Math.random = originalRandom;
});

test("rollDie returns valid result for standard die", () => {
  const originalRandom = Math.random;
  Math.random = () => 0.5;

  const result = logic.rollDie({ sides: 20 });

  assert.equal(result.rollResult, 11);
  assert.equal(result.diceLabel, "Rolled a d20.");
  Math.random = originalRandom;
});

test("flipCoin returns tails when random is above threshold", () => {
  const originalRandom = Math.random;
  Math.random = () => 0.75;

  const result = logic.flipCoin();

  assert.equal(result.coinResult, "Tails");
  assert.equal(result.flipLabel, "Single coin flip result.");
  Math.random = originalRandom;
});

test("calculateTimeZoneDifference returns readable zone comparison", () => {
  const result = logic.calculateTimeZoneDifference({
    currentTimeZone: "UTC",
    convertedTimeZone: "America/New_York",
  });

  assert.equal(typeof result.currentTimeZoneTime, "string");
  assert.equal(typeof result.convertedTimeZoneTime, "string");
  assert.equal(typeof result.hourDifference, "number");
  assert.equal(typeof result.differenceLabel, "string");
});

test("calculateTimesheet subtracts breaks from worked time", () => {
  const result = logic.calculateTimesheet({
    startTime: "08:00",
    endTime: "17:00",
    breakMinutes: 30,
  });

  assert.equal(result.totalHours, 8);
  assert.equal(result.totalMinutes, 30);
  assert.equal(result.totalWorkedMinutes, 510);
  assert.equal(result.workedTimeText, "8 hours 30 minutes");
});

test("analyzeWordCount returns word and character counts", () => {
  const result = logic.analyzeWordCount({ text: "Hello SolvrTools world" });
  assert.equal(result.words, 3);
});

test("convertCase transforms to title case", () => {
  const result = logic.convertCase({
    text: "solvrtools makes text cleanup easy",
    mode: "titlecase",
  });

  assert.equal(result.convertedText, "Solvrtools Makes Text Cleanup Easy");
});

test("calculatePaint returns imperial paint wording", () => {
  const result = logic.calculatePaint({
    unitSystem: "imperial",
    width: 20,
    height: 8,
    doors: 1,
    windows: 2,
    coats: 2,
    coveragePerGallon: 350,
  });

  assert.equal(result.area, 110);
  assert.equal(result.paintNeeded, 0.63);
  assert.equal(result.unitLabel, "Results shown in square feet and gallons.");
});

test("calculatePaint returns metric paint wording", () => {
  const result = logic.calculatePaint({
    unitSystem: "metric",
    width: 6,
    height: 2.5,
    doors: 1,
    windows: 2,
    coats: 2,
    coveragePerGallon: 10,
  });

  assert.equal(result.area, 10.36);
  assert.equal(result.paintNeeded, 2.07);
  assert.equal(result.unitLabel, "Results shown in square meters and litres.");
});

test("calculateSquareFootage returns area", () => {
  const result = logic.calculateSquareFootage({
    length: 12,
    width: 15,
  });

  assert.equal(result.squareFeet, 180);
});

test("calculateBmi returns expected metric BMI and category", () => {
  const result = logic.calculateBmi({
    unitSystem: "metric",
    heightCm: 178,
    weightKg: 78,
    heightFeet: 0,
    heightInches: 0,
    weightPounds: 0,
  });

  assert.equal(result.bmi, 24.6);
  assert.equal(result.category, "Healthy weight");
});

test("calculateBmi returns expected imperial BMI and category", () => {
  const result = logic.calculateBmi({
    unitSystem: "imperial",
    heightCm: 0,
    weightKg: 0,
    heightFeet: 5,
    heightInches: 10,
    weightPounds: 172,
  });

  assert.equal(result.bmi, 24.7);
  assert.equal(result.category, "Healthy weight");
});
