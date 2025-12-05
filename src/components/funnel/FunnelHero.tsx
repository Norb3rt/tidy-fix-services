import React from 'react';
import { CheckCircle, Zap, Award, Clock } from 'lucide-react';

interface FunnelHeroProps {
  onStart: () => void;
}

const FunnelHero: React.FC<FunnelHeroProps> = ({ onStart }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white text-center shadow-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get Your Free Quote in 2 Minutes
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Tell us what you need, and we'll provide an instant estimate. No hidden fees, no surprises.
        </p>
        <div className="flex justify-center w-full">
          <button
            onClick={onStart}
            className="group bg-white text-blue-600 font-bold py-4 px-12 rounded-full text-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <span>Start Your Free Quote</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Instant Quote</h3>
              <p className="text-gray-600">Get an accurate estimate immediately based on your specific needs.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Fast Service</h3>
              <p className="text-gray-600">Same-day or next-day appointments available in your area.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">All our professionals are fully licensed, insured, and background-checked.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <Clock className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">Choose the date and time that works best for you.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Tidy & Fix?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9★</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelHero;

