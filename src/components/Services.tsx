'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Service } from '../types';
import { servicesData } from '../data';
import { ArrowRight } from 'lucide-react';

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <Link
      href={`/services/${service.slug}`} // Changed 'to' to 'href'
      ref={cardRef}
      className={`group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 flex flex-col items-start transform transition-all duration-500 ease-out border border-slate-100 overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 mb-6 p-4 rounded-2xl bg-brand-surface text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
        <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
          {service.icon}
        </div>
      </div>

      <h3 className="relative z-10 text-2xl font-heading font-bold mb-3 text-brand-dark group-hover:text-brand-accent transition-colors">{service.title}</h3>
      <p className="relative z-10 text-slate-600 flex-grow leading-relaxed font-sans mb-6">{service.description}</p>

      <span className="relative z-10 inline-flex items-center text-brand-accent font-semibold group-hover:translate-x-2 transition-transform duration-300">
        Learn More <ArrowRight size={16} className="ml-2" />
      </span>
    </Link>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-brand-accent font-bold tracking-wider uppercase text-sm mb-2 block font-heading">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-6">Comprehensive Home Services</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
            One call to solve it all. We offer a wide range of professional services to keep your property in pristine condition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;