'use client';

interface SEOProps {
  jsonLd?: Record<string, unknown>;
}

const defaultOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dikio",
  "url": "https://dikio.fr",
  "logo": "https://dikio.fr/images/c408f7e1-9171-44c5-847c-9754bd6d5c72.png",
  "description": "Dikio est une agence digitale spécialisée dans la croissance rapide et durable des projets innovants.",
  "sameAs": [
    "https://www.linkedin.com/company/dikio",
    "https://twitter.com/dikio"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@dikio.fr",
    "contactType": "customer service"
  }
};

const defaultWebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dikio",
  "url": "https://dikio.fr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://dikio.fr/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const SEO = ({ jsonLd }: SEOProps) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultOrganizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultWebsiteSchema) }}
      />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};

export default SEO;
