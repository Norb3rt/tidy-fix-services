'use client';

import React, { useState, useMemo } from 'react';
import { galleryData, servicesData } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery: React.FC = () => {
  const categories = useMemo(() => {
    const serviceSlugsInGallery = [...new Set(galleryData.map(item => item.serviceSlug))];
    return servicesData.filter(service => serviceSlugsInGallery.includes(service.slug));
  }, []);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return galleryData;
    return galleryData.filter(item => item.serviceSlug === activeTab);
  }, [activeTab]);

  return (
    <section id="gallery" className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wider uppercase mb-4">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Work in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Action</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            Explore a curated selection of our finest transformations. From subtle refinements to complete overhauls.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 border ${activeTab === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
          >
            All Projects
          </button>
          {categories.map(category => (
            <button
              key={category.slug}
              onClick={() => setActiveTab(category.slug)}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 border ${activeTab === category.slug
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.title + index}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Main Image (After) */}
                <img
                  src={item.after}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                        {servicesData.find(s => s.slug === item.serviceSlug)?.title || 'Service'}
                      </span>
                      {item.location && (
                        <span className="flex items-center text-slate-300 text-xs font-medium">
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {item.location}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                    <p className="text-slate-300 text-sm line-clamp-2 mb-4 font-light">{item.description}</p>

                    <div className="flex items-center gap-3">

                    </div>
                  </div>
                </div>

                {/* Before Label (If exists) */}
                {item.before && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Before & After
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <a href="/quote" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/30 ring-offset-2 focus:ring-2 ring-slate-900">
            Start Your Project
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;