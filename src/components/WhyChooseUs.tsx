import React from 'react';
import type { Benefit } from '../types';

const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PriceTagIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 8v-5z" /></svg>;

const benefitsData: Benefit[] = [
    { icon: <ClockIcon />, title: '24/7 Support', description: 'Have a question or an emergency? Our team is always here to help you, day or night.' },
    { icon: <UserGroupIcon />, title: '500+ Happy Clients', description: 'Join our growing family of satisfied homeowners and businesses across the Triangle.' },
    { icon: <CalendarIcon />, title: 'Flexible Scheduling', description: 'We work around your busy schedule to find a time that\'s convenient for you.' },
    { icon: <PriceTagIcon />, title: 'Transparent Pricing', description: 'No hidden fees. You\'ll receive a clear, upfront quote before we begin any work.' },
];

const WhyChooseUs: React.FC = () => {
    return (
        <section className="relative py-24 bg-slate-900 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl"></div>
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-screen filter blur-3xl"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            The Tidy & Fix <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Difference</span>
                        </h2>
                        <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                            We're committed to providing an exceptional service experience from start to finish. Our focus on reliability, quality, and customer satisfaction sets us apart.
                        </p>
                        <div className="space-y-6">
                            {benefitsData.map((benefit, index) => (
                                <div key={index} className="group flex items-start hover:translate-x-2 transition-transform duration-300">
                                    <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white mr-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-900/20">
                                        {benefit.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{benefit.title}</h3>
                                        <p className="text-slate-400 leading-relaxed">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-80 md:h-[600px] rounded-3xl overflow-hidden group shadow-2xl shadow-blue-900/20">
                        <img
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                            alt="Modern clean living room"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;