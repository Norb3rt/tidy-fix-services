import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle, Award, Users, Clock } from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';

export const metadata: Metadata = {
    title: 'About Us | Tidy & Fix Services',
    description: 'Learn about Tidy & Fix - your trusted partner for professional cleaning, handyman, and drywall services in Raleigh-Durham. Licensed, insured, and locally owned.',
    keywords: ['about us', 'local business', 'Raleigh Durham', 'home services', 'professional cleaning'],
};

export default function AboutPage() {
    const values = [
        {
            icon: CheckCircle,
            title: 'Quality Guaranteed',
            description: '100% satisfaction guarantee on every project. If you\'re not happy, we\'ll make it right.'
        },
        {
            icon: Award,
            title: 'Licensed & Insured',
            description: 'Fully licensed and insured for your peace of mind. Professional service you can trust.'
        },
        {
            icon: Users,
            title: 'Local & Trusted',
            description: 'Family-owned business serving the Raleigh-Durham community with pride since 2019.'
        },
        {
            icon: Clock,
            title: 'Fast Response',
            description: '2-hour response guarantee. We value your time and respond quickly to all inquiries.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">About Tidy & Fix</h1>
                        <p className="text-xl md:text-2xl text-blue-100">
                            Your trusted partner for professional home services in the Triangle
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Story</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                Tidy & Fix was founded with a simple mission: to provide Raleigh-Durham residents with reliable, professional home services they can trust. We saw too many homeowners struggling to find quality service providers who actually showed up on time, did excellent work, and stood behind their results.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                As a locally-owned and operated business, we understand the unique needs of Triangle area homes. Whether it's the humidity that affects drywall, the pollen that requires regular cleaning, or the general wear and tear of daily life, we've seen it all and know how to handle it.
                            </p>
                            <p className="text-lg text-slate-700 leading-relaxed">
                                Today, we're proud to serve thousands of satisfied customers across Raleigh, Durham, Chapel Hill, and surrounding areas. Every project, big or small, receives the same attention to detail and commitment to excellence that has made us the Triangle's trusted choice for home services.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <TrustBadges />
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <div key={index} className="text-center">
                                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2">1,000+</div>
                            <div className="text-blue-200">Projects Completed</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">5+</div>
                            <div className="text-blue-200">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">4.9★</div>
                            <div className="text-blue-200">Average Rating</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">2hr</div>
                            <div className="text-blue-200">Response Time</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience the Difference?</h2>
                    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers in the Triangle area
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/quote"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        >
                            Get Your Free Quote
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <a
                            href="tel:+19842124247"
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white border-2 border-slate-300 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all"
                        >
                            Call (984) 212-4247
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
