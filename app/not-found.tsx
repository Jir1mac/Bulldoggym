'use client';

import React from 'react';
import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';
import { Dumbbell, ArrowLeft } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function BulldogNotFound() {
    return (
        <MotionConfig reducedMotion="user">
        <section className="min-h-screen flex items-center justify-center bg-zinc-100 px-4 overflow-hidden">
            <div className="container mx-auto max-w-3xl text-center relative">

                <div className="absolute inset-0 flex items-center justify-center -z-10 select-none">
                    <span className="text-[10rem] md:text-[25rem] font-black text-zinc-200/50 leading-none">
                        404
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease }}
                >
                    <div className="flex justify-center mb-8">
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="bg-red-600 p-4 md:p-6 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.15)] text-white"
                        >
                            <Dumbbell size={64} strokeWidth={2.5} />
                        </motion.div>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black uppercase text-black mb-4 tracking-tighter">
                        Tuhle váhu <span className="text-red-600">nezvedneš</span>
                    </h1>

                    <p className="text-zinc-600 text-base md:text-xl font-bold uppercase tracking-wide mb-8 md:mb-12 max-w-lg mx-auto">
                        Stránka, kterou hledáš, buď neexistuje, nebo měla mít leg-day tak tu radši není.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                        <Link
                            href="/"
                            className="group relative px-8 py-4 md:px-10 md:py-5 bg-zinc-900 text-white font-black uppercase tracking-widest rounded-xl transition-all duration-300 ease-out hover:bg-red-600 hover:shadow-lg overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <ArrowLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1" />
                                Zpět do fitka
                            </span>
                        </Link>

                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-12 md:mt-20 border-t border-zinc-200 pt-8"
                >
                    <p className="text-zinc-400 font-black uppercase text-sm tracking-[0.2em]">
                        Žádný výmluvy. Vrať se k tréninku.
                    </p>
                </motion.div>
            </div>
        </section>
        </MotionConfig>
    );
}
