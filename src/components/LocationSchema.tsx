"use client";

import { useEffect } from 'react';

interface LocationSchemaProps {
    name: string;
    description: string;
    url: string;
    latitude?: number;
    longitude?: number;
    image?: string;
}

const LocationSchema = ({ name, description, url, latitude, longitude, image }: LocationSchemaProps) => {
    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "Place",
            "name": name,
            "description": description,
            "url": url,
            ...(latitude && longitude && {
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": latitude,
                    "longitude": longitude
                }
            }),
            ...(image && { "image": image })
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [name, description, url, latitude, longitude, image]);

    return null;
};

export default LocationSchema;
