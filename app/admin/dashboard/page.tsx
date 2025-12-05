import { getLeads } from '@/actions/leads';
import LeadStatusSelect from './LeadStatusSelect';
import { Users, TrendingUp, Clock, CheckCircle, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default async function DashboardPage() {
    const { leads, error } = await getLeads();

    if (error) {
        return <div className="text-red-400">Error loading leads: {error}</div>;
    }

    // Calculate metrics
    const totalLeads = leads?.length || 0;
    const newLeads = leads?.filter(l => l.status === 'NEW').length || 0;
    const contactedLeads = leads?.filter(l => l.status === 'CONTACTED').length || 0;
    const closedLeads = leads?.filter(l => l.status === 'CLOSED').length || 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Lead Management
                </h1>
                <p className="text-gray-500 mt-1">Track and manage your customer leads</p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Leads */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6 group hover:border-blue-500/30 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                            <Users className="text-blue-400" size={24} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Total Leads</p>
                        <p className="text-4xl font-bold mt-1 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                            {totalLeads}
                        </p>
                    </div>
                </div>

                {/* New Leads */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6 group hover:border-emerald-500/30 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all" />
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
                            <TrendingUp className="text-emerald-400" size={24} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">New Leads</p>
                        <p className="text-4xl font-bold mt-1 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                            {newLeads}
                        </p>
                    </div>
                </div>

                {/* Contacted */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6 group hover:border-amber-500/30 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                            <Clock className="text-amber-400" size={24} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Contacted</p>
                        <p className="text-4xl font-bold mt-1 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                            {contactedLeads}
                        </p>
                    </div>
                </div>

                {/* Closed */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6 group hover:border-purple-500/30 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                            <CheckCircle className="text-purple-400" size={24} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Closed</p>
                        <p className="text-4xl font-bold mt-1 bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                            {closedLeads}
                        </p>
                    </div>
                </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold">Recent Leads</h2>
                    <p className="text-gray-500 text-sm mt-1">All captured leads from your forms</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Lead</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Source</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {leads?.map((lead) => (
                                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                                                {lead.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{lead.name}</p>
                                                <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                                                    <Calendar size={12} />
                                                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                <Mail size={14} className="text-gray-500" />
                                                <span>{lead.email}</span>
                                            </div>
                                            {lead.phone && (
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <Phone size={14} className="text-gray-500" />
                                                    <span>{lead.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1">
                                            {lead.service && (
                                                <p className="text-sm text-gray-300">{lead.service}</p>
                                            )}
                                            {lead.location && (
                                                <div className="flex items-center gap-1 text-gray-500 text-xs">
                                                    <MapPin size={12} />
                                                    <span>{lead.location}</span>
                                                </div>
                                            )}
                                            {lead.message && (
                                                <p className="text-xs text-gray-500 truncate max-w-[200px]" title={lead.message}>
                                                    {lead.message}
                                                </p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <LeadStatusSelect id={lead.id} initialStatus={lead.status} />
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${lead.source === 'QUOTE_FUNNEL'
                                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                            }`}>
                                            {lead.source === 'QUOTE_FUNNEL' ? '🎯 Funnel' : '📧 Contact'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {leads?.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                                <Users size={32} className="text-gray-600" />
                                            </div>
                                            <p className="text-gray-400 font-medium">No leads yet</p>
                                            <p className="text-gray-600 text-sm mt-1">Leads will appear here when customers submit forms</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
