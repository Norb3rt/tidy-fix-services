import React from 'react';
import Link from 'next/link';
import { servicesData, areasData } from '../data';

interface RelatedLinksProps {
    currentCitySlug: string;
    currentServiceSlug: string;
}

const RelatedLinks: React.FC<RelatedLinksProps> = ({ currentCitySlug, currentServiceSlug }) => {
    const currentArea = areasData.find(a => a.slug === currentCitySlug);
    const currentService = servicesData.find(s => s.slug === currentServiceSlug);

    if (!currentArea || !currentService) return null;

    // 1. Other Services in the Same Area
    const otherServices = servicesData.filter(s => s.slug !== currentServiceSlug);

    // 2. Same Service in Nearby Areas (Simple logic: just take other areas)
    const nearbyAreas = areasData.filter(a => a.slug !== currentCitySlug).slice(0, 6); // Limit to 6

    return (
        <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12">

                    {/* Other Services in Current Area */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-6">
                            More Services in {currentArea.name}
                        </h3>
                        <ul className="space-y-3">
                            {otherServices.map(service => (
                                <li key={service.slug}>
                                    <Link
                                        href={`/locations/${currentCitySlug}/services/${service.slug}`}
                                        className="text-slate-600 hover:text-blue-600 hover:underline transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                        {service.title} in {currentArea.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Same Service in Nearby Areas */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-6">
                            {currentService.title} Nearby
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {nearbyAreas.map(area => (
                                <Link
                                    key={area.slug}
                                    href={`/locations/${area.slug}/services/${currentServiceSlug}`}
                                    className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
                                >
                                    {area.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RelatedLinks;
