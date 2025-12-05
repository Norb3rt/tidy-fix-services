import React from 'react';
import { servicesData } from '../../data';
import { ArrowRight } from 'lucide-react';

interface FunnelStep1ServicesProps {
  onSelect: (service: typeof servicesData[0]) => void;
}

const FunnelStep1Services: React.FC<FunnelStep1ServicesProps> = ({ onSelect }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What service do you need?</h2>
        <p className="text-gray-600 text-lg">Select the service that best matches your needs</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {servicesData.map((service) => (
          <button
            key={service.slug}
            onClick={() => onSelect(service)}
            className="group bg-white rounded-xl p-6 shadow-md border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0 mt-1">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.details.slice(0, 2).map((detail, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        {detail.split(':')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-3">Not sure which service you need?</h4>
        <p className="text-gray-700 mb-4">
          Our team can help you figure out the best solution. Call us at <span className="font-bold text-blue-600">(919) 555-1234</span> for a quick consultation.
        </p>
      </div>
    </div>
  );
};

export default FunnelStep1Services;

