export type ToolField = {
  name: string;
  label: string;
  type: "number" | "text" | "date" | "time" | "select" | "textarea";
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  min?: number;
  step?: number;
  options?: Array<{ label: string; value: string }>;
};

export type ToolOutput = {
  key: string;
  label: string;
  format?: "currency" | "number" | "text";
  suffix?: string;
  prefix?: string;
  description?: string;
};

export type ToolDefinition = {
  slug: string;
  title: string;
  category: string;
  description: string;
  intro?: string[];
  keywords: string[];
  inputs: ToolField[];
  outputs: ToolOutput[];
  faq: Array<{ question: string; answer: string }>;
  relatedTools: string[];
  formulaSummary: string;
  example: {
    inputs: Record<string, string | number>;
    explanation: string;
    results?: Array<{ label: string; value: string }>;
  };
};

export const toolDefinitions: ToolDefinition[] = [
  {
    slug: "loan-payment-calculator",
    title: "Loan Payment Calculator",
    category: "finance",
    description: "Estimate monthly payment, total payment, and total interest for a fixed-rate loan.",
    intro: [
      "Use this loan payment calculator to estimate your monthly payment, total repayment amount, and total interest for a fixed-rate loan. Whether you're planning a car loan, personal loan, or small financing decision, this tool helps you understand the true cost of borrowing before you commit.",
      "By adjusting the loan amount, interest rate, and term, you can quickly see how different factors impact your monthly payment and the total interest paid over time.",
    ],
    keywords: ["loan payment calculator", "monthly payment", "loan interest"],
    inputs: [
      {
        name: "principal",
        label: "Loan amount",
        type: "number",
        placeholder: "25000",
        helpText: "Enter the total amount borrowed before interest.",
        required: true,
        min: 0.01,
        step: 0.01,
      },
      {
        name: "annualRate",
        label: "Annual interest rate (%)",
        type: "number",
        placeholder: "6.5",
        helpText: "Use the yearly interest rate, not the monthly rate.",
        required: true,
        min: 0,
        step: 0.01,
      },
      {
        name: "years",
        label: "Loan term (years)",
        type: "number",
        placeholder: "5",
        helpText: "Most personal and auto loans are between 1 and 7 years.",
        required: true,
        min: 1,
        step: 1,
      },
    ],
    outputs: [
      {
        key: "monthlyPayment",
        label: "Monthly payment",
        format: "currency",
        description: "Estimated fixed payment due each month.",
      },
      {
        key: "totalPayment",
        label: "Total paid over the loan",
        format: "currency",
        description: "Combined total of all payments across the full term.",
      },
      {
        key: "totalInterest",
        label: "Total interest paid",
        format: "currency",
        description: "How much of the total cost goes to interest rather than principal.",
      },
    ],
    faq: [
      {
        question: "Does this calculator assume a fixed rate?",
        answer: "Yes. This version assumes the interest rate remains constant over the full term.",
      },
      {
        question: "Can I use this for auto or personal loans?",
        answer: "Yes. It works for any fixed-rate installment loan with regular monthly payments.",
      },
      {
        question: "What affects my monthly loan payment the most?",
        answer: "Your monthly payment is primarily affected by three factors: the loan amount, the interest rate, and the loan term. Higher loan amounts and interest rates increase your payment, while longer loan terms reduce the monthly payment but increase the total interest paid.",
      },
      {
        question: "Does a longer loan term save money?",
        answer: "A longer loan term lowers your monthly payment, but it usually increases the total amount of interest you pay over time. Shorter loan terms typically save money overall but require higher monthly payments.",
      },
      {
        question: "Can I use this calculator for mortgages?",
        answer: "Yes, this calculator can be used for basic mortgage estimates. However, mortgages may include additional costs such as property taxes, insurance, and fees that are not included in this calculation.",
      },
      {
        question: "What happens if I pay off my loan early?",
        answer: "Paying off your loan early can reduce the total interest you pay. Since interest is calculated based on the remaining balance, reducing the balance faster lowers the overall cost of borrowing.",
      },
    ],
    relatedTools: ["percentage-calculator", "compound-interest-calculator"],
    formulaSummary:
      "Monthly loan payments are calculated using a standard amortization formula. This formula ensures that each payment covers both interest and a portion of the principal over the life of the loan.\n\nThe calculation takes into account:\n- Loan amount (principal): the total amount borrowed\n- Interest rate: the annual rate, converted into a monthly rate\n- Loan term: the total number of months over which the loan is repaid\n\nEach monthly payment includes:\n- Interest: the cost of borrowing the remaining balance\n- Principal: the portion that reduces your loan balance\n\nEarly in the loan, a larger portion of your payment goes toward interest. Over time, more of each payment is applied to the principal. This is why longer loan terms result in significantly more total interest paid.",
    example: {
      inputs: { principal: 25000, annualRate: 6.5, years: 5 },
      explanation:
        "For a $25,000 loan at 6.5% interest over 5 years:\n\n- Loan amount: $25,000\n- Interest rate: 6.5%\n- Loan term: 5 years (60 months)\n\nResults:\n- Monthly payment: $489.15\n- Total paid: $29,349.22\n- Total interest: $4,349.22\n\nThis example shows how interest increases the total cost of a loan. Even with a moderate interest rate, you end up paying several thousand dollars more than the original loan amount over time.",
      results: [
        { label: "Monthly payment", value: "$489.15" },
        { label: "Total paid", value: "$29,349.22" },
        { label: "Total interest", value: "$4,349.22" },
      ],
    },
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    category: "finance",
    description: "Find a percentage of a number quickly for discounts, increases, and comparisons.",
    intro: [
      "Use this percentage calculator to quickly find percentages, percentage values, and proportional amounts. Whether you are calculating discounts, tips, markups, tax amounts, grades, or everyday math problems, this tool helps you work out percentage-based values in seconds.",
      "By entering a percentage and a value, you can instantly see the resulting amount and better understand how percentages apply in practical situations.",
    ],
    keywords: ["percentage calculator", "percent of a number"],
    inputs: [
      {
        name: "value",
        label: "Base value",
        type: "number",
        placeholder: "240",
        helpText: "This is the number you want to take a percentage of.",
        required: true,
        min: 0,
        step: 0.01,
      },
      {
        name: "percentage",
        label: "Percentage (%)",
        type: "number",
        placeholder: "15",
        helpText: "Use 15 for fifteen percent, 2.5 for two and a half percent, and so on.",
        required: true,
        step: 0.01,
      },
    ],
    outputs: [
      {
        key: "result",
        label: "Calculated amount",
        format: "number",
        description: "The resulting amount based on the selected percentage.",
      },
      {
        key: "percentageLabel",
        label: "Calculation summary",
        format: "text",
        description: "Quick summary of the percentage relationship used.",
      },
    ],
    faq: [
      {
        question: "What does this calculate?",
        answer: "It calculates the selected percentage of the provided value.",
      },
      {
        question: "Can I use decimals?",
        answer: "Yes. Both the base value and the percentage can include decimals.",
      },
      {
        question: "What is a percentage?",
        answer: "A percentage is a way of expressing a number as a part of 100. For example, 25% means 25 out of 100, or one-quarter of the total.",
      },
      {
        question: "How do I calculate a percentage of a number?",
        answer: "To calculate a percentage of a number, divide the percentage by 100 and multiply the result by the total number. For example, 15% of 240 is 0.15 × 240 = 36.",
      },
      {
        question: "What can I use a percentage calculator for?",
        answer: "A percentage calculator can be used for many everyday calculations, including discounts, taxes, tips, commissions, test scores, markups, and comparing changes in value.",
      },
      {
        question: "Why do I need to divide the percentage by 100?",
        answer: "Percent means ‘per hundred,’ so dividing by 100 converts the percentage into a decimal that can be multiplied by the total value.",
      },
      {
        question: "Can this calculator be used for discounts and sales tax?",
        answer: "Yes, this calculator can help estimate discounts, sales tax amounts, tips, and similar percentage-based values. For example, you can calculate 20% off a price or find the tax amount on a purchase.",
      },
    ],
    relatedTools: ["loan-payment-calculator", "compound-interest-calculator"],
    formulaSummary:
      "This calculator solves a basic percentage problem using a standard percentage formula:\n\nPercentage value = percentage ÷ 100 × total value\n\nIn simple terms, the calculator takes the percentage you enter, converts it into a decimal, and multiplies it by the total value.\n\nFor example:\n\n- 10% of 200 = 0.10 × 200 = 20\n- 25% of 80 = 0.25 × 80 = 20\n- 15% of 240 = 0.15 × 240 = 36\n\nThis type of calculation is commonly used for discounts, taxes, commissions, tips, grades, interest estimates, and many other day-to-day calculations.",
    example: {
      inputs: { value: 240, percentage: 15 },
      explanation:
        "Find 15% of 240. This example shows how a percentage can be converted into a usable number. Instead of thinking of 15% as an abstract rate, the calculator shows the actual amount represented by that percentage.",
      results: [{ label: "15% of 240", value: "36" }],
    },
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    category: "finance",
    description: "Estimate growth and interest earned from compounding over time.",
    keywords: ["compound interest calculator", "investment growth"],
    inputs: [
      {
        name: "principal",
        label: "Starting amount",
        type: "number",
        placeholder: "10000",
        helpText: "This is the balance you start with before growth.",
        required: true,
        min: 0.01,
        step: 0.01,
      },
      {
        name: "annualRate",
        label: "Annual rate (%)",
        type: "number",
        placeholder: "5",
        helpText: "Use the nominal yearly rate before compounding.",
        required: true,
        min: 0,
        step: 0.01,
      },
      {
        name: "timesPerYear",
        label: "Compounds per year",
        type: "number",
        placeholder: "12",
        helpText: "12 means monthly compounding, 4 means quarterly, 1 means yearly.",
        required: true,
        min: 1,
        step: 1,
      },
      {
        name: "years",
        label: "Years invested",
        type: "number",
        placeholder: "10",
        helpText: "Enter the total number of years the balance will compound.",
        required: true,
        min: 1,
        step: 1,
      },
    ],
    outputs: [
      {
        key: "finalAmount",
        label: "Estimated final balance",
        format: "currency",
        description: "Projected total balance after compounding.",
      },
      {
        key: "interestEarned",
        label: "Interest earned",
        format: "currency",
        description: "Growth above the original starting amount.",
      },
    ],
    faq: [
      {
        question: "Does this include extra contributions?",
        answer: "No. This version only models growth from the initial principal.",
      },
      {
        question: "What does compounds per year mean?",
        answer: "It is how often interest is added to the balance each year, such as 12 for monthly compounding.",
      },
    ],
    relatedTools: ["loan-payment-calculator", "percentage-calculator"],
    formulaSummary:
      "Compound growth uses principal × (1 + rate ÷ compounds per year) raised to compounds per year × years.",
    example: {
      inputs: { principal: 10000, annualRate: 5, timesPerYear: 12, years: 10 },
      explanation: "This shows how a starting balance grows with regular monthly compounding over a decade.",
    },
  },
  {
    slug: "date-difference-calculator",
    title: "Date Difference Calculator",
    category: "time",
    description: "Measure the number of days and weeks between two dates.",
    keywords: ["date difference calculator", "days between dates"],
    inputs: [
      {
        name: "startDate",
        label: "Start date",
        type: "date",
        helpText: "Choose the earlier date when possible for a clearer summary.",
        required: true,
      },
      {
        name: "endDate",
        label: "End date",
        type: "date",
        helpText: "If the dates are reversed, the tool will still return the absolute difference.",
        required: true,
      },
    ],
    outputs: [
      { key: "days", label: "Difference in days", format: "number", description: "Total whole days between the two selected dates." },
      { key: "weeks", label: "Difference in weeks", format: "number", description: "Approximate difference converted into weeks." },
    ],
    faq: [
      {
        question: "Does order matter?",
        answer: "No. The calculator returns the absolute difference between the two dates.",
      },
      {
        question: "Why show weeks too?",
        answer: "Weeks give a quick planning view for longer spans.",
      },
    ],
    relatedTools: ["age-calculator", "time-duration-calculator"],
    formulaSummary: "The calculator subtracts one date from the other and converts the difference into days and weeks.",
    example: {
      inputs: { startDate: "2026-01-01", endDate: "2026-02-15" },
      explanation: "This shows the elapsed days and approximate weeks between two calendar dates.",
    },
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    category: "time",
    description: "Calculate age in full years from a birth date.",
    keywords: ["age calculator", "calculate age"],
    inputs: [
      {
        name: "birthDate",
        label: "Birth date",
        type: "date",
        helpText: "Enter the person’s actual date of birth.",
        required: true,
      },
      {
        name: "asOfDate",
        label: "As-of date",
        type: "date",
        helpText: "Use a specific date to calculate historical or future age.",
        required: true,
      },
    ],
    outputs: [
      { key: "years", label: "Completed years", format: "number", description: "Age in full completed years." },
      { key: "months", label: "Remaining months", format: "number", description: "Full remaining months after completed years are counted." },
      { key: "days", label: "Remaining days", format: "number", description: "Remaining days after years and months are counted." },
      { key: "ageText", label: "Precise age", format: "text", description: "Combined age shown as years, months, and days." },
      { key: "ageLabel", label: "Age summary", format: "text", description: "Readable date reference for the age calculation." },
    ],
    faq: [
      {
        question: "Can I leave the as-of date blank?",
        answer: "Yes. If blank in the UI later, it can default to today.",
      },
      {
        question: "Does it handle birthdays that have not happened yet this year?",
        answer: "Yes. The calculator subtracts a year when the current date is before the birthday.",
      },
    ],
    relatedTools: ["date-difference-calculator", "time-duration-calculator"],
    formulaSummary: "Age is the year difference adjusted based on whether the birthday has occurred yet.",
    example: {
      inputs: { birthDate: "1990-06-15", asOfDate: "2026-04-19" },
      explanation: "This shows age in completed years as of a chosen date.",
    },
  },
  {
    slug: "time-duration-calculator",
    title: "Time Duration Calculator",
    category: "time",
    description: "Find the elapsed time between two clock times, including overnight spans.",
    keywords: ["time duration calculator", "hours between times"],
    inputs: [
      {
        name: "startTime",
        label: "Start time",
        type: "time",
        helpText: "Use 24-hour format, for example 22:15.",
        required: true,
      },
      {
        name: "endTime",
        label: "End time",
        type: "time",
        helpText: "If the end time is earlier, the calculator treats it as the next day.",
        required: true,
      },
    ],
    outputs: [
      { key: "hours", label: "Hours", format: "number", description: "Whole hours in the duration." },
      { key: "minutes", label: "Remaining minutes", format: "number", description: "Minutes left after full hours are removed." },
      { key: "totalMinutes", label: "Total minutes", format: "number", description: "Full duration converted into minutes." },
    ],
    faq: [
      {
        question: "Can the end time be after midnight?",
        answer: "Yes. If the end time is earlier than the start time, the calculator treats it as the next day.",
      },
      {
        question: "What is total minutes for?",
        answer: "It helps when converting the duration into payroll or planning workflows.",
      },
    ],
    relatedTools: ["date-difference-calculator", "age-calculator"],
    formulaSummary: "The calculator converts both times to minutes, adjusts for overnight spans, and subtracts start from end.",
    example: {
      inputs: { startTime: "22:15", endTime: "01:45" },
      explanation: "This shows a duration that crosses midnight and still returns the correct elapsed time.",
    },
  },
  {
    slug: "temperature-converter",
    title: "Temperature Converter",
    category: "conversions",
    description: "Convert between Celsius, Fahrenheit, and Kelvin.",
    keywords: ["temperature converter", "celsius to fahrenheit"],
    inputs: [
      {
        name: "value",
        label: "Temperature value",
        type: "number",
        placeholder: "100",
        helpText: "Enter the numeric temperature before choosing units.",
        required: true,
        step: 0.01,
      },
      {
        name: "fromUnit",
        label: "Convert from",
        type: "select",
        required: true,
        options: [
          { label: "Celsius", value: "celsius" },
          { label: "Fahrenheit", value: "fahrenheit" },
          { label: "Kelvin", value: "kelvin" },
        ],
      },
      {
        name: "toUnit",
        label: "Convert to",
        type: "select",
        required: true,
        options: [
          { label: "Celsius", value: "celsius" },
          { label: "Fahrenheit", value: "fahrenheit" },
          { label: "Kelvin", value: "kelvin" },
        ],
      },
    ],
    outputs: [
      { key: "convertedValue", label: "Converted temperature", format: "number", description: "Converted result in the selected target unit." },
    ],
    faq: [
      {
        question: "Can this convert negative temperatures?",
        answer: "Yes. The formula supports negative Celsius and Fahrenheit values.",
      },
      {
        question: "Why use Kelvin?",
        answer: "Kelvin is commonly used in scientific and engineering contexts.",
      },
    ],
    relatedTools: ["length-converter"],
    formulaSummary: "The calculator converts the input to Celsius first, then from Celsius to the selected target unit.",
    example: {
      inputs: { value: 100, fromUnit: "celsius", toUnit: "fahrenheit" },
      explanation: "100°C converts to 212°F.",
    },
  },
  {
    slug: "length-converter",
    title: "Length Converter",
    category: "conversions",
    description: "Convert common distance and length units quickly.",
    keywords: ["length converter", "meters to feet"],
    inputs: [
      {
        name: "value",
        label: "Length value",
        type: "number",
        placeholder: "10",
        helpText: "Enter the measurement you want to convert.",
        required: true,
        min: 0,
        step: 0.01,
      },
      {
        name: "fromUnit",
        label: "Convert from",
        type: "select",
        required: true,
        options: [
          { label: "Millimeters", value: "millimeters" },
          { label: "Centimeters", value: "centimeters" },
          { label: "Meters", value: "meters" },
          { label: "Kilometers", value: "kilometers" },
          { label: "Inches", value: "inches" },
          { label: "Feet", value: "feet" },
          { label: "Yards", value: "yards" },
        ],
      },
      {
        name: "toUnit",
        label: "Convert to",
        type: "select",
        required: true,
        options: [
          { label: "Millimeters", value: "millimeters" },
          { label: "Centimeters", value: "centimeters" },
          { label: "Meters", value: "meters" },
          { label: "Kilometers", value: "kilometers" },
          { label: "Inches", value: "inches" },
          { label: "Feet", value: "feet" },
          { label: "Yards", value: "yards" },
        ],
      },
    ],
    outputs: [
      { key: "convertedValue", label: "Converted length", format: "number", description: "Converted result in the selected destination unit." },
    ],
    faq: [
      {
        question: "Which units are included?",
        answer: "This version supports common metric and imperial length units.",
      },
      {
        question: "Can I use decimals?",
        answer: "Yes. Decimal values are useful for precise measurement conversions.",
      },
    ],
    relatedTools: ["temperature-converter"],
    formulaSummary: "The calculator converts the input into meters, then converts meters into the selected target unit.",
    example: {
      inputs: { value: 10, fromUnit: "meters", toUnit: "feet" },
      explanation: "10 meters converts to approximately 32.8084 feet.",
    },
  },
  {
    slug: "word-counter",
    title: "Word Counter",
    category: "text",
    description: "Count words, characters, and characters without spaces in text instantly.",
    keywords: ["word counter", "character count"],
    inputs: [
      {
        name: "text",
        label: "Text to analyze",
        type: "textarea",
        placeholder: "Paste or type text here",
        helpText: "You can paste anything from a sentence to a longer paragraph.",
        required: true,
      },
    ],
    outputs: [
      { key: "words", label: "Word count", format: "number", description: "Number of whitespace-separated words detected." },
      { key: "characters", label: "Character count", format: "number", description: "Total characters including spaces and punctuation." },
      { key: "charactersNoSpaces", label: "Characters without spaces", format: "number", description: "Useful for stricter writing or platform limits." },
    ],
    faq: [
      {
        question: "How are words counted?",
        answer: "Words are counted by splitting the text on whitespace after trimming leading and trailing spaces.",
      },
      {
        question: "Can I use this for essays and posts?",
        answer: "Yes. It is useful for writing limits, summaries, and social posts.",
      },
    ],
    relatedTools: ["case-converter"],
    formulaSummary: "The calculator counts words by whitespace, then separately counts all characters and non-space characters.",
    example: {
      inputs: { text: "SolvrTools makes utility pages easier to launch." },
      explanation: "This returns the word count plus two character totals for quick writing checks.",
    },
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    category: "text",
    description: "Convert text into uppercase, lowercase, title case, or sentence case.",
    keywords: ["case converter", "uppercase lowercase converter"],
    inputs: [
      {
        name: "text",
        label: "Text to convert",
        type: "textarea",
        placeholder: "Paste or type text here",
        helpText: "Enter the text you want to transform.",
        required: true,
      },
      {
        name: "mode",
        label: "Conversion mode",
        type: "select",
        helpText: "Choose the text style you want to apply.",
        required: true,
        options: [
          { label: "Uppercase", value: "uppercase" },
          { label: "Lowercase", value: "lowercase" },
          { label: "Title Case", value: "titlecase" },
          { label: "Sentence case", value: "sentencecase" },
        ],
      },
    ],
    outputs: [
      { key: "convertedText", label: "Converted text", format: "text", description: "Text transformed using the selected case style." },
    ],
    faq: [
      {
        question: "What is title case?",
        answer: "Title case capitalizes the first letter of each word.",
      },
      {
        question: "Can I convert long text?",
        answer: "Yes. The converter can handle full paragraphs for quick formatting changes.",
      },
    ],
    relatedTools: ["word-counter"],
    formulaSummary: "The calculator applies the selected text transformation mode to the input string.",
    example: {
      inputs: { text: "solvrtools makes text cleanup easy", mode: "titlecase" },
      explanation: "Title case transforms the sentence into a more headline-ready format.",
    },
  },
  {
    slug: "paint-calculator",
    title: "Paint Calculator",
    category: "home",
    description: "Estimate paint needed based on wall dimensions, coats, coverage rate, and openings.",
    intro: [
      "Use this paint calculator to estimate how much paint you need for a wall or room surface based on its size, the number of coats, and common openings such as doors and windows. This tool helps you avoid buying too little or too much paint when planning a painting project.",
      "By adjusting the wall dimensions, number of coats, and paint coverage rate, you can get a quick estimate of the amount of paint required for both small touch-ups and larger home improvement projects.",
    ],
    keywords: ["paint calculator", "paint needed calculator"],
    inputs: [
      {
        name: "unitSystem",
        label: "Unit system",
        type: "select",
        required: true,
        options: [
          { label: "Imperial (sq ft)", value: "imperial" },
          { label: "Metric (sq meters)", value: "metric" },
        ],
      },
      {
        name: "width",
        label: "Wall width",
        type: "number",
        placeholder: "20",
        helpText: "Measure the width of the wall or surface in your selected unit system.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "height",
        label: "Wall height",
        type: "number",
        placeholder: "8",
        helpText: "Measure the wall height in your selected unit system.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "doors",
        label: "Number of doors",
        type: "number",
        placeholder: "1",
        helpText: "Each door subtracts about 20 square feet or 1.86 square meters.",
        required: true,
        min: 0,
        step: 1,
      },
      {
        name: "windows",
        label: "Number of windows",
        type: "number",
        placeholder: "2",
        helpText: "Each window subtracts about 15 square feet or 1.39 square meters.",
        required: true,
        min: 0,
        step: 1,
      },
      {
        name: "coats",
        label: "Number of coats",
        type: "number",
        placeholder: "2",
        helpText: "Enter how many coats of paint you plan to apply.",
        required: true,
        min: 1,
        step: 1,
      },
      {
        name: "coveragePerGallon",
        label: "Coverage per gallon or litre",
        type: "number",
        placeholder: "350",
        helpText: "Use square feet per gallon for imperial or square meters per litre for metric.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
    ],
    outputs: [
      { key: "area", label: "Estimated paintable area", format: "number", description: "Wall area after subtracting doors and windows in the selected unit system." },
      { key: "paintNeeded", label: "Paint needed", format: "number", description: "Approximate paint required based on coverage, coats, and the selected unit system." },
      { key: "unitLabel", label: "Unit summary", format: "text", description: "Indicates whether the result uses imperial or metric paint wording." },
    ],
    faq: [
      {
        question: "Does this include doors and windows?",
        answer: "Yes. This version subtracts standard door and window area from the total paintable surface.",
      },
      {
        question: "Why enter coats?",
        answer: "Extra coats increase the total paint required.",
      },
      {
        question: "How do I estimate how much paint I need?",
        answer: "To estimate paint needed, calculate the total wall area, subtract any areas that will not be painted such as doors and windows, multiply by the number of coats, and divide by the paint coverage rate. This calculator does those steps for you automatically.",
      },
      {
        question: "Should I include doors and windows in my paint estimate?",
        answer: "In many cases, no. Doors and windows reduce the paintable area, so excluding them can give you a more accurate estimate. This calculator accounts for them using simple default opening areas.",
      },
      {
        question: "Why does the number of coats matter?",
        answer: "Each coat requires additional paint. If you plan to apply two coats instead of one, the total paint needed will increase because the paintable area is effectively covered twice.",
      },
      {
        question: "What is paint coverage rate?",
        answer: "Paint coverage rate is the amount of surface area one gallon or litre of paint can cover. The actual number depends on the product, surface texture, and application method, but manufacturers usually provide a recommended coverage estimate.",
      },
      {
        question: "Is this paint calculator exact?",
        answer: "No, it is an estimate. Real paint usage can vary depending on surface texture, paint thickness, surface preparation, porosity, and whether you are using a brush, roller, or sprayer.",
      },
      {
        question: "Can I use this calculator for metric measurements?",
        answer: "Yes, the calculator supports both imperial and metric workflows so you can estimate paint needs using the unit system that matches your project.",
      },
    ],
    relatedTools: ["square-footage-calculator"],
    formulaSummary:
      "This calculator estimates paint needed by first calculating the total wall area, subtracting the area taken up by doors and windows, and then multiplying the remaining paintable surface by the number of coats.\n\nThe calculation takes into account:\n- Wall width and height\n- Number of doors\n- Number of windows\n- Number of coats\n- Paint coverage rate\n- Unit system (imperial or metric)\n\nIn general, the process works like this:\n\n- Wall area = width × height\n- Opening area is subtracted for doors and windows\n- Remaining paintable area is multiplied by the number of coats\n- Total paintable area is divided by the paint coverage rate\n\nThis gives an estimated amount of paint needed for the project. Because real-world coverage can vary by paint type, surface texture, and application method, the result should be treated as a practical estimate rather than an exact guarantee.",
    example: {
      inputs: { unitSystem: "imperial", width: 20, height: 8, doors: 1, windows: 2, coats: 2, coveragePerGallon: 350 },
      explanation:
        "Estimate paint for a 20 by 8 foot wall with one door, two windows, two coats, and typical imperial paint coverage. This example shows how the calculator accounts for wall size, openings, and multiple coats. Even a fairly large wall may require less paint than expected once doors and windows are excluded from the total paintable surface.",
      results: [{ label: "Estimated paint needed", value: "about 0.63 gallons" }],
    },
  },
  {
    slug: "square-footage-calculator",
    title: "Square Footage Calculator",
    category: "home",
    description: "Calculate area from length and width for rooms, flooring, and planning projects.",
    keywords: ["square footage calculator", "room area calculator"],
    inputs: [
      {
        name: "length",
        label: "Length (ft)",
        type: "number",
        placeholder: "12",
        helpText: "Enter the longest side of the rectangular space.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "width",
        label: "Width (ft)",
        type: "number",
        placeholder: "15",
        helpText: "Enter the shorter side or cross measurement in feet.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
    ],
    outputs: [
      { key: "squareFeet", label: "Total square footage", format: "number", suffix: " sq ft", description: "Area of the rectangular surface or room." },
    ],
    faq: [
      {
        question: "What shape does this support?",
        answer: "This version is for simple rectangular spaces.",
      },
      {
        question: "Can I use decimals?",
        answer: "Yes. Decimal measurements help when working with real rooms and materials.",
      },
    ],
    relatedTools: ["paint-calculator"],
    formulaSummary: "Square footage is length multiplied by width.",
    example: {
      inputs: { length: 12, width: 15 },
      explanation: "A 12 by 15 foot room has 180 square feet of area.",
    },
  },
];

export function getToolDefinition(category: string, slug: string) {
  return toolDefinitions.find((tool) => tool.category === category && tool.slug === slug);
}
