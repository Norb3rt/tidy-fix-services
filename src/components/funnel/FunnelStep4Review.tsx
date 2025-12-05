import React, { useState } from 'react';
import { ChevronLeft, CheckCircle, Mail, Phone } from 'lucide-react';
import { createLead } from '@/actions/leads';

interface FunnelStep4ReviewProps {
  data: {
    service: any;
    location: any;
    details: { frequency: string; squareFeet: string; specialRequests: string };
  };
  onBack: () => void;
  onReset: () => void;
}

const FunnelStep4Review: React.FC<FunnelStep4ReviewProps> = ({ data, onBack, onReset }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreeToTerms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit to database
    const result = await createLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: data.service?.title,
      location: data.location?.name,
      source: 'QUOTE_FUNNEL',
      details: {
        frequency: data.details.frequency,
        squareFeet: data.details.squareFeet,
        specialRequests: data.details.specialRequests,
        agreeToTerms: formData.agreeToTerms
      }
    });

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrors({ form: 'Failed to submit quote request. Please try again.' });
    }
  };

  if (submitted) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-12 text-center border-2 border-green-200">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quote Request Submitted!</h2>
          <p className="text-gray-700 text-lg mb-6">
            Thank you, {formData.name}! We've received your request and will contact you shortly.
          </p>
          <div className="bg-white rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Email:</span> {formData.email}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Phone:</span> {formData.phone}
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            We'll send you a detailed quote and available appointment times within 2 hours.
          </p>
          <button
            onClick={onReset}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all"
          >
            Get Another Quote
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">What happens next?</h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1.</span>
              <span>We review your request and prepare a detailed quote</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2.</span>
              <span>We contact you via email and phone with available times</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <span>You choose a convenient appointment time</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <span>Our team arrives and completes your service</span>
            </li>
          </ol>
        </div>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold text-gray-900">Review your quote request</h2>
          <p className="text-gray-600 text-lg">Confirm your details and submit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Your Request Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Service</p>
              <p className="font-bold text-gray-900">{data.service?.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-bold text-gray-900">{data.location?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Frequency</p>
              <p className="font-bold text-gray-900">{data.details.frequency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Size</p>
              <p className="font-bold text-gray-900">{data.details.squareFeet}</p>
            </div>
            {data.details.specialRequests && (
              <div>
                <p className="text-sm text-gray-600">Special Requests</p>
                <p className="font-bold text-gray-900">{data.details.specialRequests}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
                }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
                }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg focus:outline-none ${errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-blue-600'
                }`}
              placeholder="(984) 212-4247"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mt-1"
            />
            <label className="text-sm text-gray-700">
              I agree to receive updates and quotes from Tidy & Fix
            </label>
          </div>
          {errors.agreeToTerms && <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Submit Quote Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default FunnelStep4Review;

