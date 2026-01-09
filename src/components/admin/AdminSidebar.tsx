"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const NAV_ITEMS = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Schedule', icon: Calendar, href: '/admin/calendar' },
    { name: 'Staff & Clients', icon: Users, href: '/admin/staff' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-midnight text-ivory flex flex-col z-50">
            {/* Header */}
            <div className="p-8">
                <h1 className="text-2xl font-serif tracking-tight">GlamBook <span className="text-rose text-xs font-sans tracking-widest uppercase block mt-1">Admin</span></h1>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-white/10 text-ivory border-l-2 border-rose shadow-inner"
                                    : "text-ivory/60 hover:bg-white/5 hover:text-ivory"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-rose" : "text-ivory/50 group-hover:text-ivory")} />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-white/10">
                <button className="flex items-center gap-3 text-ivory/50 hover:text-rose transition-colors w-full">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
