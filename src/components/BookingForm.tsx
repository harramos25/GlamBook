"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface BookingFormProps {
    onBack: () => void;
    onSubmit: (formData: any) => void;
    summary: {
        serviceCount: number;
        stylistName?: string;
        totalPrice: number;
        date: Date | null;
        time: string | null;
    };
}

const BookingForm: React.FC<BookingFormProps> = ({ onBack, onSubmit, summary }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            onSubmit(formData);
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-ivory text-charcoal pb-32">
            <main className="container mx-auto px-4 lg:px-8 pt-12">

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">

                    {/* Left: Form */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8"
                        >
                            <h1 className="text-4xl font-serif text-midnight mb-2">Final Details</h1>
                            <p className="text-charcoal/60 font-sans">
                                Enter your contact info to secure your appointment.
                            </p>
                        </motion.div>

                        <motion.form
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div className="space-y-1">
                                <label className="text-xs font-mono uppercase tracking-wider text-charcoal/50 pl-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/50 border border-midnight/10 rounded-xl px-4 py-3 focus:outline-none focus:border-midnight focus:bg-white transition-colors"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-mono uppercase tracking-wider text-charcoal/50 pl-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/50 border border-midnight/10 rounded-xl px-4 py-3 focus:outline-none focus:border-midnight focus:bg-white transition-colors"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-mono uppercase tracking-wider text-charcoal/50 pl-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-white/50 border border-midnight/10 rounded-xl px-4 py-3 focus:outline-none focus:border-midnight focus:bg-white transition-colors"
                                    placeholder="(555) 000-0000"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-mono uppercase tracking-wider text-charcoal/50 pl-1">Notes (Optional)</label>
                                <textarea
                                    rows={3}
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full bg-white/50 border border-midnight/10 rounded-xl px-4 py-3 focus:outline-none focus:border-midnight focus:bg-white transition-colors resize-none"
                                    placeholder="Allergies, preferences, etc."
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={onBack}
                                    className="text-midnight/60 hover:text-midnight flex items-center gap-2 text-sm font-medium"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-midnight text-ivory px-8 py-4 rounded-2xl font-medium shadow-lg shadow-midnight/20 hover:bg-rose hover:text-midnight hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Processing...</span>
                                    ) : (
                                        <>
                                            <span>Confirm Booking</span>
                                            <CheckCircle className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.form>
                    </div>

                    {/* Right: Summary Card */}
                    <div className="hidden md:block">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="sticky top-24 bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2rem] shadow-2xl shadow-midnight/5"
                        >
                            <h2 className="font-serif text-2xl text-midnight mb-6">Booking Summary</h2>

                            <div className="space-y-6">
                                <div className="flex justify-between border-b border-midnight/5 pb-4">
                                    <span className="text-charcoal/60">Service</span>
                                    <span className="font-medium text-midnight">{summary.serviceCount} Selected</span>
                                </div>

                                <div className="flex justify-between border-b border-midnight/5 pb-4">
                                    <span className="text-charcoal/60">Stylist</span>
                                    <span className="font-medium text-midnight">{summary.stylistName || "Any Stylist"}</span>
                                </div>

                                <div className="flex justify-between border-b border-midnight/5 pb-4">
                                    <span className="text-charcoal/60">Date & Time</span>
                                    <div className="text-right">
                                        <p className="font-medium text-midnight">{summary.date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                                        <p className="text-sm text-charcoal/50">{summary.time}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-serif text-lg text-midnight">Total</span>
                                    <span className="font-mono text-3xl font-bold text-gold">${summary.totalPrice}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookingForm;
