"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { buildGaPagePath, pageview } from "@/lib/analytics";

function GoogleAnalyticsPageTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    pageview(buildGaPagePath(pathname, searchParams), measurementId);
  }, [measurementId, pathname, searchParams]);

  return null;
}

export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
