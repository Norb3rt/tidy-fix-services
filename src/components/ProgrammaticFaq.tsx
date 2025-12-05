'use client';

import React, { useState, useEffect } from 'react';
import type { FaqItem } from '../types';

interface ProgrammaticFaqProps {
    faqs: FaqItem[];
    serviceName: string;
    areaName: string;
}

const FaqAccordionItem: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void; }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-200">
            <button
                className="w-full flex justify-between items-center text-left py-5 px-6"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="text-lg font-medium text-slate-800">{item.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-5 text-slate-600">
                    {item.answer}
                </div>
            </div>
        </div>
    );
};

const ProgrammaticFaq: React.FC<ProgrammaticFaqProps> = ({ faqs, serviceName, areaName }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };

        const scriptId = "faq-schema";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = scriptId;
            document.head.appendChild(script);
        }

        script.textContent = JSON.stringify(schema);

        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };

    }, [faqs]);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Questions about {serviceName} in {areaName}
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Here are answers to some common questions we receive.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    {faqs.map((item, index) => (
                        <FaqAccordionItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgrammaticFaq;