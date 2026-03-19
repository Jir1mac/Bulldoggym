import React from 'react';
import Image from 'next/image';
import { Phone, Mail, Facebook, Globe } from 'lucide-react';

interface Trainer {
    id: number;
    name: string;
    specialization: string;
    bio: string;
    imageUrl: string;
    phone: string;
    email: string;
    facebook?: string;
    website?: string;
}

const trainers: Trainer[] = [
    {
        id: 1,
        name: "Lukáš Dundr",
        specialization: "Osobní trenér | Funkční trénink",
        bio: "Celý život jsem byl veden ke sportu a kondici obecně. Obrátit se na mě můžete od základů technik cvičení přes pohybové problémy, bolesti svalstva a celého pohybového aparátu až po trénink na dračím pádle a přípravě na jízdu na dračí lodi.",
        imageUrl: "/Lukáš-Dundr-2-1.jpg",
        phone: "+420 777 123 456",
        email: "lukas.dundr@bulldoggym.cz",
        facebook: "https://facebook.com/lukasdundr",
        website: "https://lukasdundr.cz"
    },
    {
        id: 2,
        name: "Jana Nováková",
        specialization: "Osobní trenérka | Aerobní aktivity",
        bio: "Jsem vášnivá sportovkyně a věřím, že pohyb by měl být radostí pro každého. Specializuji se na aerobní trénink, skupinová cvičení a pomáhám klientkám dosáhnout jejich cílů v příjemné a motivující atmosféře.",
        imageUrl: "/trainers/jana-novakova.jpg",
        phone: "+420 777 234 567",
        email: "jana.novakova@bulldoggym.cz",
        facebook: "https://facebook.com/jananovakova"
    },
    {
        id: 3,
        name: "Petra Dvořáková",
        specialization: "Osobní trenérka | Silový trénink",
        bio: "Sport je pro mě životní styl. Specializuji se na silový a kondiční trénink pro ženy. Pomohu vám dosáhnout vysněné postavy, zvýšit sebevědomí a zlepšit celkovou fyzickou kondici. Neváhejte se na mě obrátit.",
        imageUrl: "/trainers/petra-dvorakova.jpg",
        phone: "+420 777 345 678",
        email: "petra.dvorakova@bulldoggym.cz",
        website: "https://petradvorakova.cz"
    },
    {
        id: 4,
        name: "Martin Svoboda",
        specialization: "Osobní trenér | Kulturistika",
        bio: "Pomohu vám s nabíráním svalové hmoty, formováním postavy a přípravou na závody. Zaměřuji se na správnou techniku, těžké cviky a detailní jídelníčky přizpůsobené vašim cílům.",
        imageUrl: "/trainers/martin-svoboda.jpg",
        phone: "+420 777 456 789",
        email: "martin.svoboda@bulldoggym.cz"
    },
    {
        id: 5,
        name: "Tomáš Král",
        specialization: "Osobní trenér | Kondiční box",
        bio: "Spojte kardio s prvky bojových sportů. Naučím vás základy boxu, zlepšíme vaši dynamiku, vytrvalost a výbušnost. Tréninky jsou vhodné pro muže i ženy všech pokročilostí.",
        imageUrl: "/trainers/tomas-kral.jpg",
        phone: "+420 777 567 890",
        email: "tomas.kral@bulldoggym.cz",
        facebook: "https://facebook.com/tomaskral"
    }
];

export default function Trainers() {
    return (
        <section id="trainers" className="min-h-screen flex items-center py-16 md:py-24 bg-zinc-150 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center w-full">
                <div data-aos="fade-down">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-base mb-4">
                        Náš tým
                    </h2>
                    <h3 className="text-5xl md:text-6xl font-black uppercase text-black mb-16 leading-tight">
                        Poznej náš tým
                    </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-12 text-left">
                    {trainers.map((trainer, index) => (
                        <div
                            key={trainer.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
                            className="w-full md:w-[calc((100%-3rem)/2)] lg:w-[calc((100%-6rem)/3)] bg-zinc-150 rounded-2xl overflow-hidden shadow-lg border border-zinc-800 transition-colors duration-300 flex flex-col"
                        >
                            <div className="relative h-96 w-full overflow-hidden flex-shrink-0">
                                <Image
                                    src={trainer.imageUrl}
                                    alt={trainer.name}
                                    fill
                                    className="object-cover transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h4 className="text-black font-bold text-3xl mb-2">{trainer.name}</h4>
                                <p className="text-red-600 text-lg font-semibold mb-4">{trainer.specialization}</p>
                                <p className="text-zinc-800 text-sm leading-relaxed mb-6 flex-grow">{trainer.bio}</p>

                                <div className="space-y-3 mt-auto pt-6 border-t border-zinc-300/50">
                                    <a href={`tel:${trainer.phone}`} className="flex items-center text-zinc-800 hover:text-red-600 transition-colors w-fit">
                                        <Phone size={18} className="mr-3 text-red-600 flex-shrink-0" />
                                        <span className="text-sm font-medium">{trainer.phone}</span>
                                    </a>
                                    <a href={`mailto:${trainer.email}`} className="flex items-center text-zinc-800 hover:text-red-600 transition-colors w-fit">
                                        <Mail size={18} className="mr-3 text-red-600 flex-shrink-0" />
                                        <span className="text-sm font-medium">{trainer.email}</span>
                                    </a>

                                    {(trainer.facebook || trainer.website) && (
                                        <div className="flex gap-4 pt-2">
                                            {trainer.facebook && (
                                                <a
                                                    href={trainer.facebook}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-zinc-800 hover:text-red-600 transition-colors"
                                                    aria-label={`Facebook profil - ${trainer.name}`}
                                                >
                                                    <Facebook size={20} className="text-red-600" />
                                                </a>
                                            )}
                                            {trainer.website && (
                                                <a
                                                    href={trainer.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center text-zinc-800 hover:text-red-600 transition-colors"
                                                    aria-label={`Webové stránky - ${trainer.name}`}
                                                >
                                                    <Globe size={20} className="text-red-600" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}