import React from 'react';
import { ShieldCheck, Clock, Award, CheckCircle } from 'lucide-react';

const TrustBadges: React.FC = () => {
    const badges = [
        {
            icon: ShieldCheck,
            title: 'Licensed & Insured',
            description: 'Fully certified professionals'
        },
        {
            icon: Award,
            title: 'Satisfaction Guaranteed',
            description: '100% money-back guarantee'
        },
        {
            icon: Clock,
            title: '2-Hour Response',
            description: 'Fast quote turnaround'
        },
        {
            icon: CheckCircle,
            title: 'Background Checked',
            description: 'Trusted & verified team'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {badges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    >
                        <div className="bg-blue-100 p-3 rounded-full mb-3">
                            <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-heading font-bold text-sm text-slate-900 mb-1">
                            {badge.title}
                        </h3>
                        <p className="text-xs text-slate-600">
                            {badge.description}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default TrustBadges;
