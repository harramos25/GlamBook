"use client";

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { KeyRound, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="min-h-screen bg-ivory flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl text-midnight mb-2">Admin Portal</h1>
                    <p className="text-charcoal/60">Please sign in to continue</p>
                </div>

                <form action={dispatch} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                            <input
                                type="email"
                                name="email"
                                placeholder="admin@glambook.com"
                                required
                                className="w-full bg-white/50 border border-charcoal/10 rounded-xl px-4 py-3 pl-10 text-midnight focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose transition-all placeholder:text-charcoal/30"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 ml-1">Password</label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full bg-white/50 border border-charcoal/10 rounded-xl px-4 py-3 pl-10 text-midnight focus:outline-none focus:ring-2 focus:ring-rose/20 focus:border-rose transition-all placeholder:text-charcoal/30"
                            />
                        </div>
                    </div>

                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <>
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>

                    <LoginButton />
                </form>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="w-full bg-midnight text-ivory py-3 rounded-xl font-medium hover:bg-rose hover:text-midnight transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            aria-disabled={pending}
        >
            {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                    Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
            )}
        </button>
    );
}
