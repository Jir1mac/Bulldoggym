"use client";

import React from "react";
import Image from 'next/image';
import { motion, MotionConfig } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgramCard {
    image: string;
    category: string;
    title: string;
    onClick?: () => void;
}

interface PulseFitHeroProps {
    title: string;
    subtitle: string;
    primaryAction?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    secondaryAction?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
    disclaimer?: string;
    socialProof?: {
        avatars: string[];
        text: string;
    };
    programs?: ProgramCard[];
    className?: string;
    children?: React.ReactNode;
}

export function PulseFitHero({
                                 title = "Tvůj limit je v hlavě. Překonej ho u nás.",
                                 subtitle = "Největší posilovna v Mostě na ploše 1000 m². Špičkové vybavení značek Cybex a Nautilus.",
                                 primaryAction,
                                 secondaryAction,
                                 disclaimer = "*Přijímáme karty MultiSport a ActivePass",
                                 socialProof,
                                 programs = [],
                                 className,
                                 children,
                             }: PulseFitHeroProps) {
    return (
        <MotionConfig reducedMotion="user">
        <section
            className={cn(
                "relative w-full min-h-screen flex flex-col overflow-hidden pt-[60px] bg-zinc-150", // Tvoje barva pozadí
                className
            )}
            role="banner"
        >
            {children ? (
                <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                    {children}
                </div>
            ) : (
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center text-center max-w-4xl"
                        style={{ gap: "32px" }}
                    >
                        <h1
                            className="uppercase italic tracking-tighter"
                            style={{
                                fontFamily: "system-ui, -apple-system, sans-serif",
                                fontWeight: 500,
                                fontSize: "clamp(40px, 8vw, 84px)",
                                lineHeight: "0.9",
                                color: "#000000",
                            }}
                        >
                            {title}
                        </h1>

                        <p
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 500,
                                fontSize: "clamp(16px, 2vw, 20px)",
                                lineHeight: "1.6",
                                color: "#3f3f46",
                                maxWidth: "650px",
                            }}
                        >
                            {subtitle}
                        </p>

                        {(primaryAction || secondaryAction) && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col sm:flex-row items-center gap-4"
                            >
                                {primaryAction && (
                                    <a
                                        href={primaryAction.href}
                                        onClick={primaryAction.onClick}
                                        className="flex flex-row items-center gap-2 px-10 py-5 rounded-xl transition-all duration-300 ease-out hover:-translate-y-0.5 cursor-pointer uppercase font-black italic shadow-lg hover:shadow-xl bg-red-600 text-white hover:bg-red-700"
                                    >
                                        {primaryAction.label}
                                    </a>
                                )}

                                {secondaryAction && (
                                    <a
                                        href={secondaryAction.href}
                                        onClick={secondaryAction.onClick}
                                        className="px-10 py-5 rounded-xl border-2 border-zinc-900 transition-all duration-300 ease-out hover:bg-zinc-900 hover:text-white cursor-pointer uppercase font-black italic"
                                    >
                                        {secondaryAction.label}
                                    </a>
                                )}
                            </motion.div>
                        )}

                        {socialProof && (
                            <motion.div className="flex flex-row items-center gap-3 bg-white/50 p-2 rounded-full pr-6 border border-zinc-200">
                                <div className="flex flex-row -space-x-2">
                                    {socialProof.avatars.map((avatar, index) => (
                                        <div key={index} className="relative w-10 h-10 border-2 border-zinc-150 rounded-full overflow-hidden">
                                            <Image src={avatar} alt="User" fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-zinc-800 uppercase tracking-tight">{socialProof.text}</span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Program slider na spodní straně */}
            {programs.length > 0 && (
                <motion.div
                    className="relative z-10 w-full overflow-hidden pb-16 pt-10"
                >
                    <motion.div
                        className="flex items-center"
                        animate={{ x: [0, -((programs.length * 380) / 2)] }}
                        transition={{ repeat: Infinity, duration: programs.length * 5, ease: "linear" }}
                        style={{ gap: "24px", paddingLeft: "24px" }}
                    >
                        {[...programs, ...programs].map((program, index) => (
                            <div key={index} className="flex-shrink-0 w-[350px] h-[450px] rounded-[24px] relative overflow-hidden shadow-lg border border-zinc-200">
                                <Image src={program.image} alt={program.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8">
                                    <span className="text-red-600 font-black uppercase tracking-widest text-sm mb-1">{program.category}</span>
                                    <h3 className="text-2xl font-black text-white uppercase italic leading-none">{program.title}</h3>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </section>
        </MotionConfig>
    );
}