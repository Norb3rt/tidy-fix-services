import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services | Professional Home Services in Raleigh-Durham',
    description: 'Explore our comprehensive range of professional home services including cleaning, handyman, drywall repair, and painting in Raleigh-Durham. Licensed, insured, and satisfaction guaranteed.',
    keywords: ['home services', 'cleaning services', 'handyman', 'drywall repair', 'painting', 'Raleigh Durham'],
};

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Professional Services</h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-8">
                            Comprehensive home maintenance solutions for Raleigh-Durham residents
                        </p>
                        <Link
                            href="/quote"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Get Your Free Quote
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service) => (
                            <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-blue-300"
                            >
                                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-600 transition-colors">
                                    <div className="group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h2>

                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                                    Learn More
                                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Get your free quote today and experience the Tidy & Fix difference
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/quote"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all"
                        >
                            Get Free Quote
                        </Link>
                        <a
                            href="tel:+19842124247"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/10 border-2 border-white rounded-full hover:bg-white/20 transition-all"
                        >
                            Call (984) 212-4247
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
