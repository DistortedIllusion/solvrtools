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
      slug: "paint-calculator",
      category: "home",
      name: "Paint Calculator",
      summary: "Estimate paint needed for walls and rooms based on coverage and dimensions.",
      popular: true,
      featured: true,
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
      popular: true,
      featured: true,
    },
  ] satisfies ToolDefinition[],
} as const;

export type SiteConfig = typeof siteConfig;
