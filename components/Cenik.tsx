"use client";

import React, { useState, useEffect } from 'react';
import { Check, Users, Loader2 } from 'lucide-react';

const MassageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M7 14c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17c2-3 6-5 9-5s7 2 9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const planStaticDetails: Record<string, { description: string, features: string[] }> = {
    "Měsíční členství": {
        description: "Pravidelný trénink bez omezení počtu vstupů.",
        features: ["Neomezený přístup 30 dní", "Vstup na všechny stroje", "Bez registrace a závazků"]
    },
    "Čtvrtletní členství": {
        description: "3 měsíce pro tvou proměnu.",
        features: ["Výhodnější cena", "90 dní tréninku", "Stabilní režim"]
    },
    "Pololetní členství": {
        description: "Půl roku disciplíny a výsledků.",
        features: ["Dlouhodobý progres", "180 dní tréninku", "Ušetříte 1600 Kč"]
    },
    "Roční členství": {
        description: "Maximální závazek, nejlepší cena.",
        features: ["TOP cena za měsíc", "365 dní tréninku", "Nejlepší investice"]
    }
};

interface PricePlan {
    title: string;
    priceNormal: string;
    priceDiscount: string;
}

export default function Pricing() {
    const [pricingPlans, setPricingPlans] = useState<PricePlan[]>([]);
    const [entry10, setEntry10] = useState("");
    const [entrySingle, setEntrySingle] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const res = await fetch('/api/content');
                const data = await res.json();

                if (data.pricing) setPricingPlans(data.pricing);

                setEntry10(data.entry10 || "1 100");
                setEntrySingle(data.entrySingle || "130");

            } catch (error) {
                console.error("Chyba při načítání ceníku:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPricing();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
                <Loader2 className="animate-spin text-red-600" size={48} />
            </div>
        );
    }

    return (
        <section id="cenik" className="py-16 md:py-24 min-h-screen flex items-center bg-zinc-100 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-[1500px] mx-auto w-full">

                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">Ceník Bulldog Gym</h2>
                    <h3 className="text-5xl md:text-6xl font-black uppercase text-black mb-6">Investuj do <span className="text-red-600">sebe</span></h3>
                </div>

                <div className="mt-16 mb-5 text-center" data-aos="zoom-in" data-aos-delay="200">
                    <p className="text-zinc-700 text-sm">Permanentka na 10 vstupů: {entry10} Kč</p>
                    <p className="text-red-600 font-bold uppercase mt-4 tracking-widest">Jednorázové vstupné: {entrySingle} Kč</p>

                    <div className="flex items-center justify-center gap-2 text-sm text-zinc-700 mt-3">
                        <MassageIcon width={18} height={18} className="text-red-600" />
                        <span>Masáže k dispozici — rezervace v recepci</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 xl:gap-8">
                    {pricingPlans.map((plan, index) => {
                        const details = planStaticDetails[plan.title] || { description: "", features: [] };

                        return (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                                className="relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2rem)] min-w-[280px] flex flex-col border-red-600 bg-zinc-900 shadow-[0_0_30px_rgba(220,38,38,0.15)] lg:scale-105 z-10"
                            >
                                <div className="flex-grow">
                                    <h4 className="text-2xl font-bold text-white mb-2 leading-tight">{plan.title}</h4>
                                    <p className="text-zinc-500 mb-8 text-sm h-10 leading-snug">{details.description}</p>

                                    <div className="space-y-4 mb-8 pb-8 border-b border-zinc-800">
                                        <div className="flex justify-between items-center text-zinc-400">
                                            <span className="text-xs uppercase font-bold tracking-wider">Základní</span>
                                            <div className="flex items-baseline whitespace-nowrap">
                                                <span className="text-3xl font-bold text-white">{plan.priceNormal}</span>
                                                <span className="ml-1 text-sm">Kč</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center bg-red-600/10 p-3 rounded-xl border border-red-600/20">
                                            <div className="flex items-center text-red-500 mr-2">
                                                <Users size={16} className="mr-2 flex-shrink-0" />
                                                <span className="text-[10px] font-black uppercase leading-none whitespace-nowrap">Zvýhodněné*</span>
                                            </div>
                                            <div className="flex items-baseline text-red-600 whitespace-nowrap font-black">
                                                <span className="text-3xl">{plan.priceDiscount}</span>
                                                <span className="ml-1 text-sm">Kč</span>
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-6">
                                        {details.features.map((feature, i) => (
                                            <li key={i} className="flex items-start text-zinc-300 text-sm">
                                                <Check className="text-red-600 mr-3 mt-1 flex-shrink-0" size={16} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center" data-aos="fade-up" data-aos-offset="0">
                    <p className="text-zinc-500 text-sm italic">
                        * Zvýhodněná cena platí pro studenty do 26 let (po předložení ISIC), seniory nad 60 let a držitele průkazu ZTP.
                    </p>
                    <p className="text-red-600 font-bold uppercase mt-4 tracking-widest">
                        Přijímáme karty MultiSport, ActivePass a Benefit Plus.
                    </p>
                </div>
            </div>
        </section>
    );
}