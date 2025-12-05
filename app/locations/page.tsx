import React from 'react';
import Link from 'next/link';
import { areasData } from '@/data';
import Contact from '@/components/Contact';
import { Metadata } from 'next';
import InteractiveMap from '@/components/InteractiveMapClient';

export const metadata: Metadata = {
    title: 'Service Areas | Tidy & Fix Raleigh-Durham',
    description: 'We serve Raleigh, Durham, Chapel Hill, and surrounding areas. Find your local Tidy & Fix team today.',
};

export default function LocationsIndexPage() {
    return (
        <>
            <section className="pt-32 pb-20 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Our Service Areas</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                        Proudly serving the entire Research Triangle area with top-notch cleaning and handyman services.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Where We Work</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                Our team is locally based and ready to help you with your home maintenance needs.
                                Select your city to see specific services and local details.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {areasData.map((area) => (
                                    <Link
                                        key={area.slug}
                                        href={`/locations/${area.slug}`}
                                        className="block p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-center"
                                    >
                                        <span className="font-semibold text-slate-800">{area.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="h-96 rounded-2xl overflow-hidden shadow-xl">
                            <InteractiveMap center={[35.7796, -78.6382]} zoom={9} markers={areasData.map(a => ({ position: [a.lat, a.lng], popup: a.name }))} />
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
        </>
    );
}
