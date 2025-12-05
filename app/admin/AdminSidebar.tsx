'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LogOut, BarChart3 } from 'lucide-react';

interface SidebarProps {
    user: {
        email?: string | null;
        name?: string | null;
    };
}

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/leads', label: 'Leads', icon: Users },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ user }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-gradient-to-b from-[#12121a] to-[#0a0a0f] border-r border-white/5 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
                        T
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-white">Tidy & Fix</h1>
                        <p className="text-xs text-gray-500">Admin Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white'
                                    : 'text-gray-400 hover:bg-white/5'
                                }`}
                        >
                            <Icon size={20} className={isActive ? 'text-blue-400' : ''} />
                            <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center font-bold text-white">
                        {user.email?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user.name || 'Admin'}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                </div>
                <Link
                    href="/api/auth/signout"
                    className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </Link>
            </div>
        </aside>
    );
}
