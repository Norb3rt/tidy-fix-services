import React from 'react';
import Link from 'next/link';
import { servicesData } from '../data';

interface ContentRendererProps {
  paragraphs: string[];
  currentCitySlug: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ paragraphs, currentCitySlug }) => {
  // Create a regex to find all service titles case-insensitively
  const serviceTitles = servicesData.map(s => s.title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
  const regex = new RegExp(`(${serviceTitles.join('|')})`, 'gi');

  const renderParagraph = (paragraph: string, pIndex: number) => {
    const parts = paragraph.split(regex);

    return (
      <p key={pIndex}>
        {parts.map((part, index) => {
          const matchedService = servicesData.find(s => s.title.toLowerCase() === part.toLowerCase());
          if (matchedService) {
            return (
              <Link
                key={index}
                href={`/locations/${currentCitySlug}/services/${matchedService.slug}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {part}
              </Link>
            );
          }
          return part;
        })}
      </p>
    );
  };

  return (
    <div className="prose prose-lg max-w-none text-slate-600">
      {paragraphs.map(renderParagraph)}
    </div>
  );
};

export default ContentRenderer;