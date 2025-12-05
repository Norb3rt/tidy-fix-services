import React from 'react';
import { testimonialsData } from '../data';

interface DynamicTestimonialsProps {
  citySlug: string;
  cityName: string;
}

const DynamicTestimonials: React.FC<DynamicTestimonialsProps> = ({ citySlug, cityName }) => {
  const relevantTestimonials = testimonialsData.filter(t => t.citySlug === citySlug);

  if (relevantTestimonials.length === 0) {
    return null; // Don't render the section if there are no testimonials for this city
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What Our Clients in {cityName} Are Saying</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Real stories from your neighbors.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {relevantTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <svg className="w-10 h-10 text-blue-200 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.33 15.5C5.88 15.5 3.17 12.83 3.17 9.33 3.17 5.88 5.88 3.17 9.33 3.17c3.45 0 6.17 2.7 6.17 6.17 0 3.45-2.72 6.16-6.17 6.16zM22.67 15.5c-3.45 0-6.17-2.7-6.17-6.17 0-3.45 2.72-6.17 6.17-6.17s6.17 2.7 6.17 6.17c0 3.45-2.72 6.16-6.17 6.16z"></path>
              </svg>
              <blockquote className="text-slate-600 italic flex-grow">"{testimonial.quote}"</blockquote>
              <div className="mt-6 flex items-center">
                <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
                <div className="ml-4">
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicTestimonials;