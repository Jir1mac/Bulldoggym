import React from 'react';
import { Dumbbell, Trophy, HandHeart } from 'lucide-react';

const cardClass = "bg-zinc-100 border border-zinc-800 p-5 md:p-8 lg:p-12 rounded-2xl";

export default function About() {
    return (
        <section id="o-nas" className="py-12 md:py-24 md:min-h-screen flex items-center bg-zinc-100 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">

                    <div data-aos="fade-up">
                        <p className="text-red-600 font-bold tracking-widest uppercase text-sm mb-3 md:mb-4">
                            Posilovna a fitness v Mostě od roku 2013
                        </p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-black mb-4 md:mb-6 leading-tight">
                            Více než 10 let zkušeností <br /> v srdci <span className="text-red-600">Mostu</span>
                        </h2>
                        <div className="space-y-4 text-zinc-600 text-base md:text-xl leading-relaxed">
                            <p>
                                Od roku 2013 budujeme v Mostě místo, které neustále modernizujeme, abyste u nás našli to nejlepší pro svůj trénink.
                                Na ploše <strong>1 000 m²</strong> najdete kvalitní vybavení značek <strong>CYBEX, TUFF STUFF, TECHNOGYM, IMPULSE, HOIST a NAUTILUS</strong>.
                            </p>
                            <p>
                                Cvičební prostor je rozdělen do <strong>5 sálů</strong>, kde najdete 90 stanovišť posilovacích strojů.
                                V našem fitness centru si přijdou na své příznivci činek, strojů, ale i ti, kteří dávají přednost aerobním aktivitám.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        <div data-aos="fade-up" data-aos-delay="100" className={cardClass}>
                            <Dumbbell className="text-red-600 mb-3 md:mb-4 w-8 h-8 md:w-[38px] md:h-[38px]" size={38} />
                            <h3 className="text-black font-bold text-lg md:text-xl mb-1 md:mb-2">90 stanovišť</h3>
                            <p className="text-zinc-500 text-sm">5 sálů s širokou škálou strojů pro procvičení každého svalu na těle.</p>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="200" className={cardClass}>
                            <Trophy className="text-red-600 mb-3 md:mb-4 w-8 h-8 md:w-[38px] md:h-[38px]" size={38} />
                            <h3 className="text-black font-bold text-lg md:text-xl mb-1 md:mb-2">Špičkové vybavení</h3>
                            <p className="text-zinc-500 text-sm">Stroje značek CYBEX, TUFF STUFF, TECHNOGYM, IMPULSE, HOIST a NAUTILUS.</p>
                        </div>

                        <div data-aos="fade-up" data-aos-delay="300" className={cardClass}>
                            <HandHeart className="text-red-600 mb-3 md:mb-4 w-8 h-8 md:w-[38px] md:h-[38px]" size={38} />
                            <h3 className="text-black font-bold text-lg md:text-xl mb-1 md:mb-2">Masáže</h3>
                            <p className="text-zinc-500 text-sm">Také si u nás můžete dopřát odpočinek v podobě masáže nebo rázové vlny. <a className="hover:text-red-700 text-red-500 transition-colors duration-300" href="https://most-masaze.cz/">Více informací</a></p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
