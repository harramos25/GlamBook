"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock } from 'lucide-react';

const HeroSection = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50 } as const
        }
    };

    return (
        <div className="min-h-screen bg-ivory text-charcoal relative overflow-hidden font-sans selection:bg-rose selection:text-midnight">

            {/* Background Ambience (The "Glow") */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-rose/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[80px] pointer-events-none" />

            {/* --- NAVIGATION --- */}
            <nav className="w-full px-8 py-6 flex justify-between items-center relative z-20">
                <div className="text-2xl font-serif font-bold text-midnight tracking-tight">
                    GlamBook.
                </div>

                <div className="hidden md:flex gap-8 text-sm font-medium text-charcoal/80">
                    {['Services', 'Stylists', 'Lookbook', 'Stories'].map((item) => (
                        <a key={item} href="#" className="hover:text-midnight transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                <button className="px-6 py-3 rounded-full border border-midnight/20 hover:border-midnight text-sm transition-all duration-300 cursor-pointer">
                    Sign In
                </button>
            </nav>

            {/* --- HERO CONTENT --- */}
            <main className="container mx-auto px-6 lg:px-12 pt-12 pb-20 relative z-10 flex flex-col lg:flex-row items-center">

                {/* Left: Text Content */}
                <motion.div
                    className="lg:w-1/2 space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 border border-white/60 backdrop-blur-md shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                        <span className="text-xs font-mono uppercase tracking-widest text-midnight">New Collection Dropped</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-6xl lg:text-7xl font-serif text-midnight leading-[1.1]">
                        Beauty meets <br />
                        <span className="italic text-rose">Intelligence.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg text-charcoal/70 max-w-md leading-relaxed">
                        The premium booking experience for the modern muse.
                        Select your style, choose your artist, and manage your glow—all in real-time.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="/book" className="group px-8 py-4 bg-midnight text-ivory rounded-2xl flex items-center justify-center gap-3 hover:bg-rose hover:shadow-lg hover:shadow-rose/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                            <span>Book Appointment</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <button className="px-8 py-4 bg-white/50 backdrop-blur-sm border border-white/60 text-midnight rounded-2xl hover:bg-white transition-all cursor-pointer">
                            View Services
                        </button>
                    </motion.div>

                    {/* Social Proof / Stats */}
                    <motion.div variants={itemVariants} className="flex items-center gap-8 pt-8 border-t border-charcoal/5 max-w-md">
                        <div>
                            <p className="font-mono text-2xl font-bold text-midnight">4.9</p>
                            <div className="flex text-gold text-xs gap-1">
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                                <Star className="w-3 h-3 fill-current" />
                            </div>
                            <p className="text-xs text-charcoal/60 mt-1">Client Rating</p>
                        </div>
                        <div className="h-8 w-[1px] bg-charcoal/10"></div>
                        <div>
                            <p className="font-mono text-2xl font-bold text-midnight">12k+</p>
                            <p className="text-xs text-charcoal/60 mt-1">Bookings this month</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right: Visual / Glass Card */}
                <div className="lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center lg:justify-end">

                    {/* Main Floating Image Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-midnight/10"
                    >
                        {/* Placeholder for the Image - replace src with your High-Fashion image */}
                        <img
                            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop"
                            alt="Luxury Salon"
                            className="w-full h-full object-cover"
                        />

                        {/* Glass Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent mix-blend-multiply"></div>
                    </motion.div>

                    {/* Floating Glass UI Card (The "Tech" Element) */}
                    <motion.div
                        className="absolute bottom-12 -left-8 md:left-0 bg-white/20 backdrop-blur-xl border border-white/40 p-5 rounded-2xl shadow-xl max-w-[240px]"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            y: [0, -10, 0] // Floating Animation
                        }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            default: { delay: 0.8, duration: 0.6 }
                        }}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="text-xs text-white/80 font-medium">Next Available</p>
                                <p className="text-sm font-serif text-white">Hair & Spa Treatment</p>
                            </div>
                            <div className="bg-gold/90 p-1.5 rounded-lg text-midnight">
                                <Clock className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-rose rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs font-mono text-white/90">
                                <span>Today</span>
                                <span>14:30 PM</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>
        </div>
    );
};

export default HeroSection;
