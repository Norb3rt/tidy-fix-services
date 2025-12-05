'use client';

import { useState } from 'react';
import { updateLeadStatus } from '@/actions/leads';
import { ChevronDown, Sparkles, Phone, CheckCircle } from 'lucide-react';

const statusConfig = {
    NEW: {
        label: 'New',
        icon: Sparkles,
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        text: 'text-emerald-300',
        iconColor: 'text-emerald-400',
    },
    CONTACTED: {
        label: 'Contacted',
        icon: Phone,
        bg: 'bg-amber-500/20',
        border: 'border-amber-500/30',
        text: 'text-amber-300',
        iconColor: 'text-amber-400',
    },
    CLOSED: {
        label: 'Closed',
        icon: CheckCircle,
        bg: 'bg-gray-500/20',
        border: 'border-gray-500/30',
        text: 'text-gray-300',
        iconColor: 'text-gray-400',
    },
};

export default function LeadStatusSelect({
    id,
    initialStatus
}: {
    id: string;
    initialStatus: string
}) {
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = async (newStatus: string) => {
        setStatus(newStatus);
        setIsOpen(false);
        setLoading(true);

        try {
            await updateLeadStatus(id, newStatus);
        } catch (error) {
            console.error('Failed to update status', error);
            setStatus(status);
        } finally {
            setLoading(false);
        }
    };

    const currentConfig = statusConfig[status as keyof typeof statusConfig] || statusConfig.NEW;
    const Icon = currentConfig.icon;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={loading}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${currentConfig.bg} ${currentConfig.border} ${currentConfig.text} text-xs font-medium transition-all hover:scale-105 disabled:opacity-50`}
            >
                <Icon size={14} className={currentConfig.iconColor} />
                <span>{currentConfig.label}</span>
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 z-20 w-40 rounded-xl bg-[#1a1a2e] border border-white/10 shadow-xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {Object.entries(statusConfig).map(([key, config]) => {
                            const StatusIcon = config.icon;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleChange(key)}
                                    className={`w-full flex items-center gap-2 px-4 py-3 text-left text-sm transition-colors hover:bg-white/5 ${status === key ? 'bg-white/10' : ''
                                        }`}
                                >
                                    <StatusIcon size={16} className={config.iconColor} />
                                    <span className={config.text}>{config.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
