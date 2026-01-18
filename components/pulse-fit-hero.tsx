"use client";

import React from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
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
        <section
            className={cn(
                "relative w-full min-h-screen flex flex-col overflow-hidden pt-[60px]", // Menší pt, když není fixní header
                className
            )}
            style={{
                background: "linear-gradient(180deg, #E8F0FF 0%, #F5F9FF 50%, #FFFFFF 100%)",
            }}
        >
            {/* Samotný obsah Hero sekce */}
            {children ? (
                <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                    {children}
                </div>
            ) : (
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center text-center max-w-4xl"
                        style={{ gap: "32px" }}
                    >
                        <h1
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 700,
                                fontSize: "clamp(36px, 6vw, 72px)",
                                lineHeight: "1.1",
                                color: "#1a1a1a",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {title}
                        </h1>

                        <p
                            style={{
                                fontFamily: "Inter, sans-serif",
                                fontWeight: 400,
                                fontSize: "clamp(16px, 2vw, 20px)",
                                lineHeight: "1.6",
                                color: "#4a5568",
                                maxWidth: "600px",
                            }}
                        >
                            {subtitle}
                        </p>

                        {(primaryAction || secondaryAction) && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-col sm:flex-row items-center gap-4"
                            >
                                {primaryAction && (
                                    primaryAction.href ? (
                                        <a href={primaryAction.href} className="flex flex-row items-center gap-2 px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer" style={{ background: "#1a1a1a", color: "#FFFFFF", fontWeight: 500 }}>
                                            {primaryAction.label}
                                        </a>
                                    ) : (
                                        <button onClick={primaryAction.onClick} className="px-8 py-4 rounded-full transition-all hover:scale-105" style={{ background: "#1a1a1a", color: "#FFFFFF" }}>
                                            {primaryAction.label}
                                        </button>
                                    )
                                )}

                                {secondaryAction && (
                                    <a href={secondaryAction.href} className="px-8 py-4 rounded-full border border-gray-300 transition-all hover:scale-105" style={{ color: "#1a1a1a" }}>
                                        {secondaryAction.label}
                                    </a>
                                )}
                            </motion.div>
                        )}

                        {socialProof && (
                            <motion.div className="flex flex-row items-center gap-3">
                                <div className="flex flex-row -space-x-2">
                                    {socialProof.avatars.map((avatar, index) => (
                                        <Image key={index} src={avatar} alt="User" width={40} height={40} className="rounded-full border-2 border-white" />
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-gray-600">{socialProof.text}</span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Program slider na spodní straně zůstává */}
            {programs.length > 0 && (
                <motion.div
                    className="relative z-10 w-full overflow-hidden pb-16"
                >
                    <motion.div
                        className="flex items-center"
                        animate={{ x: [0, -((programs.length * 380) / 2)] }}
                        transition={{ repeat: Infinity, duration: programs.length * 3, ease: "linear" }}
                        style={{ gap: "24px", paddingLeft: "24px" }}
                    >
                        {[...programs, ...programs].map((program, index) => (
                            <div key={index} className="flex-shrink-0 w-[356px] h-[480px] rounded-[24px] relative overflow-hidden shadow-xl">
                                <Image src={program.image} alt={program.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                    <span className="text-xs font-bold text-white/80 uppercase">{program.category}</span>
                                    <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}