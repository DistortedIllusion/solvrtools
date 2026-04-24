import type { ReactNode } from "react";
import Link from "next/link";

type ClassNameProps = {
  className?: string;
};

export function Container({
  children,
  className = "",
}: ClassNameProps & { children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      className={[
        "max-w-3xl",
        centered ? "mx-auto flex flex-col items-center text-center" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
      {actions ? (
        <div
          className={[
            "mt-6 flex flex-wrap gap-3",
            centered ? "justify-center" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function SurfaceCard({
  children,
  className = "",
}: ClassNameProps & { children: ReactNode }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

export function CategoryCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
    >
      <p className="text-sm font-medium text-cyan-400">Category</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      <span className="mt-5 inline-flex text-sm font-medium text-cyan-300 group-hover:text-cyan-200">
        Browse category
      </span>
    </Link>
  );
}

export function ToolCard({
  href,
  category,
  title,
  summary,
}: {
  href: string;
  category: string;
  title: string;
  summary: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">{category}</p>
      <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{summary}</p>
      <span className="mt-5 inline-flex text-sm font-medium text-cyan-300 group-hover:text-cyan-200">
        Open tool page
      </span>
    </Link>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-200">{item.label}</span>
            )}
            {index < items.length - 1 ? <span className="text-slate-600">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SearchBar() {
  return (
    <form className="mx-auto mt-8 w-full max-w-2xl">
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>
      <div className="w-full rounded-full border border-white/10 bg-white/5 p-2 shadow-lg shadow-cyan-950/20">
        <div className="flex items-center gap-3 rounded-full bg-slate-950/60 px-5 py-3">
          <span className="text-slate-500">⌕</span>
          <input
            id="tool-search"
            name="tool-search"
            type="search"
            placeholder="Search tools, calculators, and utilities"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>
    </form>
  );
}

export function FaqSection({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <section className="space-y-4">
      {items.map((item) => (
        <SurfaceCard key={item.question}>
          <h3 className="text-lg font-semibold text-white">{item.question}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">{item.answer}</p>
        </SurfaceCard>
      ))}
    </section>
  );
}

export function RelatedLinksSection({
  links,
}: {
  links: Array<{ label: string; href: string; description: string }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40"
        >
          <h3 className="text-base font-semibold text-white">{link.label}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{link.description}</p>
        </Link>
      ))}
    </div>
  );
}
