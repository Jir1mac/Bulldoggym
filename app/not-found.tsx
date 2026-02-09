'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dumbbell, ArrowLeft, TriangleAlert } from 'lucide-react';

export default function BulldogNotFound() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-zinc-100 px-4 overflow-hidden">
            <div className="container mx-auto max-w-3xl text-center relative">

                <div className="absolute inset-0 flex items-center justify-center -z-10 select-none">
                    <span className="text-[15rem] md:text-[25rem] font-black text-zinc-200/50 leading-none">
                        404
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center mb-8">
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="bg-red-600 p-6 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.3)] text-white"
                        >
                            <Dumbbell size={64} strokeWidth={2.5} />
                        </motion.div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase text-black mb-4 tracking-tighter">
                        Tuhle váhu <span className="text-red-600">nezvedneš</span>
                    </h1>

                    <p className="text-zinc-600 text-lg md:text-xl font-bold uppercase tracking-wide mb-12 max-w-lg mx-auto">
                        Stránka, kterou hledáš, buď neexistuje, nebo měla mít leg-day tak tu radši není.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link
                            href="/"
                            className="group relative px-10 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest rounded-xl transition-all hover:bg-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <ArrowLeft size={20} />
                                Zpět do fitka
                            </span>
                        </Link>

                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 border-t border-zinc-200 pt-8"
                >
                    <p className="text-zinc-400 font-black uppercase text-sm tracking-[0.2em]">
                        Žádný výmluvy. Vrať se k tréninku.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}