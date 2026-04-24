"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight text-white">
              {siteConfig.name}
            </Link>
            <p className="hidden text-sm text-slate-400 sm:block">{siteConfig.tagline}</p>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition ${
                    active ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 md:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            Menu
          </button>
        </Container>

        {mobileOpen ? (
          <div className="border-t border-white/10 md:hidden">
            <Container className="flex flex-col py-3">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </Container>
          </div>
        ) : null}
      </header>

      {children}

      <footer className="border-t border-white/10 bg-slate-950">
        <Container className="flex flex-col gap-4 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.name} provides fast, free calculators and tools to help you solve everyday problems with confidence.</p>
          <div className="flex gap-4">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      </footer>
    </div>
  );
}
