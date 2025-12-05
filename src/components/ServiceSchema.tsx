"use client";

import { useEffect } from 'react';

interface ServiceSchemaProps {
    name: string;
    description: string;
    areaServed?: string;
}

const ServiceSchema = ({ name, description, areaServed = "Raleigh-Durham Area" }: ServiceSchemaProps) => {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": name,
            "description": description,
            "areaServed": areaServed,
            "provider": {
                "@type": "LocalBusiness",
                "name": "Tidy & Fix Services",
                "image": `${window.location.origin}/logo.png`
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [name, description, areaServed]);

    return null;
};

export default ServiceSchema;
