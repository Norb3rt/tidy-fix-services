'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';
import type { Service, Area } from '@/types';
import FunnelHero from '@/components/funnel/FunnelHero';
import FunnelStep1Services from '@/components/funnel/FunnelStep1Services';
import FunnelStep2Location from '@/components/funnel/FunnelStep2Location';
import FunnelStep3Details from '@/components/funnel/FunnelStep3Details';
import FunnelStep4Review from '@/components/funnel/FunnelStep4Review';
import FunnelSidebar from '@/components/funnel/FunnelSidebar';

interface FormData {
    service: Service | null;
    location: Area | null;
    frequency: string;
    squareFeet: string;
    specialRequests: string;
    name: string;
    email: string;
    phone: string;
}

export default function QuotePage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        service: null,
        location: null,
        frequency: '',
        squareFeet: '',
        specialRequests: '',
        name: '',
        email: '',
        phone: '',
    });

    const handleServiceSelect = (service: Service) => {
        setFormData({ ...formData, service });
        setCurrentStep(2);
    };

    const handleLocationSelect = (location: Area) => {
        setFormData({ ...formData, location });
        setCurrentStep(3);
    };

    const handleDetailsSubmit = (details: { frequency: string; squareFeet: string; specialRequests: string }) => {
        setFormData({ ...formData, ...details });
        setCurrentStep(4);
    };

    const handleBackStep = () => {
        setCurrentStep(Math.max(0, currentStep - 1));
    };

    const handleReset = () => {
        setFormData({
            service: null,
            location: null,
            frequency: '',
            squareFeet: '',
            specialRequests: '',
            name: '',
            email: '',
            phone: '',
        });
        setCurrentStep(0);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <FunnelHero onStart={() => setCurrentStep(1)} />;
            case 1:
                return <FunnelStep1Services onSelect={handleServiceSelect} />;
            case 2:
                return <FunnelStep2Location onSelect={handleLocationSelect} onBack={handleBackStep} />;
            case 3:
                return (
                    <FunnelStep3Details
                        onSubmit={handleDetailsSubmit}
                        onBack={handleBackStep}
                        service={formData.service}
                    />
                );
            case 4:
                return (
                    <FunnelStep4Review
                        data={{
                            service: formData.service,
                            location: formData.location,
                            details: {
                                frequency: formData.frequency,
                                squareFeet: formData.squareFeet,
                                specialRequests: formData.specialRequests,
                            },
                        }}
                        onBack={handleBackStep}
                        onReset={handleReset}
                    />
                );
            default:
                return <FunnelHero onStart={() => setCurrentStep(1)} />;
        }
    };

    const showSidebar = currentStep > 0 && currentStep < 5;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
            {/* Progress Bar */}
            {currentStep > 0 && currentStep < 5 && (
                <div className="sticky top-0 z-50 bg-white shadow-md mb-8">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-600">
                                Step {currentStep} of 4
                            </span>
                            <span className="text-sm text-gray-500">
                                {currentStep === 1 && 'Select Service'}
                                {currentStep === 2 && 'Choose Location'}
                                {currentStep === 3 && 'Add Details'}
                                {currentStep === 4 && 'Review & Submit'}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${((currentStep / 4) * 100).toString()}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto px-6">
                <div className={`grid ${showSidebar ? 'lg:grid-cols-[1fr_300px]' : 'grid-cols-1'} gap-8`}>
                    <div>{renderStep()}</div>
                    {showSidebar && (
                        <FunnelSidebar
                            data={{
                                service: formData.service,
                                location: formData.location,
                                details: {
                                    frequency: formData.frequency,
                                    squareFeet: formData.squareFeet,
                                    specialRequests: formData.specialRequests,
                                },
                            }}
                            currentStep={currentStep.toString()}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
