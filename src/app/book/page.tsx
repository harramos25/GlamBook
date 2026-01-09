"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ServiceSelection from "@/components/ServiceSelection";
import StylistSelection from "@/components/StylistSelection";

import DateTimeSelection from "@/components/DateTimeSelection";
import BookingForm from "@/components/BookingForm";
// import { STYLISTS, SERVICES } from "@/lib/data";

// Wizard Steps
type Step = 'service' | 'stylist' | 'datetime' | 'confirm';

export default function BookPage() {
    const [step, setStep] = useState<Step>('service');
    const [services, setServices] = useState<any[]>([]);
    const [stylists, setStylists] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Booking State
    const [bookingData, setBookingData] = useState({
        serviceIds: [] as string[],
        stylistId: null as string | null,
        date: null as Date | null,
        time: null as string | null,
    });

    // Fetch Data on Mount
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [sData, stData] = await Promise.all([
                    fetch('/api/services').then(r => r.json()),
                    fetch('/api/stylists').then(r => r.json())
                ]);
                setServices(sData);

                // Format Stylists
                const formattedStylists = stData.map((s: any) => ({
                    id: s.id,
                    name: s.name,
                    role: s.roleTitle,
                    rating: s.rating,
                    reviews: s.reviews,
                    image: s.image,
                    specialties: s.specialties ? s.specialties.split(',') : []
                }));
                // Add Any Stylist
                const anyStylist = {
                    id: 'any',
                    name: 'Any Stylist',
                    role: 'First Available',
                    rating: 5.0,
                    reviews: 999,
                    image: '',
                    specialties: ['Fastest Service']
                };
                setStylists([anyStylist, ...formattedStylists]);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculated for Summary
    const selectedServicesList = services.filter(s => bookingData.serviceIds.includes(s.id));
    const totalPrice = selectedServicesList.reduce((acc, s) => acc + s.price, 0);
    const selectedStylist = stylists.find(s => s.id === bookingData.stylistId);

    // Handlers
    const handleServiceSelect = (ids: string[]) => {
        setBookingData(prev => ({ ...prev, serviceIds: ids }));
        setStep('stylist');
    };

    const handleStylistSelect = (id: string) => {
        setBookingData(prev => ({ ...prev, stylistId: id }));
        setStep('datetime');
    };

    const handleDateTimeSelect = (date: Date, time: string) => {
        setBookingData(prev => ({ ...prev, date, time }));
        setStep('confirm');
    };

    const handleConfirm = async (formData: any) => {
        try {
            // For MVP, we book the primary service (first one)
            const primaryServiceId = bookingData.serviceIds[0];

            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: formData.name,
                    userEmail: formData.email,
                    userPhone: formData.phone,
                    notes: formData.notes,
                    serviceId: primaryServiceId,
                    stylistId: bookingData.stylistId === 'any' ? stylists[1].id : bookingData.stylistId, // Fallback to first real stylist if 'any'
                    date: bookingData.date,
                    time: bookingData.time
                })
            });

            if (res.ok) {
                alert(`Booking Confirmed!\nThank you, ${formData.name}. Confirmation sent to ${formData.email}.`);
                window.location.href = "/";
            } else {
                alert("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    };

    const handleBack = () => {
        if (step === 'stylist') setStep('service');
        if (step === 'datetime') setStep('stylist');
        if (step === 'confirm') setStep('datetime');
    };

    if (loading) {
        return <div className="min-h-screen bg-ivory flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose"></div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-ivory overflow-hidden">
            <AnimatePresence mode="wait">
                {step === 'service' && (
                    <motion.div
                        key="service"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ServiceSelection
                            services={services}
                            onNext={handleServiceSelect}
                        />
                    </motion.div>
                )}

                {step === 'stylist' && (
                    <motion.div
                        key="stylist"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <StylistSelection
                            stylists={stylists}
                            onBack={handleBack}
                            onNext={handleStylistSelect}
                        />
                    </motion.div>
                )}

                {step === 'datetime' && (
                    <motion.div
                        key="datetime"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <DateTimeSelection
                            onBack={handleBack}
                            onNext={handleDateTimeSelect}
                        />
                    </motion.div>
                )}

                {step === 'confirm' && (
                    <motion.div
                        key="confirm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <BookingForm
                            onBack={handleBack}
                            onSubmit={handleConfirm}
                            summary={{
                                serviceCount: bookingData.serviceIds.length,
                                stylistName: selectedStylist ? selectedStylist.name : 'Unknown',
                                totalPrice: totalPrice,
                                date: bookingData.date,
                                time: bookingData.time
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
