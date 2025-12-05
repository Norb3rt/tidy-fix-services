import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicesData, areasData } from '@/data';
import Contact from '@/components/Contact';
import ServiceSchema from '@/components/ServiceSchema';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        serviceSlug: string;
    }>;
}

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        serviceSlug: service.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { serviceSlug } = await params;
    const service = servicesData.find((s) => s.slug === serviceSlug);

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    return {
        title: `${service.title} Services | Tidy & Fix Raleigh-Durham`,
        description: `Professional ${service.title.toLowerCase()} services in the Raleigh-Durham area. ${service.description}`,
    };
}

export default async function ServicePage({ params }: PageProps) {
    const { serviceSlug } = await params;
    const service = servicesData.find((s) => s.slug === serviceSlug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <ServiceSchema name={service.title} description={service.description} />
            <section className="pt-32 pb-20 bg-slate-50">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex justify-center items-center mb-6">{service.icon}</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{service.title}</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">{service.description}</p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our {service.title} Includes</h2>
                        <div className="prose prose-lg max-w-none text-slate-600">
                            <p>We provide a comprehensive {service.title.toLowerCase()} service designed to deliver exceptional results and complete customer satisfaction. Our process includes:</p>
                            {service.details && (
                                <ul>
                                    {service.details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                            <p>From the initial consultation to the final walkthrough, we guarantee a smooth and transparent process. Let us handle the hard work so you can enjoy a beautifully maintained space.</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Available In:</h3>
                        <div className="flex flex-wrap gap-4">
                            {areasData.map((area) => (
                                <Link key={area.slug} href={`/locations/${area.slug}/services/${service.slug}`} className="bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-full hover:bg-blue-200 transition-colors">
                                    {area.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {service.subServices && service.subServices.length > 0 && (
                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Specific {service.title} We Offer</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {service.subServices.map((sub) => (
                                <Link key={sub.slug} href={`/services/${service.slug}/${sub.slug}`} className="group bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col transition-all duration-300">
                                    <h3 className="text-xl font-semibold mb-2 text-slate-900">{sub.name}</h3>
                                    <p className="text-slate-600 flex-grow">{sub.description}</p>
                                    <span className="mt-4 text-blue-600 font-semibold group-hover:underline inline-block">Learn More &rarr;</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Contact />
        </>
    );
}
