'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import TrustBadges from './TrustBadges';
import { createLead } from '@/actions/leads';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    service: '',
    message: '',
    requestCallback: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    const name = target.name;

    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      service: formData.service,
      message: formData.message,
      source: 'CONTACT_FORM',
      details: { requestCallback: formData.requestCallback }
    });

    if (result.success) {
      alert('Thank you for your message! We will get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', location: '', service: '', message: '', requestCallback: false });
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">Get Your Free Quote Today</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-2">We'll contact you within 2 hours with a detailed quote. No obligation, no hassle.</p>
          <p className="text-sm text-blue-600 font-semibold">⚡ 2-Hour Response Guarantee | 🛡️ 100% Satisfaction Guaranteed</p>
        </div>

        {/* Trust Badges */}
        <div className="mb-12">
          <TrustBadges />
        </div>

        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-800 mb-2">Name</label>
                <input type="text" name="name" id="name" required className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all" placeholder="Your name" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-800 mb-2">Email</label>
                <input type="email" name="email" id="email" required className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-800 mb-2">Phone</label>
                <input type="tel" name="phone" id="phone" className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all" placeholder="(984) 212-4247" value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-slate-800 mb-2">Location (City)</label>
                <input type="text" name="location" id="location" placeholder="e.g., Raleigh" required className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all" value={formData.location} onChange={handleChange} />
              </div>
            </div>
            <div>
              <label htmlFor="service" className="block text-sm font-semibold text-slate-800 mb-2">Service Requested</label>
              <select id="service" name="service" required className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all" value={formData.service} onChange={handleChange}>
                <option value="">Select a service</option>
                <option>Residential Cleaning</option>
                <option>Commercial Cleaning</option>
                <option>Handyman Services</option>
                <option>Drywall, Sheetrock & Painting</option>
                <option>Eco-Friendly Cleaning</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-800 mb-2">Message</label>
              <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 bg-white/60 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all resize-none" placeholder="Tell us about your project..." value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="flex items-center p-4 bg-blue-50/50 rounded-lg border border-blue-200/50">
              <input
                id="requestCallback"
                name="requestCallback"
                type="checkbox"
                checked={formData.requestCallback}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded cursor-pointer"
              />
              <label htmlFor="requestCallback" className="ml-3 block text-sm font-medium text-slate-700 cursor-pointer">
                I'd prefer a callback instead of an email response.
              </label>
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
