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
        <section className="py-12 md:py-24 bg-zinc-100 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6" data-aos="fade-up">
                    <div>
                        <p className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3 md:mb-4">
                            Benefity a karty
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black leading-tight">
                            Podporujeme vaše <br /> <span className="text-red-600">benefity</span>
                        </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-zinc-600 text-base md:text-lg">
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
                            className="bg-zinc-100 border border-zinc-300 p-5 md:p-8 rounded-2xl"
                        >
                            <div className="flex items-center justify-center mb-5 md:mb-8">
                                <div className="relative w-full aspect-[1.6/1]">
                                    <Image
                                        src={card.image}
                                        alt={`Karta ${card.name} – platba v posilovně Bulldog Gym Most`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover rounded-xl shadow-sm"
                                    />
                                </div>
                            </div>
                            <h3 className="text-black font-bold text-xl md:text-2xl mb-2 md:mb-3 uppercase tracking-tight">
                                {card.name}
                            </h3>
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