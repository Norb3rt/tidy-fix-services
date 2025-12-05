import React from 'react';
import { areasData } from '../../data';
import { MapPin, ChevronLeft } from 'lucide-react';

interface FunnelStep2LocationProps {
  onSelect: (location: typeof areasData[0]) => void;
  onBack: () => void;
}

const FunnelStep2Location: React.FC<FunnelStep2LocationProps> = ({ onSelect, onBack }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Where are you located?</h2>
          <p className="text-gray-600 text-lg">Select your city or area</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {areasData.map((area) => (
          <button
            key={area.slug}
            onClick={() => onSelect(area)}
            className="group bg-white rounded-xl p-6 shadow-md border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {area.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {area.description}
                </p>
                {area.neighborhoods && area.neighborhoods.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {area.neighborhoods.slice(0, 2).map((neighborhood) => (
                      <span key={neighborhood.slug} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {neighborhood.name}
                      </span>
                    ))}
                    {area.neighborhoods.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{area.neighborhoods.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Service Area Info */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-2">📍 We Serve the Entire Triangle Area</h4>
        <p className="text-gray-700">
          Raleigh, Durham, Chapel Hill, Cary, Apex, Morrisville, and surrounding neighborhoods. If you don't see your area, contact us anyway—we may be able to help!
        </p>
      </div>
    </div>
  );
};

export default FunnelStep2Location;

