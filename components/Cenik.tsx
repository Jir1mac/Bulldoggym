import React from 'react';
import { Check, Users } from 'lucide-react';

const pricingPlans = [
    {
        title: "Měsíční členství",
        description: "Pravidelný trénink bez omezení počtu vstupů.",
        priceNormal: "1 390",
        priceDiscount: "990",
        features: ["Neomezený přístup 30 dní", "Vstup na všechny stroje", "Bez registrace a závazků"],
        highlight: true,
    },
    {
        title: "Čtvrtletní členství",
        description: "3 měsíce pro tvou proměnu.",
        priceNormal: "4 000",
        priceDiscount: "2 900",
        features: ["Výhodnější cena", "90 dní tréninku", "Stabilní režim"],
        highlight: true,
    },
    {
        title: "Pololetní členství",
        description: "Půl roku disciplíny a výsledků.",
        priceNormal: "8 000",
        priceDiscount: "5 800",
        features: ["Dlouhodobý progres", "180 dní tréninku", "Ušetříte 1600 Kč"],
        highlight: true,
    },
    {
        title: "Roční členství",
        description: "Maximální závazek, nejlepší cena.",
        priceNormal: "16 000",
        priceDiscount: "11 000",
        features: ["TOP cena za měsíc", "365 dní tréninku", "Nejlepší investice"],
        highlight: true,
    }
];

export default function Pricing() {
    return (
        <section id="cenik" className="py-24 min-h-screen flex items-center bg-zinc-100 px-6 overflow-hidden">
            <div className="max-w-[1500px] mx-auto w-full">

                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">Ceník Bulldog Gym</h2>
                    <h3 className="text-5xl md:text-6xl font-black uppercase text-black mb-6">Investuj do <span className="text-red-600">sebe</span></h3>
                </div>

                <div className="mt-16 mb-5 text-center" data-aos="zoom-in" data-aos-delay="200">
                    <p className="text-zinc-700 text-sm ">
                        Permanentka na 10 vstupů: 1100 Kč
                    </p>
                    <p className="text-red-600 font-bold uppercase mt-4 tracking-widest">
                        Jednorázové vstupné: 130 Kč
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 xl:gap-8">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                            className={`relative p-8 rounded-3xl border transition-all duration-300 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2rem)] min-w-[300px] flex flex-col ${
                                plan.highlight
                                    ? 'border-red-600 bg-zinc-900 shadow-[0_0_30px_rgba(220,38,38,0.15)] lg:scale-105 z-10'
                                    : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                            }`}
                        >
                            <div className="flex-grow">
                                <h4 className="text-2xl font-bold text-white mb-2 leading-tight">{plan.title}</h4>
                                <p className="text-zinc-500 mb-8 text-sm h-10 leading-snug">{plan.description}</p>

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
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-zinc-300 text-sm">
                                            <Check className="text-red-600 mr-3 mt-1 flex-shrink-0" size={16} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Patička ceníku s animací fade-up */}
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