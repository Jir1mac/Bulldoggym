"use client";

import React, { useState } from 'react';
import { Lock, User, LogIn, ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    // Stavy pro formulář
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // Stavy pro UI
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // Úspěch - přesměrování na admin nástěnku
                router.push('/admin/dashboard');
            } else {
                // Chyba z backendu (špatné heslo)
                setError(data.message || 'Přihlášení se nezdařilo');
            }
        } catch (err) {
            setError('Server je momentálně nedostupný');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-black uppercase italic tracking-tighter">
                        Admin <span className="text-red-600">Bulldog</span>
                    </h1>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 text-zinc-50 opacity-10 pointer-events-none">
                        <ShieldCheck size={200} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {/* Chybová hláška */}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-[11px] font-black uppercase border border-red-200 text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] font-black uppercase text-zinc-400 mb-1 ml-1 block">
                                Uživatelské jméno
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <User size={18} />
                                </span>
                                <input
                                    type="text"
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-zinc-50 border border-zinc-200 pl-12 pr-4 py-3 rounded-xl outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-bold disabled:opacity-50"
                                    placeholder="Jméno"
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-zinc-400 mb-1 ml-1 block">
                                Heslo
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={isLoading}
                                    className="w-full bg-zinc-50 border border-zinc-200 pl-12 pr-12 py-3 rounded-xl outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-bold disabled:opacity-50"
                                    placeholder="Tajné heslo"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-right">
                            <button type="button" className="text-[10px] font-bold uppercase text-zinc-400 hover:text-red-600 cursor-pointer transition-colors">
                                Zapomenuté heslo?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase italic cursor-pointer py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-600/30 disabled:bg-zinc-400 disabled:scale-100 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Přihlásit se
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-zinc-400 text-xs font-bold uppercase tracking-tighter">
                    Rychlá pomoc : <span className="text-red-600">792 304 129</span>.
                </p>
            </div>
        </div>
    );
}