"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

// Utilities to generate dates
const getNextDays = (days: number) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push({
            dateObj: d,
            dayName: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            dayNumber: d.getDate(),
            fullDate: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
        });
    }
    return dates;
};

// Mock Time Slots
const TIME_SLOTS = {
    morning: ['09:00', '09:30', '10:00', '11:00', '11:30'],
    afternoon: ['12:00', '13:30', '14:00', '14:30', '15:00', '16:30'],
    evening: ['17:00', '17:30', '18:00', '19:00']
};

interface DateTimeSelectionProps {
    onBack: () => void;
    onNext: (date: Date, time: string) => void;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ onBack, onNext }) => {
    const [dates] = useState(() => getNextDays(14));
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const selectedDate = dates[selectedDateIndex];

    return (
        <div className="min-h-screen bg-ivory text-charcoal pb-32">
            <main className="container mx-auto px-4 lg:px-8 pt-12">

                <div className="mb-8 text-center max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-midnight mb-2"
                    >
                        Time & Date
                    </motion.h1>
                    <p className="text-charcoal/60 font-sans">
                        Choose a time that works best for your schedule.
                    </p>
                </div>

                {/* Date Horizontal Ribbons */}
                <div className="relative mb-12">
                    <div className="flex overflow-x-auto pb-8 gap-4 px-4 snap-x no-scrollbar md:justify-center">
                        {dates.map((d, idx) => (
                            <motion.button
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => { setSelectedDateIndex(idx); setSelectedTime(null); }}
                                className={cn(
                                    "flex-shrink-0 w-16 h-24 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300 snap-center border",
                                    selectedDateIndex === idx
                                        ? "bg-midnight border-midnight text-ivory shadow-lg scale-110"
                                        : "bg-white/50 border-white/20 text-charcoal/50 hover:bg-white hover:text-midnight hover:shadow-md"
                                )}
                            >
                                <span className="text-[10px] tracking-widest font-sans">{d.dayName}</span>
                                <span className="text-2xl font-mono font-bold">{d.dayNumber}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Time Slots */}
                <div className="max-w-3xl mx-auto">
                    <div className="grid gap-8">

                        {/* Morning */}
                        <section>
                            <h3 className="text-sm font-mono uppercase text-charcoal/40 mb-4 pl-2">Morning</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {TIME_SLOTS.morning.map((time, idx) => (
                                    <TimePill
                                        key={time}
                                        time={time}
                                        isSelected={selectedTime === time}
                                        onSelect={() => setSelectedTime(time)}
                                        delay={idx * 0.05}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Afternoon */}
                        <section>
                            <h3 className="text-sm font-mono uppercase text-charcoal/40 mb-4 pl-2">Afternoon</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {TIME_SLOTS.afternoon.map((time, idx) => (
                                    <TimePill
                                        key={time}
                                        time={time}
                                        isSelected={selectedTime === time}
                                        onSelect={() => setSelectedTime(time)}
                                        delay={idx * 0.05 + 0.2}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Evening */}
                        <section>
                            <h3 className="text-sm font-mono uppercase text-charcoal/40 mb-4 pl-2">Evening</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {TIME_SLOTS.evening.map((time, idx) => (
                                    <TimePill
                                        key={time}
                                        time={time}
                                        isSelected={selectedTime === time}
                                        onSelect={() => setSelectedTime(time)}
                                        delay={idx * 0.05 + 0.4}
                                    />
                                ))}
                            </div>
                        </section>

                    </div>
                </div>

            </main>

            {/* Footer Nav */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none">
                <div className="max-w-4xl mx-auto flex justify-between pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="px-6 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-midnight/10 text-midnight hover:bg-white transition-all flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                    </button>

                    <button
                        onClick={() => selectedTime && onNext(selectedDate.dateObj, selectedTime)}
                        disabled={!selectedTime}
                        className="px-8 py-3 rounded-xl bg-midnight text-ivory font-medium flex items-center gap-2 shadow-xl shadow-midnight/20 hover:bg-rose hover:text-midnight transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>Confirm Details</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const TimePill = ({ time, isSelected, onSelect, delay }: { time: string, isSelected: boolean, onSelect: () => void, delay: number }) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            onClick={onSelect}
            whileTap={{ scale: 0.9 }}
            className={cn(
                "py-3 px-2 rounded-xl text-center font-mono text-sm border transition-all duration-300",
                isSelected
                    ? "bg-gold border-gold text-midnight font-bold shadow-lg shadow-gold/30"
                    : "bg-white border-white/40 text-charcoal/80 hover:border-midnight/30 hover:shadow-md"
            )}
        >
            {time}
        </motion.button>
    );
};

export default DateTimeSelection;
