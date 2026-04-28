import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/config/site";
import { getGaMeasurementId } from "@/lib/analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = getGaMeasurementId();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 font-sans text-slate-100">
        <GoogleAnalytics measurementId={gaMeasurementId} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
