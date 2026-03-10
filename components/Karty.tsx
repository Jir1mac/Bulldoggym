import React from 'react';
import Image from 'next/image';

interface CardType {
    name: string;
    description: string;
    image: string;
}

const cardTypes: CardType[] = [
    {
        name: "MultiSport",
        image: "/multisport-card.png",
        description: "Plně akceptujeme všechny typy karet MultiSport pro vstup do posilovny i na skupinové lekce."
    },
    {
        name: "Benefity",
        image: "/benefity-card.png",
        description: "Radost každý den – využijte svou kartu Benefity k úhradě členství nebo vstupů."
    },
    {
        name: "Pluxee",
        image: "/pluxee-card.png",
        description: "Přijímáme karty Pluxee (dříve Sodexo) – jednoduché a rychlé čerpání vašich benefitů."
    }
];

export default function AcceptedCards() {
    return (
        <section className="py-16 md:py-24 bg-zinc-100 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div data-aos="fade-right">
                        <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">
                            Benefity a karty
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black uppercase text-black leading-tight">
                            Podporujeme vaše <br /> <span className="text-red-600">benefity</span>
                        </h3>
                    </div>
                    <div className="max-w-md" data-aos="fade-left">
                        <p className="text-zinc-600 text-lg">
                            Cvičení u nás je dostupné pro každého. Kromě standardních plateb podporujeme MultiSport, Benefity a Pluxee.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {cardTypes.map((card, index) => (
                        <div
                            key={card.name}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group bg-zinc-100 border border-zinc-800 p-8 rounded-2xl transition-all duration-300"
                        >
                            <div className="flex items-center justify-center mb-6">
                                <div className="relative w-48 h-32">
                                    <Image
                                        src={card.image}
                                        alt={card.name}
                                        fill
                                        sizes="192px"
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <h4 className="text-black font-bold text-2xl mb-3 uppercase tracking-tight">
                                {card.name}
                            </h4>
                            <p className="text-zinc-500 text-sm leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}