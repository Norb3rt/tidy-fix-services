import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { servicesData, areasData } from '@/data';

export const metadata: Metadata = {
    title: 'Sitemap | Tidy & Fix Services',
    description: 'Complete sitemap of Tidy & Fix services and locations in Raleigh-Durham. Find all our pages and services easily.',
};

export default function SitemapPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Sitemap</h1>
                    <p className="text-xl text-slate-600 text-center mb-12">
                        Find everything you need quickly and easily
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Main Pages */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Main Pages
                            </h2>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/services" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        All Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/locations" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        Service Areas
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/quote" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        Get a Quote
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Our Services
                            </h2>
                            <ul className="space-y-3">
                                {servicesData.map((service) => (
                                    <li key={service.slug}>
                                        <Link
                                            href={`/services/${service.slug}`}
                                            className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                            {service.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Locations */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg md:col-span-2">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Service Areas
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {areasData.map((location) => (
                                    <div key={location.slug}>
                                        <Link
                                            href={`/locations/${location.slug}`}
                                            className="text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-2 mb-3"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                                            {location.name}
                                        </Link>
                                        <ul className="space-y-2 ml-4">
                                            {servicesData.slice(0, 3).map((service) => (
                                                <li key={service.slug}>
                                                    <Link
                                                        href={`/locations/${location.slug}/services/${service.slug}`}
                                                        className="text-sm text-slate-600 hover:text-blue-600 hover:underline flex items-center gap-2"
                                                    >
                                                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                                                        {service.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-12 rounded-2xl">
                        <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                        <p className="text-xl text-blue-100 mb-6">
                            Contact us directly and we'll help you find the right service
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
                </div>
            </div>
        </div>
    );
}
