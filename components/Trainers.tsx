import React from 'react';
import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

const trainers = [
    {
        id: 1,
        name: "Lukáš Dundr",
        specialization: "Osobní trenér | Funkční trénink",
        bio: "Celý život jsem byl veden ke sportu a kondici obecně. Obrátit se na mě můžete od základů technik cvičení přes pohybové problémy, bolesti svalstva a celého pohybového aparátu až po trénink na dračím pádle a přípravě na jízdu na dračí lodi.",
        imageUrl: "/Lukáš-Dundr-2-1.jpg",
        phone: "+420 777 123 456",
        email: "lukas.dundr@bulldoggym.cz",
    },
    {
        id: 2,
        name: "Luboš Dundr",
        specialization: "Kulturistika | Silový trénink",
        bio: "Sport mi v životě dal a dává mnoho a vždy mě bavilo hledat cesty, jak trénovat správně tak, abych dosáhl svých cílů. Důležité je mít silnou motivaci a vědět proč chci něčeho dostáhnout a dokázat přistoupit k životnímu stylu a tréninku tak, aby člověk dospěl k úspěchu! Neváhejte se na mě obrátit.",
        imageUrl: "/trainers/petr-svoboda.jpg", // Tady si pak oprav cestu k fotce, jako u Lukáše
        phone: "+420 777 987 654",
        email: "lubos.dundr@bulldoggym.cz",
    },
];

export default function Trainers() {
    return (
        // Přidán overflow-hidden kvůli animacím
        <section id="trainers" className="min-h-screen flex items-center py-16 md:py-24 bg-zinc-150 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center">

                {/* Nadpisy přijedou shora */}
                <div data-aos="fade-down">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-base mb-4">
                        Naši experti
                    </h2>
                    <h3 className="text-5xl md:text-6xl font-black uppercase text-black mb-16 leading-tight">
                        Osobní trenéři <br className="hidden md:inline" /> Bulldog Gym
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {trainers.map((trainer, index) => (
                        <div
                            key={trainer.id}
                            // Karty trenérů přijedou zdola s delayem
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
                            className="bg-zinc-150 rounded-2xl overflow-hidden shadow-lg border border-zinc-800 hover:border-red-600 transition-colors duration-300"
                        >
                            <div className="relative h-96 w-full overflow-hidden">
                                <Image
                                    src={trainer.imageUrl}
                                    alt={trainer.name}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="p-8 text-left">
                                <h4 className="text-black font-bold text-3xl mb-2">{trainer.name}</h4>
                                <p className="text-red-600 text-lg font-semibold mb-4">{trainer.specialization}</p>
                                <p className="text-zinc-800 text-sm leading-relaxed mb-6">{trainer.bio}</p>

                                <div className="space-y-3">
                                    <a href={`tel:${trainer.phone}`} className="flex items-center text-zinc-800 hover:text-red-500 transition-colors cursor-pointer">
                                        <Phone size={20} className="mr-3 text-red-600" />
                                        {trainer.phone}
                                    </a>
                                    <a href={`mailto:${trainer.email}`} className="flex items-center text-zinc-800 hover:text-red-500 transition-colors cursor-pointer">
                                        <Mail size={20} className="mr-3 text-red-600" />
                                        {trainer.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}