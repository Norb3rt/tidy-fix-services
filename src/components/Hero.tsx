import React from 'react';
import { Star, ShieldCheck, Phone } from 'lucide-react';
import HashLink from './HashLink';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&h=1080&fit=crop"
          alt="Professional cleaning and handyman services in Raleigh-Durham"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/60 mix-blend-multiply" />
      </div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/30 rounded-full mix-blend-screen filter blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Glass Card Container */}
          <div className="backdrop-blur-md bg-brand-dark/30 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto animate-fadeIn">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-fadeIn">
              <span className="flex text-yellow-400">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </span>
              <span>4.9★ Rated | Licensed & Insured</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              Professional Cleaning, Handyman & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Drywall Services
              </span>
            </h1>

            <p className="font-sans text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 leading-relaxed">
              Serving Raleigh-Durham with quality workmanship and guaranteed satisfaction. Get your free quote today!
            </p>

            {/* Phone Number */}
            <a
              href="tel:+19842124247"
              className="inline-flex items-center gap-2 text-white text-xl md:text-2xl font-bold mb-8 hover:text-blue-300 transition-colors"
            >
              <Phone className="w-6 h-6" />
              (984) 212-4247
            </a>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/quote"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-brand-accent font-heading rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Get Your Free Quote
                <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </a>

              <HashLink
                to="#services"
                className="inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-sm font-heading"
              >
                Explore Services
              </HashLink>
            </div>

            {/* Guarantee Text */}
            <p className="text-sm text-gray-300 mt-4">⚡ 2-Hour Response Guarantee | 🛡️ 100% Satisfaction Guaranteed</p>
          </div>

          {/* Floating Stats/Trust Elements - Desktop Only */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-10 animate-float" style={{ animationDelay: '1s' }}>
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-sans uppercase tracking-wider">Verified</p>
                <p className="text-sm font-bold text-brand-dark font-heading">Fully Insured</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
