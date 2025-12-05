import React from 'react';
import type { Testimonial } from '../types';
import { Quote, Star } from 'lucide-react';

const testimonialsData: Testimonial[] = [
  {
    quote: "Tidy & Fix transformed our office space! The cleaning crew is professional, thorough, and always on time. It's the best commercial cleaning service in Raleigh we've ever used.",
    name: 'Sarah L.',
    role: 'Business Owner, Raleigh',
    avatar: 'https://picsum.photos/100/100?random=1',
    citySlug: 'raleigh',
  },
  {
    quote: "I needed urgent drywall repair and painting before a party. Their handyman in Durham was a lifesaver! The wall looks brand new, and they left the place spotless.",
    name: 'Michael B.',
    role: 'Homeowner, Durham',
    avatar: 'https://picsum.photos/100/100?random=2',
    citySlug: 'durham',
  },
  {
    quote: "As a parent, I love their commitment to eco-friendly cleaning in Chapel Hill. The house smells fresh and clean without any harsh chemicals. Highly recommend!",
    name: 'Jessica P.',
    role: 'Parent, Chapel Hill',
    avatar: 'https://picsum.photos/100/100?random=3',
    citySlug: 'chapel-hill',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-accent font-bold tracking-wider uppercase text-sm mb-2 block font-heading">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-6">What Our Clients Say</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            Real stories from real people in the Triangle area who trust us with their homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="absolute -top-4 -right-4 bg-brand-accent text-white p-3 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                <Quote size={20} fill="currentColor" />
              </div>

              <div className="flex gap-1 text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <blockquote className="text-slate-700 text-lg leading-relaxed mb-8 flex-grow font-sans">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="relative">
                  <img
                    className="h-14 w-14 rounded-full object-cover ring-4 ring-brand-surface"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full ring-2 ring-brand-accent/20" />
                </div>
                <div>
                  <p className="font-heading font-bold text-brand-dark text-lg">{testimonial.name}</p>
                  <p className="text-brand-accent text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;