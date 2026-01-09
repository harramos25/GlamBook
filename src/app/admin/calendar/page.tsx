"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STYLISTS } from '@/lib/data';

// Mock Appointments
const APPOINTMENTS = [
    { id: 1, stylistId: 'st1', client: 'Alice Freeman', service: 'Silk Press', startTime: 9, duration: 1.5, color: 'bg-rose/20 border-rose/50 text-rose-900' },
    { id: 2, stylistId: 'st1', client: 'Jasmine T.', service: 'Trim', startTime: 11, duration: 0.5, color: 'bg-gold/20 border-gold/50 text-yellow-900' },
    { id: 3, stylistId: 'st2', client: 'Mike Ross', service: 'Fade & Beard', startTime: 10, duration: 1, color: 'bg-blue-100 border-blue-300 text-blue-900' },
    { id: 4, stylistId: 'st3', client: 'Sarah Connor', service: 'Gel Mani', startTime: 9.5, duration: 1, color: 'bg-purple-100 border-purple-300 text-purple-900' },
];

const HOURS = Array.from({ length: 11 }, (_, i) => i + 9); // 9AM to 7PM

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="p-8 h-screen flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-serif text-midnight">Schedule</h1>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-midnight/10 shadow-sm">
                        <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-4 h-4" /></button>
                        <span className="text-sm font-medium font-mono min-w-[100px] text-center">
                            {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-midnight/10 rounded-xl text-sm font-medium hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        Filter Staff
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-midnight text-ivory rounded-xl text-sm font-medium hover:bg-rose hover:text-midnight transition-colors">
                        <CalendarIcon className="w-4 h-4" />
                        New Booking
                    </button>
                </div>
            </div>

            {/* Gantt Chart Container */}
            <div className="flex-1 bg-white border border-midnight/10 rounded-2xl shadow-sm overflow-hidden flex flex-col">

                {/* Time Header */}
                <div className="flex border-b border-midnight/5 bg-gray-50/50">
                    <div className="w-48 p-4 border-r border-midnight/5 shrink-0 font-medium text-sm text-charcoal/60">Staff Member</div>
                    <div className="flex-1 flex">
                        {HOURS.map(hour => (
                            <div key={hour} className="flex-1 border-r border-midnight/5 p-4 text-center">
                                <span className="text-xs font-mono text-charcoal/40">
                                    {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rows */}
                <div className="flex-1 overflow-y-auto">
                    {STYLISTS.filter(s => s.id !== 'any').map((stylist) => (
                        <div key={stylist.id} className="flex border-b border-midnight/5 min-h-[100px] relative group hover:bg-gray-50/50 transition-colors">
                            {/* Staff Column */}
                            <div className="w-48 p-4 border-r border-midnight/5 shrink-0 flex items-center gap-3">
                                <img src={stylist.image} alt={stylist.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                <div>
                                    <p className="font-medium text-sm text-midnight">{stylist.name}</p>
                                    <p className="text-xs text-charcoal/40">{stylist.role}</p>
                                </div>
                            </div>

                            {/* Timeline Grid Background */}
                            <div className="flex-1 relative">
                                <div className="absolute inset-0 flex pointer-events-none">
                                    {HOURS.map(hour => (
                                        <div key={hour} className="flex-1 border-r border-dashed border-midnight/5" />
                                    ))}
                                </div>

                                {/* Appointments */}
                                {APPOINTMENTS.filter(app => app.stylistId === stylist.id).map(app => {
                                    // Simple positioning logic assuming 9AM start
                                    // Each hour is 100% / 11 hours approx 9.09%
                                    // Start offset
                                    const startOffset = (app.startTime - 9) * (100 / 11);
                                    const width = app.duration * (100 / 11);

                                    return (
                                        <motion.div
                                            key={app.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={cn(
                                                "absolute top-2 bottom-2 rounded-lg border p-2 text-xs overflow-hidden cursor-pointer hover:shadow-md transition-all z-10",
                                                app.color
                                            )}
                                            style={{
                                                left: `${startOffset}%`,
                                                width: `${width}%`
                                            }}
                                        >
                                            <p className="font-bold truncate">{app.client}</p>
                                            <p className="truncate opacity-80">{app.service}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default CalendarPage;
