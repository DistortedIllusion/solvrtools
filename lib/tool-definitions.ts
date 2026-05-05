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
    intro: [
      "Use this compound interest calculator to estimate how a balance can grow over time based on the starting principal, annual interest rate, compounding frequency, and number of years. This tool is useful for projecting savings growth, investment balances, and other scenarios where interest is added repeatedly over time.",
      "By adjusting the inputs, you can quickly compare how different rates, time periods, and compounding schedules affect your future balance.",
    ],
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
      {
        question: "What is compound interest?",
        answer: "Compound interest is interest calculated on both the original principal and the interest already earned over time. This allows the balance to grow faster than simple interest.",
      },
      {
        question: "How does compounding frequency affect results?",
        answer: "Compounding frequency determines how often interest is added to the balance. More frequent compounding can slightly increase the final amount because interest begins earning additional interest sooner.",
      },
      {
        question: "What affects compound growth the most?",
        answer: "The most important factors are the starting balance, the interest rate, the compounding frequency, and the amount of time the money remains invested. In many cases, time has the greatest long-term impact.",
      },
      {
        question: "Is compound interest the same as simple interest?",
        answer: "No. Simple interest is calculated only on the original principal, while compound interest is calculated on the principal plus previously earned interest.",
      },
      {
        question: "Can I use this calculator for savings and investments?",
        answer: "Yes, this calculator can be used for savings accounts, investments, and other balances that grow through compound interest.",
      },
      {
        question: "Why does money grow faster over longer periods?",
        answer: "Over longer time periods, each round of earned interest has more opportunities to generate additional interest. That compounding effect becomes more noticeable the longer the balance remains invested.",
      },
    ],
    relatedTools: ["loan-payment-calculator", "percentage-calculator"],
    formulaSummary:
      "This calculator estimates future value using the standard compound interest formula:\n\nA = P(1 + r / n)^(nt)\n\nWhere:\n\n- A = final amount\n- P = starting principal\n- r = annual interest rate as a decimal\n- n = number of compounding periods per year\n- t = number of years\n\nCompound interest works by applying interest not only to the original principal, but also to interest that has already been added in previous periods. Over time, this causes growth to build on itself.\n\nIn general:\n\n- A larger starting principal increases the base amount that earns interest\n- A higher interest rate increases the growth rate\n- More frequent compounding can increase the ending balance\n- A longer time period usually has the biggest impact because the balance has more time to compound",
    example: {
      inputs: { principal: 10000, annualRate: 5, timesPerYear: 12, years: 10 },
      explanation:
        "Estimate the future value of a $10,000 starting balance at 5% annual interest, compounded monthly, over 10 years. This example shows how a starting balance grows when interest is compounded monthly over a long period. Even without additional contributions, compounding increases the total balance because each interest calculation builds on the previous one.",
      results: [
        { label: "Final balance", value: "approximately $16,470.09" },
        { label: "Interest earned", value: "approximately $6,470.09" },
      ],
    },
  },
  {
    slug: "date-difference-calculator",
    title: "Date Difference Calculator",
    category: "time",
    description: "Measure the number of days and weeks between two dates.",
    intro: [
      "Use this date difference calculator to find the number of days, weeks, or other elapsed time between two calendar dates. This tool is useful for planning schedules, measuring project timelines, tracking deadlines, and answering everyday date-based questions quickly.",
      "By entering a start date and an end date, you can instantly see the time between them without counting days manually.",
    ],
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
      {
        question: "How do you calculate the difference between two dates?",
        answer: "The difference between two dates is calculated by measuring the elapsed time from the start date to the end date. A date difference calculator does this automatically and can present the result in days, weeks, or other supported units.",
      },
      {
        question: "Does this calculator include both the start date and end date?",
        answer: "That depends on the calculator’s implementation. Many date difference tools measure the elapsed time between the two dates rather than counting both dates inclusively, so the result reflects the gap between them.",
      },
      {
        question: "Why is date difference harder to calculate by hand?",
        answer: "Date calculations can be tricky because months have different lengths and leap years can affect totals. A calculator helps avoid manual counting mistakes.",
      },
      {
        question: "Can I use this calculator for deadlines and project timelines?",
        answer: "Yes, this calculator is useful for project planning, deadlines, scheduling, event preparation, and any situation where you need to know the amount of time between two dates.",
      },
      {
        question: "What is the difference between days and approximate weeks?",
        answer: "Days show the exact elapsed total in days, while approximate weeks divide that total by 7 to give a more general time estimate.",
      },
      {
        question: "Can this calculator be used for future dates?",
        answer: "Yes, you can use it for both past and future date ranges as long as you want to measure the time between two calendar dates.",
      },
    ],
    relatedTools: ["age-calculator", "time-duration-calculator"],
    formulaSummary:
      "This calculator compares two calendar dates and measures the elapsed time between them. Depending on the tool’s output format, the result may be shown in total days, approximate weeks, or other easy-to-read units.\n\nIn general, the calculation works like this:\n\n- A start date is selected\n- An end date is selected\n- The calculator measures the time that passes between those two points on the calendar\n- The result is then displayed in the supported output format\n\nThis is helpful because date differences are not always easy to calculate by hand. Month lengths vary, leap years can affect totals, and even a short range can be harder to count accurately than it first appears.\n\nThat makes this calculator useful for planning events, project work, travel timing, contracts, or any situation where you need a quick elapsed-date estimate.",
    example: {
      inputs: { startDate: "2026-01-01", endDate: "2026-02-15" },
      explanation:
        "Find the elapsed time between January 1, 2026 and February 15, 2026. This example shows how the calculator converts the gap between two calendar dates into a practical elapsed-time result. Instead of counting day by day, you can immediately see the total difference.",
      results: [
        { label: "Difference", value: "45 days" },
        { label: "Approximate weeks", value: "6.43 weeks" },
      ],
    },
  },
  {
    slug: "age-calculator",
    title: "Age Calculator",
    category: "time",
    description: "Calculate exact age in years, months, and days from a birth date and as-of date.",
    intro: [
      "Use this age calculator to find an exact age in years, months, and days based on a birth date and a chosen as-of date. This tool is useful for personal reference, forms, records, school or work requirements, and any situation where you need a precise age instead of a rough estimate.",
      "By entering a birth date and an as-of date, you can quickly calculate a clear age breakdown and avoid doing calendar math by hand.",
    ],
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
        answer: "This version of the tool expects an explicit as-of date so the result reflects the exact date you want to measure against.",
      },
      {
        question: "Does it handle birthdays that have not happened yet this year?",
        answer: "Yes. The calculator adjusts the result when the as-of date falls before the birthday in the selected year.",
      },
      {
        question: "How is age calculated?",
        answer: "Age is calculated by finding the difference between a birth date and an as-of date, then expressing that difference in completed years, remaining months, and remaining days.",
      },
      {
        question: "Why do I need an as-of date?",
        answer: "The as-of date tells the calculator the exact date on which age should be measured. This is helpful if you want to know your age today, on a future date, or on a past date for a form or record.",
      },
      {
        question: "Is exact age different from age in completed years?",
        answer: "Yes. Completed years only tell you how many full birthdays have passed. Exact age includes the additional months and days beyond the last birthday.",
      },
      {
        question: "Does this calculator account for leap years?",
        answer: "Yes, an exact age calculation should account for real calendar differences such as leap years and varying month lengths to produce a more accurate result.",
      },
      {
        question: "Can I calculate age for a future date?",
        answer: "Yes, you can enter a future as-of date to estimate how old someone will be on that date.",
      },
      {
        question: "Why not just subtract the birth year from the current year?",
        answer: "Subtracting the years gives only a rough result. It does not account for whether the birthday has occurred yet in the selected year, and it does not include the remaining months and days.",
      },
    ],
    relatedTools: ["date-difference-calculator", "time-duration-calculator"],
    formulaSummary:
      "This calculator finds the difference between a date of birth and a selected as-of date, then breaks that difference into completed years, remaining months, and remaining days.\n\nIn general, the calculation works like this:\n\n- First, it determines the number of completed years between the two dates\n- Then it calculates the remaining full months\n- Finally, it calculates the remaining days after those years and months are accounted for\n\nThis produces a more precise result than simply subtracting one year from another. Exact age calculations need to account for month lengths, whether a birthday has already occurred, and leap years when applicable.\n\nThat makes this calculator useful when you need a clear calendar-based age result rather than just an approximate age in years.",
    example: {
      inputs: { birthDate: "1990-06-15", asOfDate: "2026-04-19" },
      explanation:
        "Find the exact age for someone born on June 15, 1990, as of April 19, 2026. This example shows how the calculator measures completed years first, then adds the remaining months and days to give a more exact age result.",
      results: [{ label: "Age", value: "35 years, 10 months, 4 days" }],
    },
  },
  {
    slug: "time-duration-calculator",
    title: "Time Duration Calculator",
    category: "time",
    description: "Find the elapsed time between two clock times, including overnight spans.",
    intro: [
      "Use this time duration calculator to find the elapsed time between a start time and an end time. This tool is useful for shift lengths, travel timing, work logs, scheduling, and any everyday situation where you need to know how much time passes between two clock times.",
      "It can also help with time ranges that cross midnight, making it easier to calculate overnight durations without doing the math manually.",
    ],
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
      {
        question: "How do I calculate the time between two times?",
        answer: "To calculate the time between two times, subtract the start time from the end time and account for any borrowed minutes. If the end time is earlier than the start time, the duration may cross midnight.",
      },
      {
        question: "What if the time range crosses midnight?",
        answer: "If the end time is earlier than the start time, the calculator can treat the range as continuing into the next day. That allows it to return the correct elapsed time for overnight periods.",
      },
      {
        question: "Can I use this for work shifts?",
        answer: "Yes, this calculator is useful for estimating shift durations, work sessions, overnight coverage, and other scheduled time blocks.",
      },
      {
        question: "Why is time duration harder to calculate by hand?",
        answer: "Time calculations often involve carrying or borrowing minutes, and overnight time ranges can be especially confusing. A calculator helps avoid mistakes and gives a faster answer.",
      },
      {
        question: "Can I use this for travel or event timing?",
        answer: "Yes, this calculator can be used for travel durations, event schedules, appointments, and any other time-based planning.",
      },
      {
        question: "What does elapsed time mean?",
        answer: "Elapsed time is the total amount of time that passes from a starting point to an ending point.",
      },
    ],
    relatedTools: ["date-difference-calculator", "age-calculator"],
    formulaSummary:
      "This calculator compares a start time and an end time to determine the elapsed duration between them.\n\nIn general, the calculation works like this:\n\n- A start time is entered\n- An end time is entered\n- The calculator measures how much time passes between the two\n- If the end time is earlier than the start time, the calculator treats the range as crossing midnight\n\nThis is useful because time calculations can get confusing when minutes need to be carried over or when a duration continues into the next day. The calculator handles those cases automatically and returns the elapsed time in a clear format.",
    example: {
      inputs: { startTime: "22:15", endTime: "01:45" },
      explanation:
        "Find the duration from 22:15 to 01:45. This example shows how the calculator handles a time range that crosses midnight. Instead of producing a negative result, it correctly treats the end time as occurring on the next day.",
      results: [{ label: "Duration", value: "3 hours 30 minutes" }],
    },
  },
  {
    slug: "temperature-converter",
    title: "Temperature Converter",
    category: "conversions",
    description: "Convert between Celsius, Fahrenheit, and Kelvin.",
    intro: [
      "Use this temperature converter to quickly convert values between common temperature scales such as Celsius and Fahrenheit. This tool is useful for cooking, weather checks, science problems, travel, and any situation where you need to see what a temperature means in another unit.",
      "By entering a value and choosing the from/to units, you can instantly convert temperatures without having to remember or manually apply conversion formulas.",
    ],
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
      {
        question: "How do I convert Celsius to Fahrenheit?",
        answer: "To convert Celsius to Fahrenheit, multiply the Celsius value by 9/5 and then add 32. For example, 100°C becomes 212°F.",
      },
      {
        question: "How do I convert Fahrenheit to Celsius?",
        answer: "To convert Fahrenheit to Celsius, subtract 32 from the Fahrenheit value and then multiply the result by 5/9.",
      },
      {
        question: "When would I need a temperature converter?",
        answer: "A temperature converter is useful when cooking with recipes from other countries, checking weather forecasts in different units, solving science or math problems, or translating technical information.",
      },
      {
        question: "What are the most common temperature units?",
        answer: "Celsius and Fahrenheit are the most frequently used in everyday life. Some scientific contexts also use Kelvin, but everyday weather and cooking typically rely on Celsius or Fahrenheit.",
      },
      {
        question: "Why do Celsius and Fahrenheit have different zero points?",
        answer: "Celsius and Fahrenheit use different reference points and scale sizes. For example, water freezes at 0°C and 32°F, and boils at 100°C and 212°F, which is why conversion formulas are needed.",
      },
      {
        question: "Does this tool round the result?",
        answer: "Depending on the implementation, the converter may round the result to a practical number of decimal places for easier reading. The underlying formula remains the same.",
      },
    ],
    relatedTools: ["length-converter"],
    formulaSummary:
      "This calculator uses standard temperature conversion formulas to translate values from one unit to another.\n\nFor example:\n\n- Celsius to Fahrenheit: F = C × 9/5 + 32\n- Fahrenheit to Celsius: C = (F − 32) × 5/9\n\nThe converter:\n\n- takes your input value\n- applies the appropriate formula based on the selected from and to units\n- returns the converted temperature in the target unit\n\nThis is helpful when recipes, weather reports, or technical materials use a different temperature scale than you are familiar with.",
    example: {
      inputs: { value: 100, fromUnit: "celsius", toUnit: "fahrenheit" },
      explanation:
        "Convert boiling water temperature from Celsius to Fahrenheit. This example shows one of the most common conversions. At standard pressure, water boils at 100 degrees Celsius, which is equal to 212 degrees Fahrenheit.",
      results: [{ label: "Converted temperature", value: "100°C converts to 212°F" }],
    },
  },
  {
    slug: "length-converter",
    title: "Length Converter",
    category: "conversions",
    description: "Convert common distance and length units quickly.",
    intro: [
      "Use this length converter to quickly convert distances between common units such as meters, feet, kilometers, inches, and yards. This is helpful for travel planning, construction and DIY projects, fitness tracking, and any situation where measurements appear in a different unit than you’re used to.",
      "By entering a value and choosing the from/to units, you can instantly convert lengths without having to remember or manually apply conversion formulas.",
    ],
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
      {
        question: "What units can I convert between?",
        answer: "This tool converts between common length units such as millimeters, centimeters, meters, kilometers, inches, feet, and yards, depending on which units are enabled in the current interface.",
      },
      {
        question: "When would I use a length converter?",
        answer: "A length converter is useful when working with international measurements, reading building or engineering drawings, planning travel distances, checking sports field dimensions, or converting specs from online stores.",
      },
      {
        question: "Why do metric and imperial units give such different numbers?",
        answer: "Metric units like meters and kilometers and imperial units like feet and yards use different base measurements, so the numbers will not match. A converter applies the correct factor so the physical distance stays the same even though the number and unit change.",
      },
      {
        question: "Does this tool round the result?",
        answer: "The converter may round results to a practical number of decimal places so they are easier to read. The underlying conversion factors are standard, and only the displayed value is rounded.",
      },
      {
        question: "Is this accurate enough for technical work?",
        answer: "For everyday use, planning, and most projects, the level of precision provided is more than sufficient. For high-precision engineering or scientific work, you may want to confirm the required number of decimal places or significant figures for your specific application.",
      },
    ],
    relatedTools: ["temperature-converter"],
    formulaSummary:
      "This converter uses standard length conversion factors to translate a value from one unit to another.\n\nFor example:\n\n- Meters to feet: feet = meters × 3.28084\n- Kilometers to yards: yards = kilometers × 1093.61\n\nWhen you enter a value and select the from and to units, the tool:\n\n- takes your input value\n- multiplies it by the correct conversion factor\n- returns the converted distance in the target unit\n\nThis makes it easy to understand distances in the units you are most comfortable with, without doing the math by hand.",
    example: {
      inputs: { value: 10, fromUnit: "meters", toUnit: "feet" },
      explanation:
        "Convert a distance from meters to feet. This example shows how a metric distance translates into imperial units. Knowing that 10 meters is a bit over 32 feet can help when reading building plans, equipment specs, or sports measurements that use different unit systems.",
      results: [{ label: "Converted length", value: "10 meters converts to approximately 32.8084 feet." }],
    },
  },
  {
    slug: "word-counter",
    title: "Word Counter",
    category: "text",
    description: "Count words, characters, and characters without spaces in text instantly.",
    intro: [
      "Use this word counter to quickly count words and characters in a block of text. This tool is useful for writing checks, article drafts, assignments, social posts, and any situation where you need a fast text-length overview.",
      "By pasting or typing your text into the input area, you can instantly see word count and character totals without counting manually.",
    ],
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
        question: "Can I use this for essays and posts?",
        answer: "Yes. It is useful for writing limits, summaries, and social posts.",
      },
      {
        question: "What does a word counter do?",
        answer: "A word counter measures the number of words in a block of text. Many word counters also show character totals and other basic writing metrics.",
      },
      {
        question: "How are words counted?",
        answer: "Words are generally counted by separating text into individual units based on spaces and punctuation boundaries, according to the tool’s counting logic.",
      },
      {
        question: "What is the difference between characters with spaces and without spaces?",
        answer: "Characters with spaces include every visible letter, number, punctuation mark, and space. Characters without spaces exclude the spaces between words.",
      },
      {
        question: "Can I use this for essays, articles, or assignments?",
        answer: "Yes, a word counter is useful for checking text length in essays, blog posts, assignments, summaries, and many other writing tasks.",
      },
      {
        question: "Why would I need a character count?",
        answer: "Character count is helpful when working with forms, headlines, social posts, metadata fields, and other spaces where a text-length limit matters.",
      },
      {
        question: "Does punctuation count as characters?",
        answer: "Yes, punctuation marks are usually included in the character total because they are part of the text.",
      },
    ],
    relatedTools: ["case-converter"],
    formulaSummary:
      "This calculator analyzes the text you enter and returns basic writing metrics such as total word count and character totals.\n\nIn general:\n\n- Words are counted by identifying separate text units divided by spaces or punctuation boundaries, depending on the tool’s logic\n- Character totals measure the number of characters in the text\n- Some counters distinguish between characters with spaces and characters without spaces\n\nThese numbers are useful for writing tasks where length matters, such as articles, essays, summaries, ad copy, form fields, and social content.\n\nA word counter can help you stay within limits, compare draft lengths, and quickly check whether a piece of writing is too short, too long, or approximately on target.",
    example: {
      inputs: { text: "SolvrTools makes utility pages easier to launch." },
      explanation:
        "Count the words and characters in this sentence. This example shows how the calculator gives a quick writing-length summary from a short piece of text. These totals can help when checking draft size, field limits, or simple writing requirements.",
      results: [
        { label: "Word count", value: "7" },
        { label: "Characters (with spaces)", value: "48" },
        { label: "Characters (without spaces)", value: "42" },
      ],
    },
  },
  {
    slug: "case-converter",
    title: "Case Converter",
    category: "text",
    description: "Convert text into uppercase, lowercase, title case, or sentence case.",
    intro: [
      "Use this case converter to quickly change text into different capitalization styles such as uppercase, lowercase, title case, and other supported formats. This tool is useful for cleaning up copied text, formatting headings, editing content, and preparing writing for documents, websites, or social posts.",
      "By entering text and choosing a conversion mode, you can instantly reformat the text without manually editing each word.",
    ],
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
      {
        question: "What is a case converter?",
        answer: "A case converter is a tool that changes the capitalization style of text. It can quickly reformat text into uppercase, lowercase, title case, or other supported letter-case styles.",
      },
      {
        question: "When would I use a case converter?",
        answer: "A case converter is useful when cleaning up copied text, formatting headings, preparing labels, editing documents, or making text more consistent across a project.",
      },
      {
        question: "Can I convert text without retyping it?",
        answer: "Yes, you can paste text into the converter and apply the selected formatting mode automatically instead of editing each word manually.",
      },
      {
        question: "Does this tool preserve the original meaning of the text?",
        answer: "Yes, a case converter changes the capitalization pattern of the text, not the underlying words or meaning.",
      },
      {
        question: "Why is title case useful?",
        answer: "Title case can make headings, titles, and labels look cleaner and more professional, especially when text is copied in all lowercase or inconsistent capitalization.",
      },
    ],
    relatedTools: ["word-counter"],
    formulaSummary:
      "This tool transforms the capitalization pattern of the text you enter based on the selected conversion mode.\n\nDepending on the mode, the converter can:\n\n- change all letters to uppercase\n- change all letters to lowercase\n- convert text into title case\n- apply other supported capitalization formats in the current tool\n\nThis is useful when text has inconsistent formatting or when you need to quickly prepare content for headings, labels, buttons, articles, notes, or other writing tasks.\n\nInstead of rewriting text by hand, a case converter applies the selected formatting pattern automatically.",
    example: {
      inputs: { text: "solvrtools makes text cleanup easy", mode: "titlecase" },
      explanation:
        "Convert the text 'solvrtools makes text cleanup easy' into title case. This example shows how title case changes the text into a more heading-ready format by capitalizing the main words in the sentence.",
      results: [{ label: "Converted text", value: "Solvrtools Makes Text Cleanup Easy" }],
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
    intro: [
      "Use this square footage calculator to find the area of a room, wall, floor, or other rectangular space. This tool is useful for estimating flooring, paint, tile, carpet, and other material needs during planning, renovation, or home improvement projects.",
      "By entering the length and width of a space, you can quickly calculate its total square footage without doing the math manually.",
    ],
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
      {
        question: "How do I calculate square footage?",
        answer: "To calculate square footage, multiply the length of the space by its width. For example, a room that is 12 feet by 15 feet has an area of 180 square feet.",
      },
      {
        question: "What is square footage used for?",
        answer: "Square footage is commonly used for estimating flooring, tile, carpet, paint coverage, and other renovation or home improvement materials. It is also useful for understanding the size of a room or area.",
      },
      {
        question: "Can I use this calculator for flooring estimates?",
        answer: "Yes, this calculator is useful for basic flooring estimates because it helps you determine the area of the floor surface.",
      },
      {
        question: "Does this work for walls and paint projects?",
        answer: "Yes, if you measure a wall’s height and width, this calculator can be used to estimate wall area. That can help with paint, wallpaper, or paneling calculations.",
      },
      {
        question: "What if the room is not a perfect rectangle?",
        answer: "If the space is not rectangular, you can break it into smaller rectangles, calculate each section separately, and then add the totals together.",
      },
      {
        question: "Why is square footage important for home projects?",
        answer: "Square footage helps you estimate how much material you need, compare costs, and avoid overbuying or underbuying supplies for a project.",
      },
    ],
    relatedTools: ["paint-calculator"],
    formulaSummary:
      "This calculator finds the area of a rectangular space using a simple formula:\n\nArea = length × width\n\nThe result is expressed in square units, such as square feet, when the measurements are entered in feet.\n\nThis type of calculation is commonly used for:\n\n- flooring estimates\n- paint and wall coverage planning\n- tile and carpet measurement\n- room sizing\n- basic renovation planning\n\nSquare footage is one of the most common ways to estimate the size of a space, and even a simple room measurement can be useful when planning materials, pricing, or layout decisions.",
    example: {
      inputs: { length: 12, width: 15 },
      explanation:
        "Find the square footage of a room that is 12 feet long and 15 feet wide. This example shows how square footage is calculated by multiplying length by width. The result can then be used to estimate materials such as flooring, paint coverage, or carpet for the space.",
      results: [{ label: "Area", value: "180 square feet" }],
    },
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    category: "health",
    description: "Estimate body mass index using metric or imperial measurements for height and weight.",
    intro: [
      "Use this BMI calculator to estimate body mass index from your height and weight. BMI is a quick screening measurement often used to group weight status into broad categories such as underweight, healthy weight, overweight, and obesity.",
      "This tool supports both metric and imperial inputs so you can calculate BMI using centimeters and kilograms or feet, inches, and pounds. It is most useful as a rough starting point rather than a full health assessment.",
    ],
    keywords: ["bmi calculator", "body mass index calculator", "healthy weight calculator"],
    inputs: [
      {
        name: "unitSystem",
        label: "Unit system",
        type: "select",
        required: true,
        options: [
          { label: "Metric (cm, kg)", value: "metric" },
          { label: "Imperial (ft, in, lb)", value: "imperial" },
        ],
      },
      {
        name: "heightCm",
        label: "Height (cm)",
        type: "number",
        placeholder: "178",
        helpText: "Use this field when calculating with metric units.",
        required: true,
        min: 1,
        step: 0.1,
      },
      {
        name: "weightKg",
        label: "Weight (kg)",
        type: "number",
        placeholder: "78",
        helpText: "Use this field when calculating with metric units.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "heightFeet",
        label: "Height (feet)",
        type: "number",
        placeholder: "5",
        helpText: "Use this field when calculating with imperial units.",
        required: true,
        min: 0,
        step: 1,
      },
      {
        name: "heightInches",
        label: "Additional height (inches)",
        type: "number",
        placeholder: "10",
        helpText: "Enter the remaining inches after feet for imperial height.",
        required: true,
        min: 0,
        step: 0.1,
      },
      {
        name: "weightPounds",
        label: "Weight (lb)",
        type: "number",
        placeholder: "172",
        helpText: "Use this field when calculating with imperial units.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
    ],
    outputs: [
      {
        key: "bmi",
        label: "BMI",
        format: "number",
        description: "Your estimated body mass index based on the selected inputs.",
      },
      {
        key: "category",
        label: "BMI category",
        format: "text",
        description: "General adult BMI category based on the calculated result.",
      },
      {
        key: "healthyRange",
        label: "Reference note",
        format: "text",
        description: "General adult reference range often used alongside BMI.",
      },
    ],
    faq: [
      {
        question: "What does BMI measure?",
        answer: "BMI estimates body mass relative to height. It is a quick screening tool, not a full picture of overall health.",
      },
      {
        question: "Can I use metric or imperial units?",
        answer: "Yes. This calculator accepts either centimeters and kilograms or feet, inches, and pounds.",
      },
      {
        question: "Is BMI always accurate for every person?",
        answer: "No. BMI is a broad screening method and does not directly measure muscle mass, body composition, or health conditions. Athletic builds, age, and other factors can make BMI less useful on its own.",
      },
      {
        question: "What BMI range is usually considered healthy?",
        answer: "For most adults, a BMI from 18.5 to 24.9 is commonly considered a healthy range. Under 18.5 is often classified as underweight, 25 to 29.9 as overweight, and 30 or higher as obesity.",
      },
      {
        question: "Should I use BMI as a medical diagnosis?",
        answer: "No. BMI can be a helpful starting point, but it should not replace professional medical advice or a more complete health assessment.",
      },
    ],
    relatedTools: [],
    formulaSummary:
      "BMI is calculated by dividing body weight by height squared.\n\nMetric formula:\nBMI = weight in kilograms ÷ (height in meters × height in meters)\n\nImperial measurements are first converted into metric values behind the scenes before the BMI result is calculated.\n\nGeneral adult BMI categories are commonly interpreted as:\n\n- Under 18.5: Underweight\n- 18.5 to 24.9: Healthy weight\n- 25 to 29.9: Overweight\n- 30 and above: Obesity\n\nBMI is useful because it is simple and fast, but it should be treated as a screening estimate rather than a complete measure of health.",
    example: {
      inputs: {
        unitSystem: "metric",
        heightCm: 178,
        weightKg: 78,
        heightFeet: 5,
        heightInches: 10,
        weightPounds: 172,
      },
      explanation:
        "Estimate BMI for someone who is 178 centimeters tall and weighs 78 kilograms. This example shows how BMI gives a quick weight-to-height screening estimate and then places the result into a broad adult category.",
      results: [
        { label: "BMI", value: "24.6" },
        { label: "Category", value: "Healthy weight" },
      ],
    },
  },
];

export function getToolDefinition(category: string, slug: string) {
  return toolDefinitions.find((tool) => tool.category === category && tool.slug === slug);
}
