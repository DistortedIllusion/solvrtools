"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import type { ToolDefinition } from "@/lib/tool-definitions";
import { runToolCalculation } from "@/lib/tool-runner";
import {
  Breadcrumbs,
  FaqSection,
  RelatedLinksSection,
  SectionHeader,
  SurfaceCard,
} from "@/components/ui";

function formatValue(
  value: string | number | undefined,
  format?: "currency" | "number" | "text",
  prefix?: string,
  suffix?: string,
) {
  if (value === undefined || value === null || value === "") return "—";

  let display = String(value);

  if (typeof value === "number") {
    if (format === "currency") {
      display = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(value);
    } else if (format === "number") {
      display = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 4,
      }).format(value);
    }
  }

  return `${prefix ?? ""}${display}${suffix ?? ""}`;
}

function formatCategoryLabel(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function getDynamicOutputLabel(definition: ToolDefinition, outputKey: string, values: Record<string, string>) {
  if (definition.slug === "paint-calculator" && outputKey === "paintNeeded") {
    return values.unitSystem === "metric" ? "Litres Needed" : "Gallons Needed";
  }

  return definition.outputs.find((output) => output.key === outputKey)?.label ?? outputKey;
}

function formatUnitValue(unit: string) {
  const unitLabels: Record<string, string> = {
    milligrams: "mg",
    grams: "g",
    kilograms: "kg",
    ounces: "oz",
    pounds: "lb",
    tons: "tons",
    milliliters: "mL",
    liters: "L",
    teaspoons: "tsp",
    tablespoons: "tbsp",
    cups: "cups",
    fluidOunces: "fl oz",
    pints: "pt",
    quarts: "qt",
    gallons: "gal",
  };

  return unitLabels[unit] ?? unit;
}

function getDynamicOutputSuffix(definition: ToolDefinition, outputKey: string, values: Record<string, string>) {
  const output = definition.outputs.find((item) => item.key === outputKey);

  if (!output?.suffix?.includes("{dynamic-unit}")) {
    return output?.suffix;
  }

  if (["weight-converter", "volume-converter"].includes(definition.slug) && outputKey === "convertedValue") {
    return ` ${formatUnitValue(values.toUnit ?? "")}`;
  }

  return output.suffix.replace("{dynamic-unit}", "").trim() ? output.suffix.replace("{dynamic-unit}", "") : undefined;
}

function buildInitialState(definition: ToolDefinition) {
  return definition.inputs.reduce<Record<string, string>>((acc, field) => {
    const exampleValue = definition.example.inputs[field.name];

    if (exampleValue !== undefined) {
      acc[field.name] = String(exampleValue);
    } else if (field.options?.[0]) {
      acc[field.name] = field.options[0].value;
    } else {
      acc[field.name] = "";
    }

    return acc;
  }, {});
}

function ToolInputForm({
  definition,
  values,
  onChange,
  onSubmit,
  error,
}: {
  definition: ToolDefinition;
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
  error: string | null;
}) {
  const visibleFields = definition.inputs.filter((field) => {
    if (definition.slug !== "bmi-calculator") {
      return true;
    }

    const unitSystem = values.unitSystem ?? "metric";

    if (["unitSystem"].includes(field.name)) {
      return true;
    }

    if (unitSystem === "metric") {
      return ["heightCm", "weightKg"].includes(field.name);
    }

    if (unitSystem === "imperial") {
      return ["heightFeet", "heightInches", "weightPounds"].includes(field.name);
    }

    return true;
  });

  return (
    <SurfaceCard>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Inputs</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Fields marked with * are required.
          </p>
        </div>
      </div>
      {error ? (
        <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      ) : null}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visibleFields.map((field) => (
          <label key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
            <span className="mb-2 block text-sm font-medium text-slate-300">
              {field.label}
              {field.required ? <span className="ml-1 text-cyan-300">*</span> : null}
            </span>
            {field.type === "select" ? (
              <select
                value={values[field.name] ?? ""}
                onChange={(event) => onChange(field.name, event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                value={values[field.name] ?? ""}
                onChange={(event) => onChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                rows={6}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              />
            ) : (
              <input
                type={field.type}
                value={values[field.name] ?? ""}
                onChange={(event) => onChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                min={field.min}
                step={field.step}
                className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                  field.type === "date" || field.type === "time"
                    ? "border-slate-500/70 bg-slate-900 text-slate-100 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 [color-scheme:dark]"
                    : "border-white/10 bg-slate-950/70 text-white placeholder:text-slate-500"
                }`}
              />
            )}
            {field.helpText ? (
              <span className="mt-2 block text-xs leading-5 text-slate-500">{field.helpText}</span>
            ) : null}
          </label>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Calculate
        </button>
      </div>
    </SurfaceCard>
  );
}

function ToolResultDisplay({
  definition,
  values,
  results,
}: {
  definition: ToolDefinition;
  values: Record<string, string>;
  results: Record<string, string | number> | null;
}) {
  return (
    <SurfaceCard>
      <h2 className="text-2xl font-semibold text-white">Results</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Your result updates after a successful calculation.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {definition.outputs.map((output) => (
          <div key={output.key} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-sm text-slate-400">{getDynamicOutputLabel(definition, output.key, values)}</p>
            <p className="mt-2 break-words text-xl font-semibold text-white sm:text-2xl">
              {formatValue(
                results?.[output.key],
                output.format,
                output.prefix,
                getDynamicOutputSuffix(definition, output.key, values),
              )}
            </p>
            {output.description ? (
              <p className="mt-2 text-xs leading-5 text-slate-500">{output.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}

export function ToolLayoutWrapper({
  definition,
  related,
}: {
  definition: ToolDefinition;
  related: Array<{ label: string; href: string; description: string }>;
}) {
  const [values, setValues] = useState<Record<string, string>>(() => buildInitialState(definition));
  const [results, setResults] = useState<Record<string, string | number> | null>(() => {
    try {
      return runToolCalculation(definition.category, definition.slug, buildInitialState(definition));
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  const exampleList = useMemo(
    () =>
      Object.entries(definition.example.inputs).map(([key, value]) => ({
        key,
        value,
      })),
    [definition.example.inputs],
  );

  function handleSubmit() {
    trackEvent("calculate_click", {
      tool_slug: definition.slug,
      category_slug: definition.category,
      page_path: `/tools/${definition.category}/${definition.slug}`,
    });

    try {
      const nextResults = runToolCalculation(definition.category, definition.slug, values);
      setResults(nextResults);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: formatCategoryLabel(definition.category), href: `/categories/${definition.category}` },
          { label: definition.title },
        ]}
      />

      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {definition.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">{definition.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.85fr)]">
        <div className="space-y-8">
          {definition.intro?.length ? (
            <SurfaceCard>
              <SectionHeader
                title="Before you calculate"
                description="A quick overview to help you understand what this tool does and how to use it well."
              />
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-400">
                {definition.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </SurfaceCard>
          ) : null}

          <ToolInputForm
            definition={definition}
            values={values}
            onChange={(name, value) => setValues((current) => ({ ...current, [name]: value }))}
            onSubmit={handleSubmit}
            error={error}
          />
          <ToolResultDisplay definition={definition} values={values} results={results} />

          <SurfaceCard>
            <SectionHeader
              title="How it works"
              description="See the formula, calculation method, and reasoning behind the result."
            />
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-400">
              {definition.formulaSummary.split("\n\n").map((paragraph) => (
                <div key={paragraph}>
                  {paragraph.split("\n").map((line, index) =>
                    line.startsWith("- ") ? (
                      index === 0 || !paragraph.split("\n")[index - 1]?.startsWith("- ") ? null : null
                    ) : null,
                  )}
                  {paragraph.split("\n").some((line) => line.startsWith("- ")) ? (
                    <>
                      {paragraph
                        .split("\n")
                        .filter((line) => !line.startsWith("- ") && line.trim())
                        .map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      <ul className="list-disc space-y-2 pl-5">
                        {paragraph
                          .split("\n")
                          .filter((line) => line.startsWith("- "))
                          .map((line) => (
                            <li key={line}>{line.slice(2)}</li>
                          ))}
                      </ul>
                    </>
                  ) : (
                    <p>{paragraph}</p>
                  )}
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard>
            <SectionHeader title="Worked example" description={definition.example.explanation} />
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-400">
              {exampleList.map((item) => (
                <li key={item.key}>
                  <span className="font-medium text-white">{item.key}</span>: {String(item.value)}
                </li>
              ))}
            </ul>
            {definition.example.results?.length ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <p className="text-sm font-medium text-white">Example results</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-400">
                  {definition.example.results.map((result) => (
                    <li key={result.label}>
                      <span className="font-medium text-white">{result.label}</span>: {result.value}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </SurfaceCard>

          <div>
            <SectionHeader title="FAQ" description="Common questions about this tool." />
            <div className="mt-6">
              <FaqSection items={definition.faq} />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <SurfaceCard>
            <h2 className="text-lg font-semibold text-white">Quick guide</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-400">
              <li>Fill in the required fields first</li>
              <li>Use realistic values for better estimates</li>
              <li>Check the explanation text under each result when available</li>
              <li>Review related tools for adjacent use cases</li>
            </ul>
          </SurfaceCard>

          {related.length > 0 ? (
            <div>
              <SectionHeader title="Related tools" description="Nearby tools users may also want." />
              <div className="mt-4">
                <RelatedLinksSection links={related} />
              </div>
            </div>
          ) : null}

          <SurfaceCard>
            <h2 className="text-lg font-semibold text-white">Keywords</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {definition.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <Link
              href={`/categories/${definition.category}`}
              className="mt-5 inline-flex text-sm font-medium text-cyan-300 hover:text-cyan-200"
            >
              Back to category
            </Link>
          </SurfaceCard>
        </aside>
      </div>
    </div>
  );
}
