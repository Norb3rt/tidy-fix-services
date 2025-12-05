'use client';

import React, { useState } from 'react';
import type { FaqItem } from '../types';
import { ChevronDown } from 'lucide-react';

const faqData: FaqItem[] = [
  {
    question: "Do you offer drywall repair in Raleigh?",
    answer: "Absolutely. We specialize in drywall and sheetrock repair services across Raleigh and the surrounding areas. From small patches to larger installations, our team ensures a seamless finish ready for painting."
  },
  {
    question: "What areas of Durham do you cover for handyman services?",
    answer: "Our handyman services cover all of Durham, from the city center to the suburbs. We handle a wide variety of tasks, including plumbing, electrical fixes, assembly, and general home maintenance."
  },
  {
    question: "Are your cleaning products safe for kids and pets?",
    answer: "Yes, they are. We prioritize your family's health by offering eco-friendly cleaning in Chapel Hill and beyond. Our products are non-toxic, biodegradable, and effective, ensuring a safe environment for everyone."
  },
  {
    question: "How do I get a quote for painting services?",
    answer: "Getting a quote is easy! Simply fill out our contact form with details about your project, or give us a call. We offer free, no-obligation estimates for all drywall and painting Raleigh projects."
  },
  {
    question: "What are your operating hours?",
    answer: "We offer flexible scheduling to accommodate your needs, including weekends and evenings for certain services. Our customer support is available 24/7 to answer your questions and book appointments."
  }
];

const FaqAccordionItem: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void; }> = ({ item, isOpen, onClick }) => {
  return (
    <div className={`group mb-3 rounded-lg border transition-all duration-300 ${isOpen
        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-md'
        : 'bg-white/80 border-white/20 hover:border-blue-200'
      }`}>
      <button
        className="w-full flex justify-between items-center text-left py-5 px-6 hover:px-7 transition-all"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-600'
          }`}>{item.question}</span>
        <span className={`transform transition-transform duration-300 flex-shrink-0 ml-3 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className={`w-6 h-6 transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-blue-100">
          {item.answer}
        </div>
      </div>
    </div>
  );
};


const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-white via-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">Answers to common questions about our Triangle area maintenance services.</p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
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

export default Faq;
