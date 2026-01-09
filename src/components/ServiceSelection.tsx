"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Service } from '@/lib/data';
import ServiceCard from './ServiceCard';
import { cn } from '@/lib/utils';

interface ServiceSelectionProps {
    onNext?: (selectedIds: string[]) => void;
    services: Service[];
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onNext, services }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

    // Derived Categories
    const categories = useMemo(() => {
        const cats = new Set(services.map((s) => s.category));
        return ['All', ...Array.from(cats)];
    }, [services]);

    // Filtering
    const filteredServices = useMemo(() => {
        if (selectedCategory === 'All') return services;
        return services.filter((s) => s.category === selectedCategory);
    }, [selectedCategory, services]);

    // Selection Logic
    const handleSelect = (id: string) => {
        setSelectedServiceIds((prev) =>
            prev.includes(id)
                ? prev.filter((sid) => sid !== id)
                : [...prev, id]
        );
    };

    // Totals
    const selectedServicesList = services.filter(s => selectedServiceIds.includes(s.id));
    const totalPrice = selectedServicesList.reduce((acc, s) => acc + s.price, 0);
    const totalDuration = selectedServicesList.reduce((acc, s) => acc + s.duration, 0);

    return (
        <div className="min-h-screen bg-ivory text-charcoal pb-32">
            <main className="container mx-auto px-4 lg:px-8 pt-12">

                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-midnight mb-4"
                    >
                        Select Your Experience
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-charcoal/60 font-sans"
                    >
                        Customize your visit by choosing from our premium services.
                    </motion.p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
                                selectedCategory === cat
                                    ? "bg-midnight border-midnight text-ivory shadow-lg shadow-midnight/20"
                                    : "bg-white/50 border-transparent text-charcoal/70 hover:bg-white hover:shadow-sm"
                            )}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Service Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredServices.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                isSelected={selectedServiceIds.includes(service.id)}
                                onSelect={() => handleSelect(service.id)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </main>

            {/* Summary Footer Bar */}
            <AnimatePresence>
                {selectedServiceIds.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                    >
                        <div className="max-w-4xl mx-auto bg-midnight/95 backdrop-blur-xl rounded-2xl p-4 md:px-8 md:py-5 flex items-center justify-between shadow-2xl shadow-midnight/40 border border-white/10 text-ivory">

                            <div className="flex items-center gap-6">
                                <div>
                                    <p className="text-xs text-ivory/60 uppercase tracking-wider font-mono">Total Services</p>
                                    <p className="text-xl font-serif text-ivory">{selectedServiceIds.length} Selected</p>
                                </div>
                                <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                                <div className="hidden sm:block">
                                    <p className="text-xs text-ivory/60 uppercase tracking-wider font-mono">Est. Duration</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-rose" />
                                        <p className="text-xl font-mono font-bold text-ivory">{totalDuration} min</p>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                                <div className="hidden sm:block">
                                    <p className="text-xs text-ivory/60 uppercase tracking-wider font-mono">Total Price</p>
                                    <p className="text-xl font-mono font-bold text-gold">${totalPrice}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="sm:hidden text-right mr-2">
                                    <p className="font-mono font-bold text-gold">${totalPrice}</p>
                                    <p className="text-xs text-ivory/60">{totalDuration} min</p>
                                </div>
                                <button
                                    onClick={() => onNext?.(selectedServiceIds)}
                                    className="bg-ivory text-midnight px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-rose hover:text-midnight transition-colors cursor-pointer"
                                >
                                    <span>Continue</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServiceSelection;
