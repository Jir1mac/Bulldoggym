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
    "Jednorázové vstupné": {
        description: "Jeden vstup do posilovny.",
        features: ["Platnost 1 den", "Vstup na všechny stroje", "Bez registrace"]
    },
    "Permanentka na 10 vstupů": {
        description: "Flexibilní trénink podle tvého tempa.",
        features: ["10 vstupů", "Platnost 4 měsíce", "Přenosná"]
    },
    "Měsíční permanentka": {
        description: "Pravidelný trénink bez omezení počtu vstupů.",
        features: ["Až 31 dní tréninku", "Nepřenosná", "Bez registrace a závazků"]
    },
    "Čtvrtletní permanentka": {
        description: "3 měsíce pro tvou proměnu.",
        features: ["Až 93 dní tréninku", "Nepřenosná", "Stabilní režim"]
    },
    "Pololetní permanentka": {
        description: "Půl roku disciplíny a výsledků.",
        features: ["Až 186 dní tréninku", "Nepřenosná", "Ušetříte 1600 Kč"]
    },
    "Roční permanentka": {
        description: "Maximální závazek, nejlepší cena.",
        features: ["Až 366 dní tréninku", "Nepřenosná", "Nejlepší investice"]
    }
};

interface PricePlan {
    title: string;
    priceNormal: string;
    priceDiscount?: string;
}

export default function Pricing() {
    const [pricingPlans, setPricingPlans] = useState<PricePlan[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const res = await fetch('/api/content');
                const data = await res.json();

                let fetchedPlans = data.pricing || [];

                fetchedPlans = fetchedPlans.map((plan: PricePlan) => ({
                    ...plan,
                    title: plan.title.replace("členství", "permanentka")
                }));

                const entrySingle = data.entrySingle || "130";
                const entry10 = data.entry10 || "1 100";

                const additionalPlans: PricePlan[] = [
                    { title: "Jednorázové vstupné", priceNormal: entrySingle },
                    { title: "Permanentka na 10 vstupů", priceNormal: entry10 }
                ];

                setPricingPlans([...additionalPlans, ...fetchedPlans]);

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

                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">Ceník Bulldog Gym</h2>
                    <h3 className="text-5xl md:text-6xl font-black uppercase text-black mb-6">Investuj do <span className="text-red-600">sebe</span></h3>
                </div>

                <div className="mt-8 mb-12 text-center"></div>

                <div className="flex flex-wrap justify-center items-stretch gap-6 xl:gap-8">
                    {pricingPlans.map((plan, index) => {
                        const details = planStaticDetails[plan.title] || { description: "", features: [] };

                        return (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={(index % 4) * 100}
                                className="relative p-6 sm:p-8 rounded-3xl border w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-2rem)] xl:w-[calc(25%-2rem)] min-w-[280px] flex flex-col border-red-600 bg-zinc-900 shadow-[0_0_30px_rgba(220,38,38,0.12)] z-10"
                            >
                                <div className="flex flex-col h-full w-full">
                                    <div className="flex flex-col flex-grow-0 h-[100px] mb-4">
                                        <h4 className="text-2xl font-bold text-white mb-2 leading-tight">{plan.title}</h4>
                                        <p className="text-zinc-500 text-sm leading-snug">{details.description}</p>
                                    </div>

                                    <div className="flex flex-col flex-grow-0 justify-end h-[120px] border-b border-zinc-800 pb-6 mb-6">
                                        <div className="flex justify-between items-center text-zinc-400 mb-4">
                                            <span className="text-xs uppercase font-bold tracking-wider">Základní</span>
                                            <div className="flex items-baseline whitespace-nowrap">
                                                <span className="text-3xl font-bold text-white">{plan.priceNormal}</span>
                                                <span className="ml-1 text-sm">Kč</span>
                                            </div>
                                        </div>

                                        {plan.priceDiscount ? (
                                            <div className="flex justify-between items-center bg-red-600/10 p-3 rounded-xl border border-red-600/20">
                                                <div className="flex items-center text-red-500 mr-2">
                                                    <Users size={16} className="mr-2 flex-shrink-0" />
                                                    <span className="text-[10px] font-black uppercase leading-none whitespace-nowrap">Do 18 let*</span>
                                                </div>
                                                <div className="flex items-baseline text-red-600 whitespace-nowrap font-black">
                                                    <span className="text-3xl">{plan.priceDiscount}</span>
                                                    <span className="ml-1 text-sm">Kč</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-[46px]"></div>
                                        )}
                                    </div>

                                    <ul className="space-y-4 flex-grow">
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
                        * Cena pro osoby do 18 let platí i pro seniory nad 60 let a držitele průkazu ZTP.
                    </p>
                </div>
            </div>
        </section>
    );
}