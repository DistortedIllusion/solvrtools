export function getGaMeasurementId() {
  const prodId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_PROD;
  const devId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_DEV;
  const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV;
  const nodeEnv = process.env.NODE_ENV;

  const isProductionDeployment = vercelEnv === "production";
  const isLocalProduction = !vercelEnv && nodeEnv === "production";

  if (isProductionDeployment || isLocalProduction) {
    return prodId || undefined;
  }

  return devId || undefined;
}

export function buildGaPagePath(pathname: string, searchParams?: URLSearchParams | null) {
  const query = searchParams?.toString();
  return query ? `${pathname}?${query}` : pathname;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pageview(url: string, measurementId: string) {
  if (typeof window === "undefined" || !window.gtag || !measurementId) {
    return;
  }

  window.gtag("config", measurementId, {
    page_path: url,
  });
}
