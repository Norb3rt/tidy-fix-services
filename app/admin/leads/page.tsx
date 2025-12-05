import { getLeads } from '@/actions/leads';
import LeadStatusSelect from '../dashboard/LeadStatusSelect';
import { Users, Mail, Phone, MapPin, Calendar, Search } from 'lucide-react';

export default async function LeadsPage() {
    const { leads, error } = await getLeads();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Leads
                    </h1>
                    <p className="text-gray-500 mt-1">All your captured leads in one place</p>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 w-64"
                    />
                </div>
            </div>

            {/* Leads Grid */}
            <div className="grid gap-4">
                {leads?.map((lead) => (
                    <div key={lead.id} className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6 hover:border-white/10 transition-all">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                                    {lead.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-lg">{lead.name}</h3>
                                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <Mail size={14} />
                                            {lead.email}
                                        </span>
                                        {lead.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone size={14} />
                                                {lead.phone}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <LeadStatusSelect id={lead.id} initialStatus={lead.status} />
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${lead.source === 'QUOTE_FUNNEL'
                                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    }`}>
                                    {lead.source === 'QUOTE_FUNNEL' ? 'Funnel' : 'Contact'}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-6 text-sm text-gray-400">
                            {lead.service && (
                                <span>🛠️ {lead.service}</span>
                            )}
                            {lead.location && (
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {lead.location}
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        {lead.message && (
                            <p className="mt-3 text-gray-500 text-sm bg-white/5 rounded-lg p-3">
                                "{lead.message}"
                            </p>
                        )}
                    </div>
                ))}

                {leads?.length === 0 && (
                    <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Users size={32} className="text-gray-600" />
                        </div>
                        <p className="text-gray-400 font-medium">No leads yet</p>
                        <p className="text-gray-600 text-sm mt-1">Leads will appear here when customers submit forms</p>
                    </div>
                )}
            </div>
        </div>
    );
}
