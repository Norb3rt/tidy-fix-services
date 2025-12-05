import { prisma } from '@/lib/prisma';
import { BarChart3, TrendingUp, Users, Calendar, Target, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Lead } from '@prisma/client';

async function getAnalyticsData() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
    });

    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);    // This month's leads
    const thisMonthLeads = leads.filter((l: Lead) => new Date(l.createdAt) >= thisMonth);
    const lastMonthLeads = leads.filter((l: Lead) =>
        new Date(l.createdAt) >= lastMonth && new Date(l.createdAt) <= lastMonthEnd
    );

    // Calculate growth
    const growthRate = lastMonthLeads.length > 0
        ? ((thisMonthLeads.length - lastMonthLeads.length) / lastMonthLeads.length * 100).toFixed(1)
        : thisMonthLeads.length > 0 ? 100 : 0;    // Status breakdown
    const statusCounts = {
        NEW: leads.filter((l: Lead) => l.status === 'NEW').length,
        CONTACTED: leads.filter((l: Lead) => l.status === 'CONTACTED').length,
        CLOSED: leads.filter((l: Lead) => l.status === 'CLOSED').length,
    };

    // Conversion rate (closed / total)
    const conversionRate = leads.length > 0
        ? ((statusCounts.CLOSED / leads.length) * 100).toFixed(1)
        : 0;    // Source breakdown
    const sourceCounts = {
        CONTACT_FORM: leads.filter((l: Lead) => l.source === 'CONTACT_FORM').length,
        QUOTE_FUNNEL: leads.filter((l: Lead) => l.source === 'QUOTE_FUNNEL').length,
    };

    // Leads by day (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
    });    const leadsByDay = last7Days.map(day => ({
        date: day,
        count: leads.filter((l: Lead) => l.createdAt.toISOString().split('T')[0] === day).length,
    }));    // Top services
    const serviceMap = new Map<string, number>();
    leads.forEach((l: Lead) => {
        if (l.service) {
            serviceMap.set(l.service, (serviceMap.get(l.service) || 0) + 1);
        }
    });
    const topServices = Array.from(serviceMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return {
        totalLeads: leads.length,
        thisMonthLeads: thisMonthLeads.length,
        lastMonthLeads: lastMonthLeads.length,
        growthRate: Number(growthRate),
        statusCounts,
        conversionRate: Number(conversionRate),
        sourceCounts,
        leadsByDay,
        topServices,
    };
}

export default async function AnalyticsPage() {
    const data = await getAnalyticsData();

    const maxDayCount = Math.max(...data.leadsByDay.map(d => d.count), 1);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Analytics
                </h1>
                <p className="text-gray-500 mt-1">Track your lead generation performance</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Leads */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Users className="text-blue-400" size={24} />
                        </div>
                        <span className={`flex items-center gap-1 text-sm ${data.growthRate >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {data.growthRate >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            {Math.abs(data.growthRate)}%
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">Total Leads</p>
                    <p className="text-3xl font-bold text-white mt-1">{data.totalLeads}</p>
                </div>

                {/* This Month */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Calendar className="text-emerald-400" size={24} />
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">This Month</p>
                    <p className="text-3xl font-bold text-white mt-1">{data.thisMonthLeads}</p>
                </div>

                {/* Conversion Rate */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <Target className="text-purple-400" size={24} />
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">Conversion Rate</p>
                    <p className="text-3xl font-bold text-white mt-1">{data.conversionRate}%</p>
                </div>

                {/* Funnel vs Contact */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                            <Percent className="text-amber-400" size={24} />
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">Funnel Leads</p>
                    <p className="text-3xl font-bold text-white mt-1">
                        {data.totalLeads > 0 ? ((data.sourceCounts.QUOTE_FUNNEL / data.totalLeads) * 100).toFixed(0) : 0}%
                    </p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Leads Over Time */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <BarChart3 className="text-blue-400" size={24} />
                        <h3 className="text-lg font-semibold text-white">Leads (Last 7 Days)</h3>
                    </div>
                    <div className="flex items-end justify-between gap-2 h-48">
                        {data.leadsByDay.map((day, i) => (
                            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                                    style={{ height: `${(day.count / maxDayCount) * 100}%`, minHeight: day.count > 0 ? '20px' : '4px' }}
                                />
                                <span className="text-xs text-gray-500">
                                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Breakdown */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="text-emerald-400" size={24} />
                        <h3 className="text-lg font-semibold text-white">Lead Status</h3>
                    </div>
                    <div className="space-y-4">
                        {/* New */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">New</span>
                                <span className="text-emerald-400 font-medium">{data.statusCounts.NEW}</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                                    style={{ width: `${data.totalLeads > 0 ? (data.statusCounts.NEW / data.totalLeads) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        {/* Contacted */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Contacted</span>
                                <span className="text-amber-400 font-medium">{data.statusCounts.CONTACTED}</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                                    style={{ width: `${data.totalLeads > 0 ? (data.statusCounts.CONTACTED / data.totalLeads) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                        {/* Closed */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-400">Closed</span>
                                <span className="text-purple-400 font-medium">{data.statusCounts.CLOSED}</span>
                            </div>
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                                    style={{ width: `${data.totalLeads > 0 ? (data.statusCounts.CLOSED / data.totalLeads) * 100 : 0}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lead Sources */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Lead Sources</h3>
                    <div className="flex gap-6">
                        <div className="flex-1 text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <p className="text-3xl font-bold text-blue-400">{data.sourceCounts.CONTACT_FORM}</p>
                            <p className="text-sm text-gray-400 mt-1">Contact Form</p>
                        </div>
                        <div className="flex-1 text-center p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <p className="text-3xl font-bold text-purple-400">{data.sourceCounts.QUOTE_FUNNEL}</p>
                            <p className="text-sm text-gray-400 mt-1">Quote Funnel</p>
                        </div>
                    </div>
                </div>

                {/* Top Services */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Top Services</h3>
                    {data.topServices.length > 0 ? (
                        <div className="space-y-3">
                            {data.topServices.map(([service, count], i) => (
                                <div key={service} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                                            {i + 1}
                                        </span>
                                        <span className="text-gray-300">{service}</span>
                                    </div>
                                    <span className="text-gray-500">{count} leads</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-4">No service data yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
