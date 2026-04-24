# SolvrTools

## Project purpose

SolvrTools is a production-minded Next.js foundation for an SEO-focused web application that will publish calculators, utilities, and small solver tools intended to attract organic search traffic and later monetize with ads.

This phase includes the site shell, information architecture, reusable tool system, first tool implementations, and Obsidian project organization.

## Architecture overview

- `app/` - App Router routes and page shells
- `components/` - Shared site shell and reusable UI components
- `components/tools/` - Reusable tool UI and layout components
- `lib/` - Tool definitions and calculation logic
- `config/` - Central site, navigation, category, and tool definitions
- `seo/` - Metadata helpers for reusable SEO configuration
- `tests/` - Core calculation tests

## UI and layout decisions

- Dark theme is the default visual style
- Layout is mobile-first with a collapsible mobile navigation menu
- Shared shell includes header, primary navigation, footer, and centered content containers
- Homepage hero content is centered, while the rest of the site remains left-aligned
- Homepage emphasizes site title, updated tagline, centered search bar, and a popular tools section
- Breadcrumbs are part of category and tool page shells
- FAQ and related-links sections are reusable patterns on tool pages
- Shared spacing uses a `max-w-6xl` container with consistent horizontal padding

## Information architecture decisions

### Top-level categories

- `Finance` - Money tools for payments, savings, percentages, interest, and personal finance decisions
- `Time` - Date, duration, age, schedule, and work-hour tools
- `Conversions` - Unit and value conversion tools for common measurement tasks
- `Text` - Text and word utilities such as counters, case tools, and cleaners
- `Home` - Household calculators for space, materials, and planning tasks

### Core page behavior

- Homepage `Most popular tools` shows popular tools first, then falls back to featured tools if usage data does not exist yet
- `/tools` acts as the main tool discovery index with category access and grouped tool cards
- `/categories` presents category landing-page entry points plus example tools for each category
- `/categories/[category]` is the canonical category landing page pattern
- `/tools/[category]/[slug]` is the canonical individual tool page pattern

### URL conventions

- Category URLs: `/categories/[category-slug]`
- Tool URLs: `/tools/[category-slug]/[tool-slug]`
- All slugs should be lowercase, hyphenated, and SEO-friendly
- Example category URL: `/categories/finance`
- Example tool URL: `/tools/finance/loan-payment-calculator`

### Naming conventions

- Category names use Title Case in the UI
- Category slugs use lowercase hyphenated names
- Tool names should be explicit and search-friendly, such as `Loan Payment Calculator`
- Tool slugs should match the descriptive keyword phrase, such as `loan-payment-calculator`
- Page titles should follow `{Tool Name} | SolvrTools` or `{Category Name} Tools | SolvrTools`
- Breadcrumbs should follow `Home > Categories > Category` and `Home > Tools > Category > Tool`

### Internal linking strategy

- Category pages link to their individual tools and nearby discovery pages
- Tool pages link back to the parent category and to related tools in the same category
- The tools index helps users move between categories and individual tools without dead ends
- Related-links and FAQ sections are reused to strengthen navigation and future SEO structure

## Reusable tool system

### Tool definition schema

Each tool definition supports:
- `slug`
- `title`
- `category`
- `description`
- `keywords`
- `inputs`
- `outputs`
- `faq`
- `relatedTools`
- `formulaSummary`
- `example`
- `calculator`

### Standard tool page structure

Each tool page includes:
- H1 title
- short description
- input section
- results section
- how it works / formula summary
- worked example
- FAQ section
- related tools section
- breadcrumb navigation

### How tools are defined

- Tool metadata and input/output shape live in `lib/tool-definitions.ts`
- Calculation logic lives in `lib/tool-logic.js`
- Reusable tool UI lives in `components/tools/tool-client.tsx`
- Dynamic tool pages are rendered through `app/tools/[category]/[slug]/page.tsx`

### How to add new tools

1. Add the tool definition in `lib/tool-definitions.ts`
2. Add or reuse a calculation function in `lib/tool-logic.js`
3. Define inputs, outputs, FAQ, related tools, and example data
4. Make sure the tool slug and category follow the existing URL conventions
5. Add or update tests in `tests/`
6. Record the completed work in the SolvrTools Obsidian project folder

## Initial launch batch

- **Finance**
  - Loan Payment Calculator
  - Percentage Calculator
  - Compound Interest Calculator
- **Time**
  - Date Difference Calculator
  - Age Calculator
  - Time Duration Calculator
- **Conversions**
  - Temperature Converter
  - Length Converter
- **Text**
  - Word Counter
  - Case Converter
- **Home**
  - Paint Calculator
  - Square Footage Calculator

## Included page structure

- Homepage shell
- `/tools` tools index shell
- `/categories` category index shell
- `/categories/[category]` category landing page shell
- `/about` about page shell
- `/tools/[category]` category-to-tools support shell
- `/tools/[category]/[slug]` reusable tool page shell

## Reusable UI patterns

- content containers
- page headers
- section headers
- surface cards
- category cards
- tool cards
- breadcrumbs
- FAQ sections
- related links sections
- tool input forms
- tool result displays
- tool layout wrapper

## How to run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build, lint, and test

```bash
npm run lint
npm run build
npm test
```

## Notes

- Static-first routing is used where practical through route params and centralized content definitions.
- Calculation logic is kept separate from UI for easier testing and future reuse.
- The tool system is intentionally simple so new tools can be added quickly without introducing unnecessary complexity.
