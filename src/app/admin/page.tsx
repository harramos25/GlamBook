"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, CalendarCheck, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const data = [
    { name: 'Mon', revenue: 1200 },
    { name: 'Tue', revenue: 1800 },
    { name: 'Wed', revenue: 1400 },
    { name: 'Thu', revenue: 2200 },
    { name: 'Fri', revenue: 3500 },
    { name: 'Sat', revenue: 4200 },
    { name: 'Sun', revenue: 3100 },
];

const AdminDashboard = () => {
    return (
        <div className="p-8 space-y-8">

            {/* Header */}
            <div className="flex justify-between items-center bg-white/40 p-6 rounded-2xl border border-white/60">
                <div>
                    <h1 className="text-3xl font-serif text-midnight">Dashboard</h1>
                    <p className="text-charcoal/60">Welcome back, Boss.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-charcoal/50 uppercase tracking-widest font-mono">Today's Revenue</p>
                    <p className="text-3xl font-mono font-bold text-midnight">$1,240.00</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard
                    title="Total Bookings"
                    value="124"
                    change="+12%"
                    icon={CalendarCheck}
                    color="text-rose"
                />
                <KPICard
                    title="Active Clients"
                    value="1,204"
                    change="+5%"
                    icon={Users}
                    color="text-gold"
                />
                <KPICard
                    title="Avg. Ticket"
                    value="$85.00"
                    change="+2%"
                    icon={DollarSign}
                    color="text-midnight"
                />
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white/80 border border-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-medium text-midnight mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-rose" />
                        Weekly Revenue
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E7A6B0" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#E7A6B0" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#2B0F2F',
                                        borderRadius: '12px',
                                        border: 'none',
                                        color: '#F8F3F1'
                                    }}
                                    itemStyle={{ color: '#F5C77A' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#2B0F2F"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Today's Schedule Preview */}
                <div className="bg-midnight text-ivory p-6 rounded-2xl shadow-xl shadow-midnight/20">
                    <h3 className="text-lg font-medium mb-6">Up Next</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4 items-center p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                <div className="text-center w-12">
                                    <span className="block text-xs text-ivory/40 uppercase">PM</span>
                                    <span className="block text-xl font-mono font-bold text-gold">0{i}:00</span>
                                </div>
                                <div className="flex-1 border-l border-white/10 pl-4">
                                    <p className="font-serif text-lg">Sarah J.</p>
                                    <p className="text-sm text-ivory/60">Silk Press & Style</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-rose group-hover:shadow-[0_0_10px_var(--color-rose)] transition-shadow"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

interface KPICardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ElementType;
    color: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon: Icon, color }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-midnight/5 hover:border-midnight/10 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl bg-ivory", color)}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">{change}</span>
            </div>
            <p className="text-charcoal/50 text-sm uppercase tracking-wider font-mono mb-1">{title}</p>
            <h4 className="text-3xl font-bold text-midnight font-mono">{value}</h4>
        </div>
    );
};

export default AdminDashboard;
