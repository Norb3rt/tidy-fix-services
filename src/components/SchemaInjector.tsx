"use client";

import React, { useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { servicesData, areasData } from '@/data';

const SchemaInjector: React.FC = () => {
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const baseUrl = window.location.origin;
    const currentPath = pathname;

    let schema: any = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": "Tidy & Fix Services",
      "description": "Your local expert for top-rated cleaning, handyman, drywall repair, and painting services in Raleigh, Durham, and Chapel Hill.",
      "url": baseUrl,
      "image": `${baseUrl}/logo.png`,
      "telephone": "+1-984-212-4247",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Raleigh",
        "addressRegion": "NC",
        "addressCountry": "US"
      }
    };

    // Logic to determine specific schema based on route
    if (currentPath.startsWith('/locations/')) {
      const citySlug = params.citySlug || currentPath.split('/')[2];
      const area = areasData.find(a => a.slug === citySlug);

      if (area) {
        if (currentPath.includes('/services/')) {
          // Service + Location Page
          const serviceSlug = params.serviceSlug || currentPath.split('/services/')[1];
          const service = servicesData.find(s => s.slug === serviceSlug);

          if (service) {
            schema = {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": `${service.title} in ${area.name}`,
              "provider": {
                "@type": "LocalBusiness",
                "name": `Tidy & Fix - ${area.name}`,
                "areaServed": {
                  "@type": "City",
                  "name": area.name
                }
              },
              "description": `Professional ${service.title.toLowerCase()} services in ${area.name}.`,
              "areaServed": {
                "@type": "City",
                "name": area.name
              }
            };
          }
        } else {
          // Location Landing Page
          schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Tidy & Fix - ${area.name}`,
            "description": area.description,
            "url": `${baseUrl}${currentPath}`,
            "areaServed": {
              "@type": "City",
              "name": area.name
            }
          };
        }
      }
    } else if (currentPath.startsWith('/services/')) {
      // Generic Service Page
      const serviceSlug = params.serviceSlug || currentPath.split('/services/')[1];
      const service = servicesData.find(s => s.slug === serviceSlug);
      if (service) {
        schema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": {
            "@type": "Organization",
            "name": "Tidy & Fix Services"
          }
        };
      }
    }

    // Default Organization Schema for Home and other pages (fallback is already set above, but we can refine)
    if (currentPath === '/') {
      schema = {
        ...schema,
        "areaServed": areasData.map(area => ({
          "@type": "City",
          "name": area.name,
        })),
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Home Services",
          "itemListElement": servicesData.flatMap(service => {
            const mainServiceOffer = {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.title,
                "description": service.description,
                "url": `${baseUrl}/services/${service.slug}`
              }
            };
            return [mainServiceOffer];
          })
        }
      };
    }

    const scriptId = "local-business-schema";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema, null, 2);

  }, [pathname, params]);

  return null;
};

export default SchemaInjector;