import React from 'react';
import { ClipboardList, Phone, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: ClipboardList,
            title: 'Request Your Free Quote',
            description: 'Fill out our simple form in 30 seconds or call us directly. Tell us what you need.',
            time: '30 seconds'
        },
        {
            icon: Phone,
            title: 'We Contact You',
            description: 'We\'ll call you within 2 hours to discuss your project and provide a detailed quote.',
            time: 'Within 2 hours'
        },
        {
            icon: CheckCircle,
            title: 'We Complete Your Project',
            description: 'Schedule at your convenience. We complete the work on time, on budget, with guaranteed satisfaction.',
            time: 'On your schedule'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Getting professional service for your home is easy with Tidy & Fix
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative">
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                                    {index + 1}
                                </div>

                                {/* Card */}
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 h-full">
                                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                                        <Icon className="w-8 h-8 text-blue-600" />
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                                        {step.title}
                                    </h3>

                                    <p className="text-slate-600 text-center mb-4">
                                        {step.description}
                                    </p>

                                    <div className="text-center">
                                        <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                                            {step.time}
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow (desktop only) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-0">
                                        <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/quote"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        Get Your Free Quote Now
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <p className="text-sm text-slate-600 mt-4">
                        🛡️ 100% Satisfaction Guaranteed | ⚡ 2-Hour Response Time
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
