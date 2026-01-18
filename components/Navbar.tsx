"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { cn } from "@/lib/utils";

const navLinks = [
    { name: 'O nás', href: '#o-nas' },
    { name: 'Trenéři', href: '#trainers' },
    { name: 'Ceník', href: '#cenik' },
    { name: 'Kdy makat?', href: '#oteviraci-doba' },
    { name: 'Kontakt', href: '#kontakt' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 w-full z-[100] transition-all duration-300 px-4 py-4",
            isScrolled ? "md:py-2" : "md:py-6"
        )}>
            <div className={cn(
                "max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-6 py-3 flex items-center justify-between",
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg border border-zinc-200" : "bg-transparent"
            )}>
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-red-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                        <Dumbbell className="text-white" size={24} />
                    </div>
                    <span className={cn(
                        "text-2xl font-black uppercase italic tracking-tighter transition-colors",
                        isScrolled ? "text-black" : "text-black lg:text-zinc-900"
                    )}>
                        Bulldog<span className="text-red-600">Gym</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold uppercase tracking-widest text-zinc-900 hover:text-red-600 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#kontakt" className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold uppercase hover:bg-red-600 transition-all scale-105 active:scale-95">
                        Vstup do gymu
                    </a>
                </div>

                <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="absolute top-20 left-4 right-4 bg-white rounded-3xl p-8 shadow-2xl border border-zinc-100 flex flex-col gap-6 md:hidden animate-in fade-in zoom-in duration-300">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-black uppercase italic text-black border-b border-zinc-100 pb-2"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}