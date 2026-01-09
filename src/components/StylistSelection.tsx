"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Stylist } from '@/lib/data';
import StylistCard from './StylistCard';

interface StylistSelectionProps {
    onBack: () => void;
    onNext: (stylistId: string) => void;
    stylists: Stylist[];
}

const StylistSelection: React.FC<StylistSelectionProps> = ({ onBack, onNext, stylists }) => {
    const [selectedStylistId, setSelectedStylistId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-ivory text-charcoal pb-32">
            <main className="container mx-auto px-4 lg:px-8 pt-12">

                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-midnight mb-4"
                    >
                        Choose Your Artist
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-charcoal/60 font-sans"
                    >
                        Select a specialist or let us pair you with the first available expert.
                    </motion.p>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stylists.map((stylist, idx) => (
                        <motion.div
                            key={stylist.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <StylistCard
                                stylist={stylist}
                                isSelected={selectedStylistId === stylist.id}
                                onSelect={() => setSelectedStylistId(stylist.id)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
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
                        onClick={() => selectedStylistId && onNext(selectedStylistId)}
                        disabled={!selectedStylistId}
                        className="px-8 py-3 rounded-xl bg-midnight text-ivory font-medium flex items-center gap-2 shadow-xl shadow-midnight/20 hover:bg-rose hover:text-midnight transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>Select Date & Time</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StylistSelection;
