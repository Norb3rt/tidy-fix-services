import React from 'react';
import InteractiveMap from './InteractiveMapClient';

const ServiceAreas: React.FC = () => {
  return (
    <section id="areas" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Proudly Serving the Triangle Area</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We're your local experts, providing top-quality maintenance services right where you live. Click on a marker to explore services in your city.
          </p>
        </div>
        <InteractiveMap />
      </div>
    </section>
  );
};

export default ServiceAreas;