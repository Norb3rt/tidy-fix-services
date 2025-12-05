import React from 'react';
import { Phone, Mail, Clock, Star } from 'lucide-react';

interface FunnelSidebarProps {
  data: {
    service: any;
    location: any;
    details: { frequency: string; squareFeet: string; specialRequests: string };
  };
  currentStep: string;
}

const FunnelSidebar: React.FC<FunnelSidebarProps> = ({ data, currentStep }) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Current Selection */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 sticky top-24">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Your Selection</h3>

        {data.service && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-600 uppercase font-bold mb-1">Service</p>
            <p className="font-semibold text-gray-900">{data.service.title}</p>
          </div>
        )}

        {data.location && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-600 uppercase font-bold mb-1">Location</p>
            <p className="font-semibold text-gray-900">{data.location.name}</p>
          </div>
        )}

        {data.details.frequency && (
          <div className="mb-4 pb-4 border-b border-gray-200">
            <p className="text-xs text-gray-600 uppercase font-bold mb-1">Frequency</p>
            <p className="font-semibold text-gray-900">{data.details.frequency}</p>
          </div>
        )}

        {data.details.squareFeet && (
          <div>
            <p className="text-xs text-gray-600 uppercase font-bold mb-1">Size</p>
            <p className="font-semibold text-gray-900">{data.details.squareFeet}</p>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <h3 className="font-bold text-lg mb-4">Need Help?</h3>

        <div className="space-y-4">
          <a
            href="tel:+19842124247"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <Phone className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-xs opacity-90">Call us</p>
              <p className="font-bold">(984) 212-4247</p>
            </div>
          </a>

          <a
            href="mailto:info@tidyandfix.com"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <Mail className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-xs opacity-90">Email us</p>
              <p className="font-bold">info@tidyandfix.com</p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-xs opacity-90">Available</p>
              <p className="font-bold">Mon-Sat, 8am-6pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Why Trust Us?</h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">4.9★ Rating</p>
              <p className="text-xs text-gray-600">500+ reviews</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Licensed & Insured</p>
              <p className="text-xs text-gray-600">Full coverage</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Background Checked</p>
              <p className="text-xs text-gray-600">Safe & reliable</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Eco-Friendly</p>
              <p className="text-xs text-gray-600">Green products</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Quick Links */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Links</h3>
        <div className="space-y-2">
          <a href="/#services" className="block text-blue-600 hover:text-blue-700 font-semibold text-sm">
            → View All Services
          </a>
          <a href="/#testimonials" className="block text-blue-600 hover:text-blue-700 font-semibold text-sm">
            → Read Reviews
          </a>
          <a href="/#faq" className="block text-blue-600 hover:text-blue-700 font-semibold text-sm">
            → FAQ
          </a>
          <a href="/#contact" className="block text-blue-600 hover:text-blue-700 font-semibold text-sm">
            → Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FunnelSidebar;

