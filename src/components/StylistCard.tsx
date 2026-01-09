"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Stylist } from '@/lib/data';

interface StylistCardProps {
    stylist: Stylist;
    isSelected: boolean;
    onSelect: () => void;
}

const StylistCard: React.FC<StylistCardProps> = ({ stylist, isSelected, onSelect }) => {
    const isAny = stylist.id === 'any';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            onClick={onSelect}
            className={cn(
                "relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 h-[400px] flex flex-col justify-end",
                // Base Style
                "bg-white border border-white/20 shadow-md",
                // Selection
                isSelected
                    ? "ring-2 ring-gold shadow-xl shadow-gold/20"
                    : "hover:shadow-lg"
            )}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {isAny ? (
                    <div className="w-full h-full bg-midnight flex items-center justify-center">
                        <div className="p-4 border border-white/20 rounded-full">
                            <User className="w-12 h-12 text-ivory/50" />
                        </div>
                    </div>
                ) : (
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${stylist.image})` }}
                    />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 text-ivory">
                {/* Checkmark */}
                <div className={cn(
                    "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-ivory text-midnight",
                    isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}>
                    <Check className="w-5 h-5" />
                </div>

                <h3 className="text-2xl font-serif mb-1">{stylist.name}</h3>
                <p className="text-sm text-ivory/70 font-sans mb-3">{stylist.role}</p>

                {!isAny && (
                    <div className="flex items-center gap-1 mb-3">
                        <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                        <span className="font-mono font-bold text-sm">{stylist.rating}</span>
                        <span className="text-xs text-ivory/50">({stylist.reviews})</span>
                    </div>
                )}

                <div className="flex flex-wrap gap-2">
                    {stylist.specialties.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default StylistCard;
