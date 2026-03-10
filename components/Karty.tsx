import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';

interface CardType {
    name: string;
    description: string;
}

const cardTypes: CardType[] = [
    {
        name: "MultiSport",
        description: "Plně akceptujeme všechny typy karet MultiSport pro vstup do posilovny."
    },
    {
        name: "ActivePass",
        description: "Využijte své zaměstnanecké benefity skrze program ActivePass od Sodexo."
    },
    {
        name: "Benefit Plus",
        description: "Pohodlná platba kartou Benefit Plus nebo skrze mobilní aplikaci."
    },
    {
        name: "Edenred",
        description: "Přijímáme volnočasové karty Edenred Card (Sport & Kultura)."
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
                            Cvičení u nás je dostupné pro každého. Kromě standardních plateb podporujeme širokou škálu benefitních programů.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cardTypes.map((card, index) => (
                        <div
                            key={card.name}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group bg-zinc-100 border border-zinc-800 p-8 rounded-2xl transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="bg-black p-3 rounded-xl  transition-colors">
                                    <CreditCard className="text-white" size={24} />
                                </div>
                                <CheckCircle2 className="text-red-600 opacity-0 transition-opacity" size={20} />
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