import React from 'react';
import { Dumbbell, Users, Trophy, HandHeart } from 'lucide-react';

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
                            Více než 20 let tradice <br /> v srdci <span className="text-red-600">Mostu</span>
                        </h3>
                        <div className="space-y-4 text-zinc-600 text-lg md:text-xl leading-relaxed">
                            <p>
                                Bulldog Gym není jen obyčejná posilovna. Jsme komunita postavená na disciplíně a výsledcích.
                                Na ploše přes <strong>1000 m²</strong> najdeš vybavení světové úrovně, které nikde jinde v regionu nepotkáš.
                            </p>
                            <p>
                                Náš koncept &quot;Made in USA&quot; přináší stroje značek Cybex, Nautilus a Hoist, které jsou špičkou v oboru.
                                Ať už jsi začátečník nebo profesionální sportovec, v Bulldog Gymu najdeš vše potřebné pro svůj posun.
                            </p>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div
                            data-aos="fade-up"
                            data-aos-delay="100"
                            className="bg-zinc-100 border border-zinc-800 p-6 md:p-8 lg:p-12 rounded-2xl hover:border-red-600/50 transition-colors"
                        >
                            <Dumbbell className="text-red-600 mb-4" size={38} />
                            <h4 className="text-black font-bold text-xl mb-2">80 stanovišť</h4>
                            <p className="text-zinc-500 text-sm">Široká škála strojů pro procvičení každého svalu na těle.</p>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            className="bg-zinc-100 border border-zinc-800 p-6 md:p-8 lg:p-12 rounded-2xl hover:border-red-600/50 transition-colors"
                        >
                            <Users className="text-red-600 mb-4" size={38} />
                            <h4 className="text-black font-bold text-xl mb-2">Komunita</h4>
                            <p className="text-zinc-500 text-sm">Podporující prostředí, kde si všichni pomáhají k lepším výsledkům.</p>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="bg-zinc-100 border border-zinc-800 p-6 md:p-8 lg:p-12 rounded-2xl hover:border-red-600/50 transition-colors"
                        >
                            <Trophy className="text-red-600 mb-4" size={38} />
                            <h4 className="text-black font-bold text-xl mb-2">Pro vybavení</h4>
                            <p className="text-zinc-500 text-sm">Stroje Cybex a Nautilus, které najdete v nejlepších gymech světa.</p>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="bg-zinc-100 border border-zinc-800 p-6 md:p-8 lg:p-12 rounded-2xl hover:border-red-600/50 transition-colors"
                        >
                            <HandHeart className="text-red-600 mb-4" size={38} />
                            <h4 className="text-black font-bold text-xl mb-2">Masáže</h4>
                            <p className="text-zinc-500 text-sm">Také si u nás můžete dopřát odpočinek v podobě masáže nebo rázové vlny. <a className="hover:text-red-700 text-red-500" href="https://most-masaze.cz/">Více informací</a> </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}