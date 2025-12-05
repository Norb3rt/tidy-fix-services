import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicesData, areasData } from '@/data';
import Contact from '@/components/Contact';
import ServiceSchema from '@/components/ServiceSchema';
import { generateProgrammaticData } from '@/utils/contentGenerator';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        areaSlug: string;
        serviceSlug: string;
    }>;
}

export async function generateStaticParams() {
    const params = [];
    for (const area of areasData) {
        for (const service of servicesData) {
            params.push({
                areaSlug: area.slug,
                serviceSlug: service.slug,
            });
        }
    }
    return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { areaSlug, serviceSlug } = await params;
    const area = areasData.find((a) => a.slug === areaSlug);
    const service = servicesData.find((s) => s.slug === serviceSlug);

    if (!area || !service) {
        return {
            title: 'Page Not Found',
        };
    }

    const content = generateProgrammaticData(service, area);

    return {
        title: content.metaTitle,
        description: content.metaDescription,
    };
}

export default async function LocationServicePage({ params }: PageProps) {
    const { areaSlug, serviceSlug } = await params;
    const area = areasData.find((a) => a.slug === areaSlug);
    const service = servicesData.find((s) => s.slug === serviceSlug);

    if (!area || !service) {
        notFound();
    }

    const content = generateProgrammaticData(service, area);

    return (
        <>
            <ServiceSchema name={service.title} description={content.pageDescription} areaServed={area.name} />
            <section className="pt-32 pb-20 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center items-center mb-6">{service.icon}</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{content.pageTitle}</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">{content.pageDescription}</p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Us in {area.name}?</h2>
                        <div className="prose prose-lg max-w-none text-slate-600">
                            {content.details.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="mt-8">
                            <Link href="/quote" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors">
                                Get a Free Quote in {area.name}
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Other Services in {area.name}</h3>
                        <div className="space-y-4">
                            {servicesData
                                .filter((s) => s.slug !== service.slug)
                                .map((otherService) => (
                                    <Link
                                        key={otherService.slug}
                                        href={`/locations/${area.slug}/services/${otherService.slug}`}
                                        className="block p-4 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50 transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-slate-700">{otherService.title}</span>
                                            <span className="text-blue-600">&rarr;</span>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
        </>
    );
}
