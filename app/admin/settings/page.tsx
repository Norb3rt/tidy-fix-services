import { auth } from '@/auth';
import { User, Mail, Shield, Key, Bell, Palette } from 'lucide-react';

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Settings
                </h1>
                <p className="text-gray-500 mt-1">Manage your account and preferences</p>
            </div>

            <div className="grid gap-6">
                {/* Profile Section */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="text-blue-400" size={24} />
                        <h2 className="text-lg font-semibold text-white">Profile</h2>
                    </div>

                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                defaultValue={session?.user?.name || 'Admin User'}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                defaultValue={session?.user?.email || ''}
                                disabled
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 cursor-not-allowed"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="text-emerald-400" size={24} />
                        <h2 className="text-lg font-semibold text-white">Security</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Key className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-white font-medium">Password</p>
                                    <p className="text-sm text-gray-500">Last changed: Never</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors">
                                Change
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="text-amber-400" size={24} />
                        <h2 className="text-lg font-semibold text-white">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div>
                                <p className="text-white font-medium">Email notifications</p>
                                <p className="text-sm text-gray-500">Receive emails for new leads</p>
                            </div>
                            <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16162a] border border-white/5 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Palette className="text-purple-400" size={24} />
                        <h2 className="text-lg font-semibold text-white">Appearance</h2>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 p-4 bg-[#0a0a0f] border-2 border-blue-500 rounded-xl cursor-pointer">
                            <div className="w-full h-8 bg-[#1a1a2e] rounded mb-2" />
                            <p className="text-white text-sm font-medium">Dark</p>
                        </div>
                        <div className="flex-1 p-4 bg-gray-100 border-2 border-transparent rounded-xl cursor-pointer opacity-50">
                            <div className="w-full h-8 bg-white rounded mb-2" />
                            <p className="text-gray-900 text-sm font-medium">Light</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
