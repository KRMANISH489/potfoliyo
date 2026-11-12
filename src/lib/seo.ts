import { SITE_CONFIG } from "@/lib/constants";

export function absoluteUrl(path = "/") {
  const base = SITE_CONFIG.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function siteJsonLd() {
  const websiteId = `${SITE_CONFIG.siteUrl}/#website`;
  const personId = `${SITE_CONFIG.siteUrl}/#person`;
  const businessId = `${SITE_CONFIG.siteUrl}/#business`;
  const telephone = SITE_CONFIG.phone.replace(/\s/g, "");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl("/"),
        name: SITE_CONFIG.brand,
        description: SITE_CONFIG.metaDescription,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_CONFIG.name,
        url: absoluteUrl("/"),
        jobTitle: SITE_CONFIG.role,
        email: `mailto:${SITE_CONFIG.email}`,
        telephone,
        image: absoluteUrl("/opengraph-image"),
        address: {
          "@type": "PostalAddress",
          addressLocality: "New Delhi",
          addressCountry: "IN",
        },
        sameAs: [SITE_CONFIG.linkedin, SITE_CONFIG.github],
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: SITE_CONFIG.brand,
        url: absoluteUrl("/"),
        image: absoluteUrl("/opengraph-image"),
        description: SITE_CONFIG.metaDescription,
        telephone,
        email: SITE_CONFIG.email,
        areaServed: {
          "@type": "City",
          name: "New Delhi",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "New Delhi",
          addressCountry: "IN",
        },
        founder: { "@id": personId },
      },
    ],
  };
}
