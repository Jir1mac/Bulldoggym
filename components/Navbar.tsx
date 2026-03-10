"use client";

import React, { useState, useEffect } from 'react';
import { X, Dumbbell } from 'lucide-react';
import { cn } from "@/lib/utils";

const navLinks = [
    { name: 'Masáže', href: 'https://most-masaze.cz/' },
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

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={cn(
                "fixed top-0 w-full z-[100] transition-all duration-300 px-4 py-4",
                isScrolled ? "md:py-2" : "md:py-6"
            )}>
                <div className={cn(
                    "max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-6 py-3 flex items-center justify-between",
                    isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg border border-zinc-200" : "bg-transparent"
                )}>
                    <div
                        onClick={scrollToTop}
                        className="flex items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
                    >
                        <div className="bg-red-600 p-2 rounded-lg ">
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
                    <button 
                        className="md:hidden relative w-10 h-10 flex items-center justify-center text-black z-[102]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={cn(
                                "block h-0.5 w-full bg-black transition-all duration-300 origin-center",
                                mobileMenuOpen && "rotate-45 translate-y-[9px]"
                            )} />
                            <span className={cn(
                                "block h-0.5 w-full bg-black transition-all duration-300",
                                mobileMenuOpen && "opacity-0"
                            )} />
                            <span className={cn(
                                "block h-0.5 w-full bg-black transition-all duration-300 origin-center",
                                mobileMenuOpen && "-rotate-45 -translate-y-[9px]"
                            )} />
                        </div>
                    </button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[101] md:hidden transition-opacity duration-300 animate-in fade-in"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            <div className={cn(
                "fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[102] md:hidden shadow-2xl transition-transform duration-300 ease-out",
                mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-zinc-200">
                        <div className="flex items-center gap-2">
                            <div className="bg-red-600 p-2 rounded-lg">
                                <Dumbbell className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-black uppercase italic tracking-tighter">
                                Bulldog<span className="text-red-600">Gym</span>
                            </span>
                        </div>
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 active:scale-95 transition-all"
                            aria-label="Zavřít menu"
                        >
                            <X size={24} className="text-zinc-900" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-6 px-6">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="flex items-center px-4 py-4 text-lg font-bold uppercase tracking-wide text-zinc-900 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all active:scale-95 min-h-[56px]"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        <div className="mt-6 px-4">
                            <a 
                                href="#kontakt" 
                                onClick={handleLinkClick}
                                className="block w-full bg-red-600 text-white text-center px-6 py-4 rounded-full text-base font-bold uppercase hover:bg-red-700 transition-all active:scale-95 min-h-[56px] flex items-center justify-center"
                            >
                                Vstup do gymu
                            </a>
                        </div>
                    </nav>

                    <div className="p-6 border-t border-zinc-200">
                        <p className="text-sm text-zinc-600 text-center">
                            Největší posilovna v Mostě
                        </p>
                        <p className="text-xs text-zinc-500 text-center mt-1">
                            1000 m² plochy
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}