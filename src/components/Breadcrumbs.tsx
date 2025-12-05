"use client";

import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { servicesData, areasData } from '@/data';
import type { BreadcrumbItem } from '../types';

const HomeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

// Define a type for route parameters to provide strong typing for useParams
type RouteParams = {
  serviceSlug?: string;
  subServiceSlug?: string;
  areaSlug?: string; // Changed from citySlug to match App Router params
  neighborhoodSlug?: string;
};

function buildBreadcrumbs(pathname: string, params: RouteParams): BreadcrumbItem[] {
  const { serviceSlug, subServiceSlug, areaSlug, neighborhoodSlug } = params;
  const crumbs: BreadcrumbItem[] = [{ name: 'Home', path: '/' }];

  if (pathname.startsWith('/services/')) {
    const service = servicesData.find(s => s.slug === serviceSlug);
    if (!service) return crumbs;
    crumbs.push({ name: service.title, path: `/services/${service.slug}` });

    if (subServiceSlug) {
      const subService = service.subServices?.find(ss => ss.slug === subServiceSlug);
      if (subService) {
        crumbs.push({ name: subService.name, path: `/services/${service.slug}/${subService.slug}` });
      }
    }
  } else if (pathname.startsWith('/locations/')) {
    const area = areasData.find(a => a.slug === areaSlug);
    if (!area) return crumbs;
    crumbs.push({ name: 'Locations', path: '/locations' }); // Changed to /locations page
    crumbs.push({ name: area.name, path: `/locations/${area.slug}` });

    if (neighborhoodSlug) {
      const neighborhood = area.neighborhoods?.find(n => n.slug === neighborhoodSlug);
      if (neighborhood) {
        // Neighborhood itself doesn't have a page, so it's a text-only crumb.
        crumbs.push({ name: neighborhood.name });
      }
    }

    if (serviceSlug) {
      const service = servicesData.find(s => s.slug === serviceSlug);
      if (service) {
        const currentPath = neighborhoodSlug
          ? `/locations/${areaSlug}/${neighborhoodSlug}/services/${serviceSlug}`
          : `/locations/${areaSlug}/services/${serviceSlug}`;
        crumbs.push({ name: service.title, path: currentPath });
      }
    }
  }
  return crumbs;
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const params = useParams() as RouteParams; // Cast to RouteParams

  const breadcrumbs = useMemo(() => buildBreadcrumbs(pathname, params), [pathname, params]);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        // Only add 'item' if it's a link
        ...(crumb.path && { "item": `${window.location.origin}${crumb.path}` })
      }))
    };

    const scriptId = "breadcrumb-schema";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [breadcrumbs]);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-6">
        <ol className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRightIcon />}
              {crumb.path ? (
                <Link
                  href={crumb.path}
                  className="ml-2 text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2"
                  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
                >
                  {index === 0 && <HomeIcon />}
                  {crumb.name}
                </Link>
              ) : (
                <span className="ml-2 text-slate-800 font-medium">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;