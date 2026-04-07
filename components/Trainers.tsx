import React from 'react';
import Image from 'next/image';
import { Phone, Mail, Facebook, Globe } from 'lucide-react';

interface Trainer {
    id: number;
    name: string;
    specialization?: string;
    bio?: string;
    imageUrl?: string;
    phone: string;
    email?: string;
    facebook?: string;
    website?: string;
}

const trainers: Trainer[] = [
    {
        id: 1,
        name: "Michaela Stoklasová",
        specialization: "Osobní fitness trenérka",
        bio: "Sportu se věnuji od malička, ve fitness se pohybuji od roku 2018. Mám za sebou závodní přípravy i soutěže v bikini fitness, které mi daly cenné zkušenosti.\n\nJako trenérka působím od roku 2023 a pomáhám klientům zlepšit kondici, postavu i životní styl. Specializuji se na silový a kondiční trénink, tréninkové i stravovací plány a individuální přístup.\n\nNevíte si rady v posilovně nebo se stravou? Ráda vám pomůžu najít správnou cestu a dosáhnout vašich cílů.",
        imageUrl: "/trener2.jpg",
        phone: "+420 775 108 037",
    },
    {
        id: 2,
        name: "Luboš Dundr",
        specialization: "Osobní trenér",
        bio: "Sport mi v životě dal a dává mnoho a vždy mě bavilo hledat cesty, jak trénovat správně tak, abych dosáhl svých cílů. Důležité je mít silnou motivaci a vědět proč chci něčeho dostáhnout a dokázat přistoupit k životnímu stylu a tréninku tak, aby člověk dospěl k úspěchu! Neváhejte se na mě obrátit.",
        imageUrl: "/trener3.jpg",
        phone: "+420 777 123 456",
    },
    {
        id: 3,
        name: "Linda Gruber",
        specialization: "Osobní trenérka",
        imageUrl: "/trener1.jpg",
        phone: "+420 773 998 112",
    },
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
                            <div className="relative h-96 w-full overflow-hidden flex-shrink-0 bg-zinc-200">
                                {trainer.imageUrl && (
                                    <Image
                                        src={trainer.imageUrl}
                                        alt={trainer.name}
                                        fill
                                        className="object-cover transition-transform duration-500"
                                    />
                                )}
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h4 className="text-black font-bold text-3xl mb-2">{trainer.name}</h4>
                                <p className="text-red-600 text-lg font-semibold mb-4">{trainer.specialization ?? "\u00A0"}</p>
                                {trainer.bio && (
                                    <p className="text-zinc-800 text-sm leading-relaxed mb-6 flex-grow whitespace-pre-line">{trainer.bio}</p>
                                )}

                                <div className="space-y-3 mt-auto pt-6 border-t border-zinc-300/50">
                                    <a href={`tel:${trainer.phone}`} className="flex items-center text-zinc-800 hover:text-red-600 transition-colors w-fit">
                                        <Phone size={18} className="mr-3 text-red-600 flex-shrink-0" />
                                        <span className="text-sm font-medium">{trainer.phone}</span>
                                    </a>
                                    {trainer.email && (
                                        <a href={`mailto:${trainer.email}`} className="flex items-center text-zinc-800 hover:text-red-600 transition-colors w-fit">
                                            <Mail size={18} className="mr-3 text-red-600 flex-shrink-0" />
                                            <span className="text-sm font-medium">{trainer.email}</span>
                                        </a>
                                    )}

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