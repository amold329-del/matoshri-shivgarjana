import { breadcrumbJsonLd } from "@/lib/seo";

/** BreadcrumbList JSON-LD (Home → current page). Server component. */
export function Breadcrumb({ path, name }: { path: string; name: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbJsonLd(path, name)),
      }}
    />
  );
}
