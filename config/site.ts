export type CategoryDefinition = {
  slug: string;
  name: string;
  description: string;
  examples: string[];
};

export type ToolDefinition = {
  slug: string;
  category: string;
  name: string;
  summary: string;
  popular?: boolean;
  featured?: boolean;
};

export const siteConfig = {
  name: "SolvrTools",
  tagline: "Fast, free calculators and tools for everyday problems.",
  description:
    "Fast, free calculators and utilities for finance, time, conversions, text, home projects, and everyday problem-solving.",
  url: "https://solvrtools.com",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/tools", label: "Tools" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ],
  categories: [
    {
      slug: "finance",
      name: "Finance",
      description: "Money tools for payments, budgeting, interest, savings, and personal finance decisions.",
      examples: [
        "Loan Payment Calculator",
        "Mortgage Calculator",
        "Percentage Calculator",
        "Compound Interest Calculator",
      ],
    },
    {
      slug: "time",
      name: "Time",
      description: "Time-based tools for durations, date differences, schedules, and work-hour calculations.",
      examples: [
        "Time Duration Calculator",
        "Date Difference Calculator",
        "Hours Calculator",
        "Age Calculator",
      ],
    },
    {
      slug: "conversions",
      name: "Conversions",
      description: "Conversion tools for units, measurements, values, and common everyday conversions.",
      examples: [
        "Length Converter",
        "Weight Converter",
        "Temperature Converter",
        "Area Converter",
      ],
    },
    {
      slug: "text",
      name: "Text",
      description: "Text and word utilities for counting, formatting, cleaning, transforming, and solving simple text tasks.",
      examples: [
        "Word Counter",
        "Case Converter",
        "Character Counter",
        "Whitespace Cleaner",
      ],
    },
    {
      slug: "home",
      name: "Home",
      description: "Home-related calculators and practical utilities for household costs, space, and everyday planning.",
      examples: [
        "Paint Calculator",
        "Tile Calculator",
        "Square Footage Calculator",
        "Concrete Calculator",
      ],
    },
    {
      slug: "health",
      name: "Health",
      description: "Health and wellness tools for body measurements, daily planning, and simple fitness-related calculations.",
      examples: [
        "BMI Calculator",
        "Calorie Calculator",
        "Water Intake Calculator",
        "Body Fat Calculator",
      ],
    },
    {
      slug: "utility",
      name: "Utility",
      description: "Simple utility tools for quick randomization, small decisions, and everyday helper actions.",
      examples: [
        "Random Number Generator",
        "Dice Roller",
        "Coin Flipper",
        "Simple Picker",
      ],
    },
  ] satisfies CategoryDefinition[],
  featuredTools: [
    {
      slug: "loan-payment-calculator",
      category: "finance",
      name: "Loan Payment Calculator",
      summary: "Estimate recurring loan payments for a fixed amount, rate, and term.",
      popular: true,
      featured: true,
    },
    {
      slug: "percentage-calculator",
      category: "finance",
      name: "Percentage Calculator",
      summary: "Handle common percentage calculations quickly for discounts, changes, and comparisons.",
      popular: true,
      featured: true,
    },
    {
      slug: "tip-calculator",
      category: "finance",
      name: "Tip Calculator",
      summary: "Calculate how much to tip from a bill total and tip percentage.",
    },
    {
      slug: "savings-goal-calculator",
      category: "finance",
      name: "Savings Goal Calculator",
      summary: "Estimate how long it will take to reach a savings goal using recurring contributions.",
    },
    {
      slug: "time-duration-calculator",
      category: "time",
      name: "Time Duration Calculator",
      summary: "Find the elapsed time between two clock times for scheduling, work-hour, and overnight use cases.",
      popular: true,
      featured: true,
    },
    {
      slug: "date-difference-calculator",
      category: "time",
      name: "Date Difference Calculator",
      summary: "Measure the time between two calendar dates in practical units.",
      featured: true,
    },
    {
      slug: "time-zone-calculator",
      category: "time",
      name: "Time Zone Calculator",
      summary: "Compare the live current time in two time zones and see the hour difference instantly.",
    },
    {
      slug: "timesheet-calculator",
      category: "time",
      name: "Timesheet Calculator",
      summary: "Calculate total worked time from a start time, end time, and break duration.",
    },
    {
      slug: "temperature-converter",
      category: "conversions",
      name: "Temperature Converter",
      summary: "Convert quickly between Celsius, Fahrenheit, and Kelvin.",
      popular: true,
      featured: true,
    },
    {
      slug: "length-converter",
      category: "conversions",
      name: "Length Converter",
      summary: "Convert distances and lengths across common measurement systems.",
      featured: true,
    },
    {
      slug: "weight-converter",
      category: "conversions",
      name: "Weight Converter",
      summary: "Convert everyday weight and mass values across metric and imperial units.",
    },
    {
      slug: "volume-converter",
      category: "conversions",
      name: "Volume Converter",
      summary: "Convert common kitchen and household volume units quickly and clearly.",
    },
    {
      slug: "word-counter",
      category: "text",
      name: "Word Counter",
      summary: "Count words, characters, and basic text metrics instantly.",
      popular: true,
      featured: true,
    },
    {
      slug: "case-converter",
      category: "text",
      name: "Case Converter",
      summary: "Transform text into uppercase, lowercase, title case, and more.",
      featured: true,
    },
    {
      slug: "reading-time-calculator",
      category: "text",
      name: "Reading Time Calculator",
      summary: "Estimate reading time from pasted text using speed-based reading presets.",
    },
    {
      slug: "paint-calculator",
      category: "home",
      name: "Paint Calculator",
      summary: "Estimate paint needed for walls and rooms based on coverage and dimensions.",
      popular: true,
      featured: true,
    },
    {
      slug: "tile-calculator",
      category: "home",
      name: "Tile Calculator",
      summary: "Estimate tiles and tile packs needed for a floor or wall area.",
    },
    {
      slug: "concrete-calculator",
      category: "home",
      name: "Concrete Calculator",
      summary: "Estimate how much concrete is needed for a rectangular slab or filled volume.",
    },
    {
      slug: "square-footage-calculator",
      category: "home",
      name: "Square Footage Calculator",
      summary: "Calculate floor or room area for planning, estimating, and shopping.",
      featured: true,
    },
    {
      slug: "bmi-calculator",
      category: "health",
      name: "BMI Calculator",
      summary: "Estimate body mass index from height and weight using metric or imperial units.",
    },
  ] satisfies ToolDefinition[],
} as const;

export type SiteConfig = typeof siteConfig;
