'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, Star, Clock } from 'lucide-react';

interface StatProps {
    icon: React.ElementType;
    value: number;
    suffix: string;
    label: string;
}

const StatItem: React.FC<StatProps> = ({ icon: Icon, value, suffix, label }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const duration = 2000; // 2 seconds
                    const steps = 60;
                    const increment = value / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            setCount(value);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);

                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [value, hasAnimated]);

    return (
        <div ref={ref} className="flex flex-col items-center text-center p-6">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Icon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-sm md:text-base text-slate-600 font-medium">
                {label}
            </div>
        </div>
    );
};

const StatsBar: React.FC = () => {
    const stats = [
        {
            icon: TrendingUp,
            value: 1000,
            suffix: '+',
            label: 'Projects Completed'
        },
        {
            icon: Users,
            value: 5,
            suffix: '+',
            label: 'Years Experience'
        },
        {
            icon: Star,
            value: 4.9,
            suffix: '★',
            label: 'Average Rating'
        },
        {
            icon: Clock,
            value: 2,
            suffix: 'hr',
            label: 'Response Time'
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-blue-50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {stats.map((stat, index) => (
                        <StatItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
