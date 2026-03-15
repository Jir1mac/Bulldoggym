import React from 'react';
import { Dumbbell, Trophy, HandHeart } from 'lucide-react';

export default function About() {
    return (
        <section id="o-nas" className="py-16 md:py-24 min-h-screen flex items-center bg-zinc-100 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <div data-aos="fade-right">
                        <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">
                            Příběh Bulldog Gymu
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black uppercase text-black mb-6 leading-tight">
                            Více než 10 let zkušeností <br /> v srdci <span className="text-red-600">Mostu</span>
                        </h3>
                        <div className="space-y-4 text-zinc-600 text-lg md:text-xl leading-relaxed">
                            <p>
                                Od roku 2013 budujeme v Mostě místo, které neustále modernizujeme, abyste u nás našli to nejlepší pro svůj trénink.
                                Na ploše <strong>1 000 m²</strong> najdete kvalitní vybavení značek <strong>CYBEX, TUFF STUFF, TECHNOGYM, IMPULSE, HOIST a NAUTILUS</strong>.
                            </p>
                            <p>
                                Cvičební prostor je rozdělen do <strong>5 sálů</strong>, kde najdete 80 stanovišť posilovacích strojů.
                                V našem fitness centru si přijdou na své příznivci činek, strojů, ale i ti, kteří dávají přednost aerobním aktivitám.
                            </p>
                            <p>
                                Zakládáme si na přátelské a příjemné atmosféře.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="bg-zinc-100 border border-zinc-800 p-6 md:p-8 lg:p-12 rounded-2xl transition-colors"
                        >
                            <Dumbbell className="text-red-600 mb-4" size={38} />
                            <h4 className="text-black font-bold text-xl mb-2">80 stanovišť</h4>
                            <p className="text-zinc-500 text-sm">5 sálů s širokou škálou strojů pro procvičení každého svalu na těle.</p>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="bg-zinc-100 border border-zinc-800 p-6 md:p-8 lg:p-12 rounded-2xl  transition-colors"
                        >
                            <Trophy className="text-red-600 mb-4" size={38} />
                            <h4 className="text-black font-bold text-xl mb-2">Špičkové vybavení</h4>
                            <p className="text-zinc-500 text-sm">Stroje značek CYBEX, TUFF STUFF, TECHNOGYM, IMPULSE, HOIST a NAUTILUS.</p>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="bg-zinc-100 border border-zinc-800 p-6 md:p-8 lg:p-12 rounded-2xl  transition-colors"
                        >
                            <HandHeart className="text-red-600 mb-4" size={38} />
                            <h4 className="text-black font-bold text-xl mb-2">Masáže</h4>
                            <p className="text-zinc-500 text-sm">Také si u nás můžete dopřát odpočinek v podobě masáže nebo rázové vlny. <a className="hover:text-red-700 text-red-500" href="https://most-masaze.cz/">Více informací</a></p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}