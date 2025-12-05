import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { servicesData } from '../../data';

interface FunnelStep3DetailsProps {
  onSubmit: (details: { frequency: string; squareFeet: string; specialRequests: string }) => void;
  onBack: () => void;
  service: typeof servicesData[0] | null;
}

const FunnelStep3Details: React.FC<FunnelStep3DetailsProps> = ({ onSubmit, onBack, service }) => {
  const [frequency, setFrequency] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!frequency) newErrors.frequency = 'Please select a frequency';
    if (!squareFeet) newErrors.squareFeet = 'Please select a size';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ frequency, squareFeet, specialRequests });
  };

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
          <h2 className="text-3xl font-bold text-gray-900">Tell us more details</h2>
          <p className="text-gray-600 text-lg">Help us provide an accurate quote</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Frequency */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-4">How often do you need this service?</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['One-time', 'Weekly', 'Bi-weekly', 'Monthly'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setFrequency(option);
                  setErrors(prev => ({ ...prev, frequency: '' }));
                }}
                className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                  frequency === option
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.frequency && <p className="text-red-600 text-sm mt-2">{errors.frequency}</p>}
        </div>

        {/* Square Feet */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-4">What's the size of your space?</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['Under 1,000 sq ft', '1,000 - 2,500 sq ft', '2,500 - 5,000 sq ft', 'Over 5,000 sq ft'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSquareFeet(option);
                  setErrors(prev => ({ ...prev, squareFeet: '' }));
                }}
                className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                  squareFeet === option
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.squareFeet && <p className="text-red-600 text-sm mt-2">{errors.squareFeet}</p>}
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">Any special requests or notes?</label>
          <textarea
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            placeholder="E.g., 'Allergic to certain chemicals', 'Need eco-friendly products', 'Specific areas to focus on', etc."
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none resize-none"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Continue to Review →
        </button>
      </form>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-2">💡 Tip</h4>
        <p className="text-gray-700">
          The more details you provide, the more accurate your quote will be. We'll use this information to give you the best estimate.
        </p>
      </div>
    </div>
  );
};

export default FunnelStep3Details;

