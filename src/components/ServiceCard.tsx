"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Service } from '@/lib/data';

interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
    onSelect: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onSelect }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={onSelect}
            className={cn(
                "relative group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300",
                // Base Glass Style
                "bg-white/60 backdrop-blur-xl border-white/20 shadow-sm",
                // Selected Style
                isSelected
                    ? "border-gold/80 shadow-[0_0_30px_-5px_var(--color-gold)] ring-1 ring-gold/50"
                    : "hover:border-midnight/30 hover:shadow-lg hover:shadow-midnight/10"
            )}
        >
            {/* Background Image (Desaturated -> Color on Hover) */}
            <div className="absolute inset-0 z-0">
                <div
                    className={cn(
                        "absolute inset-0 bg-cover bg-center transition-all duration-700",
                        isSelected ? "grayscale-0 scale-110 opacity-40" : "grayscale scale-100 opacity-10 group-hover:grayscale-0 group-hover:opacity-30 group-hover:scale-105"
                    )}
                    style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/80 to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 p-6 flex flex-col h-full min-h-[320px] justify-between">

                {/* Top: Header */}
                <div>
                    <div className="flex justify-between items-start mb-4">
                        {/* Selection Indicator */}
                        <div className={cn(
                            "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                            isSelected ? "bg-gold border-gold text-midnight" : "border-midnight/20 text-transparent"
                        )}>
                            <Check className="w-3.5 h-3.5" />
                        </div>

                        {/* Info Button */}
                        <button title="More Info" className="text-midnight/40 hover:text-midnight transition-colors">
                            <Info className="w-4 h-4" />
                        </button>
                    </div>

                    <h3 className="text-3xl font-serif text-midnight leading-tight mb-2">
                        {service.name}
                    </h3>
                    <p className="text-sm text-charcoal/60 font-sans line-clamp-3">
                        {service.description}
                    </p>
                </div>

                {/* Bottom: Specs */}
                <div className="flex justify-between items-end border-t border-midnight/10 pt-4 mt-4">
                    <div>
                        <span className="block text-xs uppercase tracking-wider text-charcoal/50 font-mono mb-1">Duration</span>
                        <span className="font-mono text-lg font-bold text-midnight">{service.duration} MIN</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs uppercase tracking-wider text-charcoal/50 font-mono mb-1">Price</span>
                        <span className="font-mono text-lg font-bold text-midnight">${service.price}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
