import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { areasData, servicesData } from '@/data';
import Contact from '@/components/Contact';
import { Metadata } from 'next';
import InteractiveMap from '@/components/InteractiveMapClient';

interface PageProps {
    params: Promise<{
        areaSlug: string;
    }>;
}

export async function generateStaticParams() {
    return areasData.map((area) => ({
        areaSlug: area.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { areaSlug } = await params;
    const area = areasData.find((a) => a.slug === areaSlug);

    if (!area) {
        return {
            title: 'Location Not Found',
        };
    }

    return {
        title: `Cleaning & Handyman Services in ${area.name} | Tidy & Fix`,
        description: `Professional cleaning and handyman services in ${area.name}, NC. Local experts for all your home maintenance needs.`,
    };
}

export default async function LocationPage({ params }: PageProps) {
    const { areaSlug } = await params;
    const area = areasData.find((a) => a.slug === areaSlug);

    if (!area) {
        notFound();
    }

    return (
        <>
            <section className="pt-32 pb-20 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Services in {area.name}</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">{area.description}</p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Serving the {area.name} Community</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                We are proud to serve homeowners and businesses in {area.name} and surrounding neighborhoods.
                                Whether you need a deep clean, a quick repair, or a fresh coat of paint, our local team is here to help.
                            </p>
                            {area.landmark && (
                                <p className="text-lg text-slate-600 mb-6">
                                    Located near {area.landmark}, we know the area well and can respond quickly to your needs.
                                </p>
                            )}
                            <div className="flex flex-wrap gap-4">
                                <Link href="/quote" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
                                    Get a Quote in {area.name}
                                </Link>
                            </div>
                        </div>
                        <div className="h-96 rounded-2xl overflow-hidden shadow-xl">
                            <InteractiveMap center={[area.lat, area.lng]} zoom={12} markers={[{ position: [area.lat, area.lng], popup: `Tidy & Fix in ${area.name}` }]} />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Available Services in {area.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service) => (
                            <Link key={service.slug} href={`/locations/${area.slug}/services/${service.slug}`} className="group bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-slate-100">
                                <div className="mb-4 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                                <p className="text-slate-600 mb-4">{service.description}</p>
                                <span className="text-blue-600 font-semibold group-hover:underline">View {area.name} Service &rarr;</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Contact />
        </>
    );
}
