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
    slug: "tip-calculator",
    title: "Tip Calculator",
    category: "finance",
    description: "Calculate how much to tip from a bill total and tip percentage.",
    intro: [
      "Use this tip calculator to quickly figure out how much gratuity to leave based on your bill total and preferred tip percentage. This is useful for restaurants, delivery orders, personal services, travel situations, and any everyday payment where you want a fast tip estimate without doing percentage math in your head.",
      "Enter the bill total and tip percentage, and the calculator will instantly show the tip amount you should leave.",
    ],
    keywords: ["tip calculator", "how much to tip", "gratuity calculator"],
    inputs: [
      {
        name: "billTotal",
        label: "Bill total",
        type: "number",
        placeholder: "85.50",
        helpText: "Enter the total bill amount before the tip is added.",
        required: true,
        min: 0,
        step: 0.01,
      },
      {
        name: "tipPercentage",
        label: "Tip percentage (%)",
        type: "number",
        placeholder: "18",
        helpText: "Use 15 for fifteen percent, 20 for twenty percent, and so on.",
        required: true,
        min: 0,
        step: 0.01,
      },
    ],
    outputs: [
      { key: "tipAmount", label: "Tip amount", format: "currency", description: "How much gratuity to leave based on the selected percentage." },
      { key: "tipLabel", label: "Tip summary", format: "text", description: "Readable summary of the tip percentage and bill total used." },
    ],
    faq: [
      {
        question: "What does this calculator show?",
        answer: "It shows how much to tip based on the bill total and tip percentage you enter.",
      },
      {
        question: "Can I use decimal bill totals and percentages?",
        answer: "Yes. The calculator supports decimal bill amounts and decimal tip percentages.",
      },
      {
        question: "When would I use a tip calculator?",
        answer: "A tip calculator is useful for restaurants, food delivery, taxis, salons, hospitality, and other service situations where gratuity is based on a percentage of the bill.",
      },
      {
        question: "How do I calculate a tip manually?",
        answer: "To calculate a tip manually, divide the tip percentage by 100 and multiply it by the bill total. For example, 20% of an $80 bill is 0.20 × 80 = $16.",
      },
      {
        question: "Can I use this for custom tip percentages?",
        answer: "Yes. You can enter any percentage you want, whether that is 10%, 18%, 22%, or a custom decimal value.",
      },
      {
        question: "Does this include splitting the bill?",
        answer: "No. This first version focuses only on the tip amount itself. Bill splitting can be added later if needed.",
      },
    ],
    relatedTools: ["percentage-calculator", "savings-goal-calculator", "compound-interest-calculator"],
    formulaSummary:
      "This tool calculates the tip amount by applying the selected tip percentage to the bill total.\n\nThe calculation works like this:\n\n- you enter the bill total\n- you enter the tip percentage\n- the calculator converts the percentage into a decimal\n- it multiplies that decimal by the bill total\n- it returns the tip amount\n\nFor example, an 18% tip on an $85.50 bill is $15.39.\n\nThis is helpful because percentage-based tip math is common but easy to miscalculate quickly when paying in person or on the go.",
    example: {
      inputs: { billTotal: 85.5, tipPercentage: 18 },
      explanation:
        "Calculate an 18% tip on a bill total of $85.50. This is a common real-world situation where you want to know the gratuity amount quickly without doing the percentage math yourself.",
      results: [
        { label: "Tip amount", value: "$15.39" },
      ],
    },
  },
  {
    slug: "savings-goal-calculator",
    title: "Savings Goal Calculator",
    category: "finance",
    description: "Estimate how long it will take to reach a savings goal using recurring contributions.",
    intro: [
      "Use this savings goal calculator to estimate how long it may take to reach a target savings amount based on a fixed recurring contribution. This is useful for planning vacations, emergency funds, larger purchases, short-term goals, and other savings targets where you want a simple timeline estimate without adding investment assumptions.",
      "Enter your savings goal, contribution amount, and contribution frequency, and the calculator will estimate how many contributions and how much time it may take to reach the goal.",
    ],
    keywords: ["savings goal calculator", "how long to save", "savings timeline calculator"],
    inputs: [
      {
        name: "goalAmount",
        label: "Savings goal",
        type: "number",
        placeholder: "5000",
        helpText: "Enter the total amount you want to save.",
        required: true,
        min: 0.01,
        step: 0.01,
      },
      {
        name: "contributionAmount",
        label: "Contribution amount",
        type: "number",
        placeholder: "200",
        helpText: "Enter the amount you plan to contribute each time.",
        required: true,
        min: 0.01,
        step: 0.01,
      },
      {
        name: "frequency",
        label: "Contribution frequency",
        type: "select",
        helpText: "Choose how often you will make the contribution.",
        required: true,
        options: [
          { label: "Weekly", value: "weekly" },
          { label: "Biweekly", value: "biweekly" },
          { label: "Monthly", value: "monthly" },
        ],
      },
    ],
    outputs: [
      { key: "contributionsNeeded", label: "Contributions needed", format: "number", description: "How many recurring contributions are needed to reach the goal." },
      { key: "estimatedTimeText", label: "Estimated time", format: "text", description: "Readable timeline estimate to reach the savings goal." },
      { key: "frequencyLabel", label: "Savings summary", format: "text", description: "Summary of the number of contributions and the goal amount." },
    ],
    faq: [
      {
        question: "Does this include interest or investment growth?",
        answer: "No. This first version is intentionally simple and estimates progress using recurring contributions only, without interest or returns.",
      },
      {
        question: "What frequencies are included?",
        answer: "This version supports weekly, biweekly, and monthly contribution schedules.",
      },
      {
        question: "When would I use a savings goal calculator?",
        answer: "A savings goal calculator is useful for planning vacations, emergency funds, larger purchases, seasonal expenses, and other goals where you want to estimate how long steady saving may take.",
      },
      {
        question: "How is the timeline calculated?",
        answer: "The calculator divides the savings goal by the recurring contribution amount to estimate how many contributions are needed, then translates that into an approximate timeline based on the selected contribution frequency.",
      },
      {
        question: "Why is the result approximate?",
        answer: "The result is approximate because weekly and biweekly contributions do not convert into whole months evenly. The tool gives a practical estimate rather than an exact calendar schedule.",
      },
      {
        question: "Can I use this for debt payoff?",
        answer: "This tool is designed for savings goals, but the same basic recurring-contribution logic can help estimate payoff timelines in simple cases without interest.",
      },
    ],
    relatedTools: ["tip-calculator", "compound-interest-calculator", "loan-payment-calculator"],
    formulaSummary:
      "This tool estimates how long it will take to reach a savings goal by dividing the goal amount by the recurring contribution amount and then translating the required number of contributions into time based on the selected frequency.\n\nThe process works like this:\n\n- you enter the total savings goal\n- you enter the amount you will contribute each time\n- you choose the contribution frequency\n- the calculator estimates how many contributions are required\n- it converts that into an approximate timeline\n\nFor example, saving $200 per month toward a $5,000 goal would require 25 monthly contributions, which is about 25 months.\n\nThis is helpful for practical goal planning because it gives you a simple no-interest timeline without turning the calculation into a full investment model.",
    example: {
      inputs: { goalAmount: 5000, contributionAmount: 200, frequency: "monthly" },
      explanation:
        "Estimate how long it takes to save $5,000 by contributing $200 every month. This is a common planning scenario for a vacation, emergency fund, or major purchase where you want a simple timeline estimate based on steady saving.",
      results: [
        { label: "Contributions needed", value: "25" },
        { label: "Estimated time", value: "25 months" },
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
    slug: "time-zone-calculator",
    title: "Time Zone Calculator",
    category: "time",
    description: "Compare the live current time in two time zones and see the hour difference instantly.",
    intro: [
      "Use this time zone calculator to compare the real current time in two selected time zones. This is useful for scheduling calls, planning meetings, coordinating remote work, checking travel timing, and avoiding confusion when people are in different parts of the world.",
      "By selecting a current time zone and a converted time zone, you can instantly see the live time in both places along with the current hour difference between them.",
    ],
    keywords: ["time zone calculator", "time difference between time zones", "world clock comparison"],
    inputs: [
      {
        name: "currentTimeZone",
        label: "Current time zone",
        type: "select",
        helpText: "Choose the time zone you want to compare from.",
        required: true,
        options: [
          { label: "Eastern Time (America/New_York)", value: "America/New_York" },
          { label: "Central Time (America/Chicago)", value: "America/Chicago" },
          { label: "Mountain Time (America/Denver)", value: "America/Denver" },
          { label: "Pacific Time (America/Los_Angeles)", value: "America/Los_Angeles" },
          { label: "UTC", value: "UTC" },
          { label: "London (Europe/London)", value: "Europe/London" },
          { label: "Paris (Europe/Paris)", value: "Europe/Paris" },
          { label: "Tokyo (Asia/Tokyo)", value: "Asia/Tokyo" },
          { label: "Sydney (Australia/Sydney)", value: "Australia/Sydney" },
          { label: "Regina (America/Regina)", value: "America/Regina" },
        ],
      },
      {
        name: "convertedTimeZone",
        label: "Converted time zone",
        type: "select",
        helpText: "Choose the time zone you want to compare against.",
        required: true,
        options: [
          { label: "Eastern Time (America/New_York)", value: "America/New_York" },
          { label: "Central Time (America/Chicago)", value: "America/Chicago" },
          { label: "Mountain Time (America/Denver)", value: "America/Denver" },
          { label: "Pacific Time (America/Los_Angeles)", value: "America/Los_Angeles" },
          { label: "UTC", value: "UTC" },
          { label: "London (Europe/London)", value: "Europe/London" },
          { label: "Paris (Europe/Paris)", value: "Europe/Paris" },
          { label: "Tokyo (Asia/Tokyo)", value: "Asia/Tokyo" },
          { label: "Sydney (Australia/Sydney)", value: "Australia/Sydney" },
          { label: "Regina (America/Regina)", value: "America/Regina" },
        ],
      },
    ],
    outputs: [
      { key: "currentTimeZoneTime", label: "Current time zone time", format: "text", description: "Live current time in the first selected time zone." },
      { key: "convertedTimeZoneTime", label: "Converted time zone time", format: "text", description: "Live current time in the second selected time zone." },
      { key: "hourDifference", label: "Hour difference", format: "number", description: "Current time offset difference between the two selected time zones.", suffix: " hours" },
      { key: "differenceLabel", label: "Time difference summary", format: "text", description: "Readable explanation of which time zone is ahead or behind." },
    ],
    faq: [
      {
        question: "Does this show the real current time?",
        answer: "Yes. This calculator is designed to show the live current time for each selected time zone when you run the calculation.",
      },
      {
        question: "Does it account for daylight saving time?",
        answer: "Yes, the current displayed time and offset difference reflect the selected zones as they are currently observed, including daylight saving time where applicable.",
      },
      {
        question: "When would I use a time zone calculator?",
        answer: "A time zone calculator is useful for scheduling meetings, remote work, customer support coverage, travel planning, and coordinating across regions without doing offset math manually.",
      },
      {
        question: "Why can time differences change during the year?",
        answer: "Some regions observe daylight saving time while others do not, so the offset between two places can change at different points in the year.",
      },
      {
        question: "Can two time zones have the same current hour difference?",
        answer: "Yes. Depending on the season and the places selected, two zones can temporarily line up with the same UTC offset even if they are normally different.",
      },
      {
        question: "Why does this tool use selected time zones instead of typed city names?",
        answer: "Using known time zone options helps keep the first version cleaner and more reliable without ambiguous location matching.",
      },
    ],
    relatedTools: ["timesheet-calculator", "time-duration-calculator", "date-difference-calculator"],
    formulaSummary:
      "This tool compares two selected time zones using their live current times and current UTC offsets.\n\nThe process is simple:\n\n- you choose a starting time zone\n- you choose a comparison time zone\n- the calculator checks the live current time in each place\n- it measures the current hour difference between them\n\nThis is useful because time zone math is easy to get wrong, especially when daylight saving time changes are involved. A live comparison makes it easier to schedule meetings and plan shared availability with confidence.",
    example: {
      inputs: { currentTimeZone: "America/Chicago", convertedTimeZone: "Asia/Tokyo" },
      explanation:
        "Compare the live current time in Central Time and Tokyo time. This type of example is useful when planning a meeting, checking overlap windows, or figuring out whether someone is likely working, sleeping, or starting their day.",
      results: [
        { label: "Live output", value: "Shows the current real time in both selected zones plus the current hour difference." },
      ],
    },
  },
  {
    slug: "timesheet-calculator",
    title: "Timesheet Calculator",
    category: "time",
    description: "Calculate total worked time from a start time, end time, and break duration.",
    intro: [
      "Use this timesheet calculator to estimate the amount of time worked during a shift after subtracting breaks. This is useful for payroll checks, daily work logs, personal time tracking, shift planning, and simple timesheet review before submitting hours.",
      "By entering the time you started working, the time you stopped, and the total break duration in minutes, you can quickly see your net worked time without calculating it by hand.",
    ],
    keywords: ["timesheet calculator", "hours worked calculator", "shift break calculator"],
    inputs: [
      {
        name: "startTime",
        label: "Start time",
        type: "time",
        helpText: "Enter when the shift started.",
        required: true,
      },
      {
        name: "endTime",
        label: "End time",
        type: "time",
        helpText: "If the end time is earlier, the calculator treats it as the next day.",
        required: true,
      },
      {
        name: "breakMinutes",
        label: "Total break duration (minutes)",
        type: "number",
        placeholder: "30",
        helpText: "Enter the full break time to subtract from the shift length.",
        required: true,
        min: 0,
        step: 1,
      },
    ],
    outputs: [
      { key: "totalHours", label: "Worked hours", format: "number", description: "Full worked hours after breaks are removed." },
      { key: "totalMinutes", label: "Remaining worked minutes", format: "number", description: "Minutes left after full worked hours are counted." },
      { key: "totalWorkedMinutes", label: "Total worked minutes", format: "number", description: "Net worked time converted fully into minutes." },
      { key: "workedTimeText", label: "Worked time summary", format: "text", description: "Readable net worked time after subtracting breaks." },
      { key: "shiftLabel", label: "Shift note", format: "text", description: "Summary of whether the shift stayed in one day or crossed midnight." },
    ],
    faq: [
      {
        question: "Does this subtract break time?",
        answer: "Yes. The break duration you enter is subtracted from the total shift length to show net worked time.",
      },
      {
        question: "Can it handle overnight shifts?",
        answer: "Yes. If the end time is earlier than the start time, the calculator treats the shift as crossing midnight into the next day.",
      },
      {
        question: "When would I use a timesheet calculator?",
        answer: "A timesheet calculator is useful for checking payroll hours, reviewing time cards, logging work sessions, planning staffing, and estimating net work time after breaks.",
      },
      {
        question: "What should I enter for break duration?",
        answer: "Enter the total unpaid or deducted break time in minutes for the full shift. For example, a 30-minute lunch break should be entered as 30.",
      },
      {
        question: "Can break time be longer than the shift?",
        answer: "No. If break time is longer than the total shift length, the input should be corrected because net worked time cannot be negative.",
      },
      {
        question: "Why show both hours and total minutes?",
        answer: "Some timesheets and payroll systems use hours and minutes, while others rely on total minutes for easier conversion and reporting.",
      },
    ],
    relatedTools: ["time-duration-calculator", "time-zone-calculator", "date-difference-calculator"],
    formulaSummary:
      "This tool calculates shift length from a start time and end time, then subtracts the break duration to return the net worked time.\n\nThe process works like this:\n\n- you enter the shift start time\n- you enter the shift end time\n- the calculator determines the full shift duration\n- if the shift crosses midnight, it accounts for that automatically\n- it subtracts the total entered break time\n- it returns the net time worked\n\nThis helps because work shifts are easy to miscalculate by hand, especially when overnight hours or deducted breaks are involved.",
    example: {
      inputs: { startTime: "08:00", endTime: "17:00", breakMinutes: 30 },
      explanation:
        "Calculate net worked time for a shift that starts at 8:00 AM, ends at 5:00 PM, and includes a 30-minute break. This is a common timesheet use case where the gross shift length needs to be reduced by the break before hours are reported.",
      results: [
        { label: "Worked time", value: "8 hours 30 minutes" },
        { label: "Total worked minutes", value: "510" },
      ],
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
    relatedTools: ["temperature-converter", "weight-converter", "volume-converter"],
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
    slug: "weight-converter",
    title: "Weight Converter",
    category: "conversions",
    description: "Convert common weight and mass units for cooking, shipping, fitness, and everyday use.",
    intro: [
      "Use this weight converter to quickly convert between common metric and imperial weight units such as grams, kilograms, ounces, and pounds. This is useful for recipes, shipping estimates, gym tracking, travel, and product measurements that appear in a different unit system than the one you normally use.",
      "By entering a value and choosing the from and to units, you can instantly convert weights without doing the math by hand or searching for conversion charts.",
    ],
    keywords: ["weight converter", "pounds to kilograms", "kg to lbs"],
    inputs: [
      {
        name: "value",
        label: "Weight value",
        type: "number",
        placeholder: "150",
        helpText: "Enter the weight or mass you want to convert.",
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
          { label: "Milligrams", value: "milligrams" },
          { label: "Grams", value: "grams" },
          { label: "Kilograms", value: "kilograms" },
          { label: "Ounces", value: "ounces" },
          { label: "Pounds", value: "pounds" },
          { label: "Tons", value: "tons" },
        ],
      },
      {
        name: "toUnit",
        label: "Convert to",
        type: "select",
        required: true,
        options: [
          { label: "Milligrams", value: "milligrams" },
          { label: "Grams", value: "grams" },
          { label: "Kilograms", value: "kilograms" },
          { label: "Ounces", value: "ounces" },
          { label: "Pounds", value: "pounds" },
          { label: "Tons", value: "tons" },
        ],
      },
    ],
    outputs: [
      { key: "convertedValue", label: "Converted weight", format: "number", description: "Converted result in the selected destination unit.", suffix: " {dynamic-unit}" },
    ],
    faq: [
      {
        question: "What weight units are included?",
        answer: "This version supports common metric and imperial units including milligrams, grams, kilograms, ounces, pounds, and tons.",
      },
      {
        question: "Can I convert decimal values?",
        answer: "Yes. Decimal values are useful for food measurements, shipping weights, and product specifications.",
      },
      {
        question: "When would I use a weight converter?",
        answer: "A weight converter is useful for cooking, shipping, gym and fitness tracking, travel luggage limits, and product measurements from international stores or instructions.",
      },
      {
        question: "How do pounds and kilograms compare?",
        answer: "One kilogram is equal to about 2.20462 pounds. That is why weights in kilograms usually look smaller than the same weight expressed in pounds.",
      },
      {
        question: "Why do some tools say weight and others say mass?",
        answer: "In everyday use, people often say weight even when they mean mass. For general conversion tools like this one, the practical unit conversion is what matters most.",
      },
      {
        question: "Does this tool round the result?",
        answer: "Yes. The displayed value may be rounded to a practical number of decimal places so it is easier to read while still staying accurate for everyday use.",
      },
      {
        question: "Is this accurate enough for everyday decisions?",
        answer: "Yes. For household, shopping, cooking, shipping, and general planning use cases, the conversion precision provided here is more than sufficient.",
      },
    ],
    relatedTools: ["volume-converter", "length-converter", "temperature-converter"],
    formulaSummary:
      "This weight converter uses standard conversion factors to translate a value from one unit into another.\n\nFor example:\n\n- Kilograms to pounds: pounds = kilograms × 2.20462\n- Pounds to kilograms: kilograms = pounds ÷ 2.20462\n\nThe calculator works by:\n\n- taking your input value\n- converting it into a base unit behind the scenes\n- applying the correct factor for the destination unit\n- returning the converted result\n\nThis approach keeps the conversion consistent and makes it easy to compare weights across metric and imperial systems without doing manual calculations.",
    example: {
      inputs: { value: 150, fromUnit: "pounds", toUnit: "kilograms" },
      explanation:
        "Convert a body weight or package weight from pounds to kilograms. This example is useful because people often see weights expressed in pounds in one country and kilograms in another. Knowing that 150 pounds is about 68 kilograms makes international comparisons much easier.",
      results: [{ label: "Converted weight", value: "150 pounds converts to approximately 68.0389 kilograms." }],
    },
  },
  {
    slug: "volume-converter",
    title: "Volume Converter",
    category: "conversions",
    description: "Convert common kitchen and household volume units quickly and clearly.",
    intro: [
      "Use this volume converter to quickly convert between common liquid and kitchen volume units such as milliliters, liters, cups, tablespoons, and gallons. This is useful for cooking, baking, meal prep, product comparisons, and everyday household measurements that use different unit systems.",
      "By entering a value and choosing the from and to units, you can instantly convert volume measurements without relying on memory or manual conversion charts.",
    ],
    keywords: ["volume converter", "cups to ml", "liters to gallons"],
    inputs: [
      {
        name: "value",
        label: "Volume value",
        type: "number",
        placeholder: "2",
        helpText: "Enter the volume you want to convert.",
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
          { label: "Milliliters", value: "milliliters" },
          { label: "Liters", value: "liters" },
          { label: "Teaspoons", value: "teaspoons" },
          { label: "Tablespoons", value: "tablespoons" },
          { label: "Cups", value: "cups" },
          { label: "Fluid Ounces", value: "fluidOunces" },
          { label: "Pints", value: "pints" },
          { label: "Quarts", value: "quarts" },
          { label: "Gallons", value: "gallons" },
        ],
      },
      {
        name: "toUnit",
        label: "Convert to",
        type: "select",
        required: true,
        options: [
          { label: "Milliliters", value: "milliliters" },
          { label: "Liters", value: "liters" },
          { label: "Teaspoons", value: "teaspoons" },
          { label: "Tablespoons", value: "tablespoons" },
          { label: "Cups", value: "cups" },
          { label: "Fluid Ounces", value: "fluidOunces" },
          { label: "Pints", value: "pints" },
          { label: "Quarts", value: "quarts" },
          { label: "Gallons", value: "gallons" },
        ],
      },
    ],
    outputs: [
      { key: "convertedValue", label: "Converted volume", format: "number", description: "Converted result in the selected destination unit.", suffix: " {dynamic-unit}" },
    ],
    faq: [
      {
        question: "What volume units are included?",
        answer: "This version supports common kitchen and household units including milliliters, liters, teaspoons, tablespoons, cups, fluid ounces, pints, quarts, and gallons.",
      },
      {
        question: "Can I use this for recipes?",
        answer: "Yes. This tool is especially useful for cooking and baking when a recipe uses a different measurement system than the one you normally use.",
      },
      {
        question: "Why are cups and fluid ounces useful to convert?",
        answer: "Many recipes, packaging labels, and kitchen tools use cups or fluid ounces, while others use metric units such as milliliters or liters. A converter helps bridge that gap quickly.",
      },
      {
        question: "Can I convert decimal values?",
        answer: "Yes. Decimal values are common in recipes, liquids, supplements, and product measurement labels.",
      },
      {
        question: "Does this handle kitchen and household use well?",
        answer: "Yes. The first version is designed to focus on practical day-to-day volume units rather than trying to include every specialized industrial or scientific unit.",
      },
      {
        question: "Does this tool round the result?",
        answer: "Yes. The displayed result may be rounded to a practical number of decimal places so it stays readable while remaining accurate for normal use.",
      },
      {
        question: "Is this enough precision for everyday conversion?",
        answer: "Yes. For recipes, drinks, household liquids, and product measurement comparisons, the precision here is more than sufficient.",
      },
    ],
    relatedTools: ["weight-converter", "temperature-converter", "length-converter"],
    formulaSummary:
      "This volume converter uses standard unit factors to translate one liquid or kitchen measurement into another.\n\nFor example:\n\n- Cups to milliliters: milliliters = cups × 236.5882365\n- Liters to gallons: gallons = liters ÷ 3.78541\n\nThe tool works by:\n\n- taking your input value\n- converting it into a base unit behind the scenes\n- applying the correct factor for the target unit\n- returning the converted volume\n\nThis makes it easier to work across metric and imperial recipe measurements, packaging labels, and everyday household conversions without doing the math manually.",
    example: {
      inputs: { value: 2, fromUnit: "cups", toUnit: "milliliters" },
      explanation:
        "Convert a kitchen measurement from cups to milliliters. This is a common real-world conversion when following recipes from different countries. Knowing that 2 cups is about 473.1765 milliliters helps when your measuring tools use metric markings.",
      results: [{ label: "Converted volume", value: "2 cups converts to approximately 473.1765 milliliters." }],
    },
  },
  {
    slug: "random-number-generator",
    title: "Random Number Generator",
    category: "utility",
    description: "Generate a random whole number between a user-defined lower and upper range.",
    intro: [
      "Use this random number generator to quickly generate a random whole number between a minimum and maximum value that you choose. This is useful for simple games, giveaways, classroom activities, number picking, testing, and quick decision-making.",
      "By entering a lower and upper bound, you can instantly generate a random result without relying on manual picks or outside tools.",
    ],
    keywords: ["random number generator", "number picker", "random number between two numbers"],
    inputs: [
      {
        name: "min",
        label: "Lower range",
        type: "number",
        placeholder: "1",
        helpText: "Enter the smallest whole number allowed in the result.",
        required: true,
        step: 1,
      },
      {
        name: "max",
        label: "Upper range",
        type: "number",
        placeholder: "100",
        helpText: "Enter the largest whole number allowed in the result.",
        required: true,
        step: 1,
      },
    ],
    outputs: [
      { key: "randomNumber", label: "Random number", format: "number", description: "One randomly generated whole number within the selected range." },
      { key: "rangeLabel", label: "Range note", format: "text", description: "Quick confirmation of the range used for the generated result." },
    ],
    faq: [
      {
        question: "Can I choose my own range?",
        answer: "Yes. You can enter your own lower and upper whole-number values and generate a result inside that range.",
      },
      {
        question: "Does this include both the minimum and maximum values?",
        answer: "Yes. The generated result can be equal to either the lower or upper value if those numbers fall inside the selected range.",
      },
      {
        question: "Can I use decimal values?",
        answer: "No. This first version is intended for whole-number generation only so the output stays simple and predictable.",
      },
      {
        question: "When would I use a random number generator?",
        answer: "A random number generator is useful for classroom picks, giveaways, simple games, practice drills, test data, and any situation where you want a quick unbiased number choice.",
      },
      {
        question: "Will the same number appear more than once if I try again?",
        answer: "Yes. Each click generates a fresh random result, so repeated numbers can happen naturally.",
      },
      {
        question: "Can I use this for contests or small picks?",
        answer: "Yes, for informal use. It is useful for quick random selection, but formal or regulated use cases may require more specific tooling or auditing rules.",
      },
    ],
    relatedTools: ["dice-roller", "coin-flipper"],
    formulaSummary:
      "This tool generates one random whole number inside the range you provide.\n\nThe process is simple:\n\n- you enter a minimum value\n- you enter a maximum value\n- the generator picks one whole number within that range\n\nThe result can match either endpoint if the lower and upper values are valid.\n\nThis kind of tool is useful because it gives you a quick random pick without needing to write numbers down, shuffle slips of paper, or do the selection manually.",
    example: {
      inputs: { min: 1, max: 50 },
      explanation:
        "Generate a random whole number between 1 and 50. This kind of setup is common for small classroom activities, simple raffles, practice drills, or quick number picks where every whole number in the range is allowed.",
      results: [
        { label: "Possible result", value: "Any whole number from 1 to 50" },
      ],
    },
  },
  {
    slug: "dice-roller",
    title: "Dice Roller",
    category: "utility",
    description: "Roll a virtual die using a standard dice side count such as d6, d20, or d100.",
    intro: [
      "Use this dice roller to generate a random result based on a standard die size. This is useful for tabletop games, classroom activities, probability demos, quick choices, and any situation where you need a simple die roll without physical dice nearby.",
      "Choose a standard dice side count and the tool will generate one random roll result from 1 up to the number of sides selected.",
    ],
    keywords: ["dice roller", "virtual dice", "d20 roller"],
    inputs: [
      {
        name: "sides",
        label: "Dice sides",
        type: "select",
        helpText: "Choose a standard die size for the roll.",
        required: true,
        options: [
          { label: "4-sided die (d4)", value: "4" },
          { label: "6-sided die (d6)", value: "6" },
          { label: "8-sided die (d8)", value: "8" },
          { label: "10-sided die (d10)", value: "10" },
          { label: "12-sided die (d12)", value: "12" },
          { label: "20-sided die (d20)", value: "20" },
          { label: "100-sided die (d100)", value: "100" },
        ],
      },
    ],
    outputs: [
      { key: "rollResult", label: "Roll result", format: "number", description: "Random result from 1 up to the number of sides selected." },
      { key: "diceLabel", label: "Roll note", format: "text", description: "Quick confirmation of which die was rolled." },
    ],
    faq: [
      {
        question: "What dice types are included?",
        answer: "This first version supports standard dice sizes: d4, d6, d8, d10, d12, d20, and d100.",
      },
      {
        question: "Can I roll any custom number of sides?",
        answer: "No. This first version intentionally stays limited to standard dice side counts so the tool remains simple and predictable.",
      },
      {
        question: "When would I use a dice roller?",
        answer: "A dice roller is useful for tabletop games, classroom activities, practice drills, random choices, and probability demonstrations.",
      },
      {
        question: "Does the roll include every number on the die?",
        answer: "Yes. The result can be any whole number from 1 up to the number of sides on the selected die.",
      },
      {
        question: "Can I roll more than one die at once?",
        answer: "Not in this first version. The initial release is focused on one clean single-die roll at a time.",
      },
      {
        question: "Why use a virtual die instead of a physical one?",
        answer: "A virtual die is convenient when you do not have physical dice nearby or when you want a quick result on a phone or computer.",
      },
    ],
    relatedTools: ["random-number-generator", "coin-flipper"],
    formulaSummary:
      "This tool simulates a standard die roll by generating one random whole number from 1 up to the selected number of sides.\n\nFor example:\n\n- a d6 can return any whole number from 1 to 6\n- a d20 can return any whole number from 1 to 20\n\nThe tool keeps the first version simple by supporting only standard dice sizes. That makes it useful for common gaming and classroom scenarios without adding extra setup complexity.",
    example: {
      inputs: { sides: 20 },
      explanation:
        "Roll a standard 20-sided die. This example reflects one of the most common virtual dice use cases for tabletop gaming and simple random event checks.",
      results: [
        { label: "Possible result", value: "Any whole number from 1 to 20" },
      ],
    },
  },
  {
    slug: "coin-flipper",
    title: "Coin Flipper",
    category: "utility",
    description: "Flip a virtual coin and get a simple Heads or Tails result instantly.",
    intro: [
      "Use this coin flipper to get a quick random Heads or Tails result with a single click. This is useful for simple decisions, games, classroom activities, tie-breakers, and any moment where you want a fast fair-feeling two-option choice.",
      "The first version keeps things intentionally simple. There are no extra settings, just one click and one result.",
    ],
    keywords: ["coin flipper", "flip a coin", "heads or tails"],
    inputs: [],
    outputs: [
      { key: "coinResult", label: "Coin result", format: "text", description: "Random result showing either Heads or Tails." },
      { key: "flipLabel", label: "Flip note", format: "text", description: "Simple confirmation of what the tool just did." },
    ],
    faq: [
      {
        question: "Do I need to enter anything before flipping?",
        answer: "No. This tool is intentionally simple, so you can click and get a result immediately.",
      },
      {
        question: "What results can it return?",
        answer: "The result is either Heads or Tails.",
      },
      {
        question: "When would I use a coin flipper?",
        answer: "A coin flipper is useful for simple decisions, tie-breakers, quick games, classroom choices, and any small two-option random pick.",
      },
      {
        question: "Can I flip more than one coin at a time?",
        answer: "Not in this first version. The initial release is focused on one clean one-click coin flip.",
      },
      {
        question: "Can I get the same result repeatedly?",
        answer: "Yes. Each flip is independent, so repeated Heads or repeated Tails can happen naturally.",
      },
      {
        question: "Why use this instead of a real coin?",
        answer: "A virtual coin flipper is convenient when you do not have a real coin nearby or just want a fast result on your device.",
      },
    ],
    relatedTools: ["random-number-generator", "dice-roller"],
    formulaSummary:
      "This tool simulates a simple coin flip by randomly returning one of two outcomes: Heads or Tails.\n\nBecause there are only two possible results, the tool is useful for quick decisions, tie-breakers, and simple games where you want a fast binary choice without extra setup.",
    example: {
      inputs: {},
      explanation:
        "Flip a coin to make a quick two-option decision. This is one of the simplest randomization use cases and works well for tie-breakers, informal picks, and small games.",
      results: [
        { label: "Possible results", value: "Heads or Tails" },
      ],
    },
  },
  {
    slug: "reading-time-calculator",
    title: "Reading Time Calculator",
    category: "text",
    description: "Estimate how long a piece of text will take to read using speed-based reading presets.",
    intro: [
      "Use this reading time calculator to estimate how long it may take to read a block of text based on its word count and a selected reading speed. This is useful for blog drafts, newsletters, scripts, reports, study material, and any content where quick time expectations help with planning.",
      "Paste your text, choose a reading-speed preset, and the tool will estimate the reading time without forcing you to count words or guess manually.",
    ],
    keywords: ["reading time calculator", "estimated reading time", "how long to read text"],
    inputs: [
      {
        name: "text",
        label: "Text to analyze",
        type: "textarea",
        placeholder: "Paste or type text here",
        helpText: "Paste the full text you want to estimate reading time for.",
        required: true,
      },
      {
        name: "readingSpeed",
        label: "Reading speed",
        type: "select",
        helpText: "Choose the reading pace that best fits the audience or situation.",
        required: true,
        options: [
          { label: "Early reader (75 wpm)", value: "75" },
          { label: "Developing reader (125 wpm)", value: "125" },
          { label: "Careful reader (150 wpm)", value: "150" },
          { label: "Average reader (200 wpm)", value: "200" },
          { label: "Fast reader (300 wpm)", value: "300" },
          { label: "Skimming (400 wpm)", value: "400" },
        ],
      },
    ],
    outputs: [
      { key: "wordCount", label: "Word count", format: "number", description: "Total words detected in the provided text." },
      { key: "readingTimeMinutes", label: "Estimated reading time (minutes)", format: "number", description: "Estimated reading time shown as decimal minutes." },
      { key: "readingTimeText", label: "Estimated reading time", format: "text", description: "Readable time estimate based on the selected reading speed." },
      { key: "speedLabel", label: "Reading speed used", format: "text", description: "The speed preset used to estimate the reading time." },
    ],
    faq: [
      {
        question: "What does this calculator measure?",
        answer: "This calculator estimates reading time by counting the words in your text and applying the selected reading-speed preset in words per minute.",
      },
      {
        question: "Why use speed presets instead of reading levels like grade or education labels?",
        answer: "Speed presets make the estimate clearer and more honest because the tool is estimating pace, not reading ability or comprehension level. They also make it easier to choose slower or faster reading scenarios for planning.",
      },
      {
        question: "When would I use a reading time calculator?",
        answer: "A reading time calculator is useful for blog writing, email planning, training material, scripts, study prep, presentations, and any content where you want to estimate audience time commitment.",
      },
      {
        question: "Does this include comprehension time?",
        answer: "No. This is a reading-speed estimate based on word count only. Dense material, technical content, and rereading may take longer.",
      },
      {
        question: "Why might the real reading time be different?",
        answer: "Actual reading time can vary based on text difficulty, reader familiarity, distractions, formatting, and whether the person is reading carefully or skimming.",
      },
      {
        question: "Can teachers use this for different classroom reading levels?",
        answer: "Yes. The slower reading-speed presets are useful for estimating how long a passage may take for early or developing readers, while faster presets can help with older or more confident readers.",
      },
      {
        question: "Can I use this for short text too?",
        answer: "Yes. Very short text may produce a result in seconds instead of full minutes, which is often more helpful for quick copy or UI text.",
      },
      {
        question: "Does the tool also show word count?",
        answer: "Yes. The first version includes both word count and estimated reading time so the result is more useful for writing and planning.",
      },
    ],
    relatedTools: ["word-counter", "case-converter"],
    formulaSummary:
      "This tool estimates reading time by counting the words in your text and dividing that count by the selected reading speed in words per minute.\n\nThe process works like this:\n\n- you paste or type the text\n- the calculator counts the words\n- it applies the selected reading-speed preset\n- it returns the estimated reading time in a readable format\n\nFor example, a 400-word article at 200 words per minute would take about 2 minutes to read.\n\nThis is useful for planning content length, audience expectations, speaking prep, and general writing workflow decisions.",
    example: {
      inputs: { text: "SolvrTools helps people solve practical problems with quick online tools.", readingSpeed: 200 },
      explanation:
        "Estimate the reading time for a short piece of text using an average reading pace of 200 words per minute. This shows how the calculator combines word count and selected pace to produce a quick planning estimate.",
      results: [
        { label: "Word count", value: "10" },
        { label: "Estimated reading time", value: "about 3 seconds" },
      ],
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
    slug: "tile-calculator",
    title: "Tile Calculator",
    category: "home",
    description: "Estimate how many tiles and tile packs are needed for a floor or wall area.",
    intro: [
      "Use this tile calculator to estimate the number of tiles and tile packs needed for a project area. This is useful for flooring, backsplashes, bathrooms, kitchens, and other home projects where you want a quick planning estimate before buying materials.",
      "You can enter the area dimensions directly or use a total square footage value, then add the size of one tile and the number of tiles in a pack to estimate how much material to buy.",
    ],
    keywords: ["tile calculator", "how many tiles do I need", "tile pack calculator"],
    inputs: [
      {
        name: "areaInputMode",
        label: "Area input method",
        type: "select",
        helpText: "Choose whether to enter dimensions or total square footage.",
        required: true,
        options: [
          { label: "Length and width", value: "dimensions" },
          { label: "Total square footage", value: "squareFeet" },
        ],
      },
      {
        name: "length",
        label: "Area length (feet)",
        type: "number",
        placeholder: "12",
        helpText: "Measure the length of the area to be tiled in feet.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "width",
        label: "Area width (feet)",
        type: "number",
        placeholder: "10",
        helpText: "Measure the width of the area to be tiled in feet.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "area",
        label: "Total square footage",
        type: "number",
        placeholder: "120",
        helpText: "Enter the total area directly if you already know it in square feet.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "tileLength",
        label: "Tile length (inches)",
        type: "number",
        placeholder: "12",
        helpText: "Enter the length of a single tile in inches.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "tileWidth",
        label: "Tile width (inches)",
        type: "number",
        placeholder: "12",
        helpText: "Enter the width of a single tile in inches.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "tilesPerPack",
        label: "Tiles per pack",
        type: "number",
        placeholder: "10",
        helpText: "Enter how many tiles come in one pack or box.",
        required: true,
        min: 1,
        step: 1,
      },
    ],
    outputs: [
      { key: "totalArea", label: "Area to tile", format: "number", description: "Total square footage used for the tile estimate.", suffix: " sq ft" },
      { key: "tilesRequired", label: "Tiles required", format: "number", description: "Estimated number of tiles needed to cover the area." },
      { key: "packsRequired", label: "Tile packs required", format: "number", description: "Number of packs needed, rounded up to a full pack." },
      { key: "tileAreaLabel", label: "Tile coverage note", format: "text", description: "Shows how much area one tile covers." },
    ],
    faq: [
      {
        question: "Can I enter dimensions instead of square footage?",
        answer: "Yes. This version lets you either enter length and width or provide the total square footage directly.",
      },
      {
        question: "Why do tile dimensions use inches while area uses feet?",
        answer: "That reflects common real-world shopping and measuring patterns in home projects. Area is often measured in square feet, while tile size is often listed in inches.",
      },
      {
        question: "When would I use a tile calculator?",
        answer: "A tile calculator is useful for flooring, showers, backsplashes, kitchens, bathrooms, and other tile projects where you want to estimate materials before buying.",
      },
      {
        question: "Why does the pack count round up?",
        answer: "Tile is usually sold by the box or pack, so if you need part of a pack, you still need to buy the next full pack.",
      },
      {
        question: "Does this include extra tile for cuts or waste?",
        answer: "No. This first version focuses on base coverage only. If you want extra for cuts, damage, or future repairs, you should plan to buy additional material.",
      },
      {
        question: "Can I use this for wall tile too?",
        answer: "Yes. The same area-based logic works for both floor and wall tile planning as long as your measurements are correct.",
      },
    ],
    relatedTools: ["square-footage-calculator", "concrete-calculator", "paint-calculator"],
    formulaSummary:
      "This tool estimates the number of tiles needed by dividing the total area to be covered by the area of a single tile. It then divides the tile count by the number of tiles per pack and rounds up to the next full pack.\n\nThe process works like this:\n\n- you enter the total area, either by dimensions or total square footage\n- you enter the size of one tile\n- the calculator converts the tile dimensions into square feet\n- it estimates how many tiles are needed to cover the area\n- it estimates how many full packs are needed\n\nThis helps with practical buying decisions because tile is sold individually in theory but often purchased by the pack or box in real projects.",
    example: {
      inputs: { areaInputMode: "dimensions", length: 12, width: 10, tileLength: 12, tileWidth: 12, tilesPerPack: 10 },
      explanation:
        "Estimate tile needs for a 12 foot by 10 foot area using 12 inch by 12 inch tiles sold in packs of 10. This is a simple real-world planning case where you want both the tile count and the number of boxes to buy.",
      results: [
        { label: "Tiles required", value: "120" },
        { label: "Tile packs required", value: "12" },
      ],
    },
  },
  {
    slug: "concrete-calculator",
    title: "Concrete Calculator",
    category: "home",
    description: "Estimate how much concrete is needed for a rectangular slab or filled volume.",
    intro: [
      "Use this concrete calculator to estimate the amount of concrete needed for a rectangular slab, pad, or filled volume. This is useful for patios, walkways, shed pads, small foundations, posts, and other projects where you need a quick material estimate before ordering or mixing concrete.",
      "Enter the length, width, and height of the space to be filled, and the calculator will estimate the required volume in common concrete ordering units.",
    ],
    keywords: ["concrete calculator", "how much concrete do I need", "cubic yard concrete calculator"],
    inputs: [
      {
        name: "length",
        label: "Length (feet)",
        type: "number",
        placeholder: "10",
        helpText: "Enter the length of the slab or filled area in feet.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "width",
        label: "Width (feet)",
        type: "number",
        placeholder: "10",
        helpText: "Enter the width of the slab or filled area in feet.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "height",
        label: "Height or depth (feet)",
        type: "number",
        placeholder: "0.5",
        helpText: "Enter the thickness or depth of the concrete pour in feet.",
        required: true,
        min: 0.1,
        step: 0.01,
      },
    ],
    outputs: [
      { key: "cubicFeet", label: "Concrete needed (cubic feet)", format: "number", description: "Total volume in cubic feet." },
      { key: "cubicYards", label: "Concrete needed (cubic yards)", format: "number", description: "Common concrete ordering unit in the United States." },
      { key: "cubicMeters", label: "Concrete needed (cubic meters)", format: "number", description: "Common concrete ordering unit in many metric regions." },
      { key: "concreteLabel", label: "Concrete ordering note", format: "text", description: "Quick note about the most practical concrete units." },
    ],
    faq: [
      {
        question: "What units should I use when ordering concrete?",
        answer: "In many US home projects, concrete is commonly ordered in cubic yards. In many metric regions, cubic meters are more common. This tool shows both for convenience.",
      },
      {
        question: "When would I use a concrete calculator?",
        answer: "A concrete calculator is useful for patios, pads, walkways, slabs, footings, and other projects where you need to estimate pour volume before ordering material.",
      },
      {
        question: "Why show cubic feet too?",
        answer: "Cubic feet can help with smaller projects, quick volume checks, or situations where you are comparing bagged concrete amounts or rough dimensional calculations.",
      },
      {
        question: "Does this tool handle shapes other than a rectangle?",
        answer: "No. This first version is intentionally limited to a simple rectangular slab or filled volume so the estimate stays clear and reliable.",
      },
      {
        question: "Should I order exactly the calculated amount?",
        answer: "Many real projects benefit from ordering a little extra to account for uneven ground, spillage, or small planning differences. This first version gives the base volume estimate only.",
      },
      {
        question: "Can I use this for depth in inches?",
        answer: "You should convert inches into feet before entering the depth. For example, 6 inches is 0.5 feet.",
      },
    ],
    relatedTools: ["tile-calculator", "square-footage-calculator", "paint-calculator"],
    formulaSummary:
      "This tool estimates concrete volume by multiplying the length, width, and height of a rectangular space to get the total filled volume.\n\nThe process works like this:\n\n- you enter the length\n- you enter the width\n- you enter the depth or height\n- the calculator multiplies those values to get cubic feet\n- it converts that volume into cubic yards and cubic meters\n\nThis is helpful because concrete is often planned dimensionally but ordered volumetrically, and the ordering unit can vary by region or supplier.",
    example: {
      inputs: { length: 10, width: 10, height: 0.5 },
      explanation:
        "Estimate concrete for a 10 foot by 10 foot slab poured 6 inches deep. This is a common patio or pad planning case where you want a quick base volume estimate before contacting a supplier or buying bagged material.",
      results: [
        { label: "Concrete needed", value: "50 cubic feet, about 1.85 cubic yards, or about 1.42 cubic meters" },
      ],
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
      { key: "areaLabel", label: "Area summary", format: "text", description: "Readable square footage summary for the entered dimensions." },
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
    relatedTools: ["tile-calculator", "concrete-calculator", "paint-calculator"],
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
    description: "Calculate body mass index using metric or imperial height and weight measurements.",
    intro: [
      "Use this BMI calculator to estimate your body mass index from height and weight. BMI, short for body mass index, is a common screening tool used to place adult body size into broad ranges such as underweight, healthy weight, overweight, and obesity.",
      "This calculator supports both metric and imperial units, so you can enter centimeters and kilograms or feet, inches, and pounds. It is useful for getting a quick estimate, comparing changes over time, or understanding where a result falls within standard adult BMI ranges.",
      "BMI is best treated as a starting point rather than a full health assessment. It can be helpful for general screening, but it does not directly measure body fat, muscle mass, or overall health status.",
    ],
    keywords: ["bmi calculator", "body mass index calculator", "calculate bmi", "healthy bmi range"],
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
        helpText: "Enter your height in centimeters when using metric units.",
        required: true,
        min: 1,
        step: 0.1,
      },
      {
        name: "weightKg",
        label: "Weight (kg)",
        type: "number",
        placeholder: "78",
        helpText: "Enter your body weight in kilograms when using metric units.",
        required: true,
        min: 0.1,
        step: 0.1,
      },
      {
        name: "heightFeet",
        label: "Height (feet)",
        type: "number",
        placeholder: "5",
        helpText: "Enter the feet portion of your height when using imperial units.",
        required: true,
        min: 0,
        step: 1,
      },
      {
        name: "heightInches",
        label: "Additional height (inches)",
        type: "number",
        placeholder: "10",
        helpText: "Enter the remaining inches beyond full feet for imperial height.",
        required: true,
        min: 0,
        step: 0.1,
      },
      {
        name: "weightPounds",
        label: "Weight (lb)",
        type: "number",
        placeholder: "172",
        helpText: "Enter your body weight in pounds when using imperial units.",
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
        description: "Estimated body mass index based on the selected height and weight inputs.",
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
        description: "General adult BMI guidance commonly used for quick interpretation.",
      },
    ],
    faq: [
      {
        question: "What is BMI?",
        answer: "BMI stands for body mass index. It is a simple screening measurement that compares weight to height to estimate whether body size falls into a common adult reference range.",
      },
      {
        question: "How do I calculate BMI?",
        answer: "BMI is calculated by dividing body weight by height squared. In metric form, that means kilograms divided by meters squared. If you use imperial inputs, the calculator converts them first and then performs the same calculation behind the scenes.",
      },
      {
        question: "Can I use metric or imperial units?",
        answer: "Yes. This calculator supports both centimeters and kilograms as well as feet, inches, and pounds.",
      },
      {
        question: "What BMI range is usually considered healthy?",
        answer: "For most adults, a BMI from 18.5 to 24.9 is commonly considered a healthy range. Under 18.5 is often classified as underweight, 25 to 29.9 as overweight, and 30 or higher as obesity.",
      },
      {
        question: "Is BMI accurate for everyone?",
        answer: "Not always. BMI is a broad screening tool and does not directly measure body fat, muscle mass, bone density, or health conditions. People with more muscle or other body composition differences may find BMI less representative.",
      },
      {
        question: "Should BMI be used as a medical diagnosis?",
        answer: "No. BMI is useful as a quick screening estimate, but it should not replace professional medical advice or a more complete health evaluation.",
      },
      {
        question: "Why might someone check BMI over time?",
        answer: "BMI can be useful for tracking broad trends over time, especially when weight or lifestyle changes are happening. It is often more useful for comparison and screening than as a one-time verdict.",
      },
    ],
    relatedTools: [],
    formulaSummary:
      "BMI is calculated by dividing body weight by height squared. This creates a simple ratio that helps estimate whether weight is broadly low, typical, high, or very high relative to height.\n\nMetric formula:\nBMI = weight in kilograms ÷ (height in meters × height in meters)\n\nIf you use imperial measurements, the calculator first converts feet, inches, and pounds into metric values and then applies the same formula.\n\nGeneral adult BMI categories are commonly interpreted as:\n\n- Under 18.5: Underweight\n- 18.5 to 24.9: Healthy weight\n- 25 to 29.9: Overweight\n- 30 and above: Obesity\n\nBMI is popular because it is fast and easy to calculate, but it has important limits. It does not distinguish between fat and muscle, and it does not capture the full picture of health. That means the result is most useful as a screening estimate, not as a complete diagnosis.",
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
        "Estimate BMI for someone who is 178 centimeters tall and weighs 78 kilograms. Convert height to meters, square it, and divide the body weight by that number. The result shows how the person’s weight compares to common adult BMI reference ranges.",
      results: [
        { label: "Height", value: "178 cm" },
        { label: "Weight", value: "78 kg" },
        { label: "BMI", value: "24.6" },
        { label: "Category", value: "Healthy weight" },
      ],
    },
  },
];

export function getToolDefinition(category: string, slug: string) {
  return toolDefinitions.find((tool) => tool.category === category && tool.slug === slug);
}
