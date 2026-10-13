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
        description: "Plně akceptujeme všechny typy karet MultiSport pro vstup do posilovny."
    },
    {
        name: "Benefity",
        image: "/benefity-card.png",
        description: "Radost každý den – využijte svou kartu Benefity k úhradě permanentek nebo vstupů."
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
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-aos="fade-up">
                    <div>
                        <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">
                            Benefity a karty
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black uppercase text-black leading-tight">
                            Podporujeme vaše <br /> <span className="text-red-600">benefity</span>
                        </h3>
                    </div>
                    <div className="max-w-md">
                        <p className="text-zinc-600 text-lg">
                            Cvičení u nás je dostupné pro každého. Kromě standardních plateb podporujeme MultiSport, Benefity a Pluxee.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {cardTypes.map((card, index) => (
                        <div key={card.name} data-aos="fade-up" data-aos-delay={index * 100}>
                        <div
                            className="h-full bg-zinc-100 border border-zinc-300 p-8 rounded-2xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-center justify-center mb-8">
                                <div className="relative w-full aspect-[1.6/1]">
                                    <Image
                                        src={card.image}
                                        alt={card.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover rounded-xl shadow-sm"
                                        priority
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}