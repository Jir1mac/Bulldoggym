"use client";

import React, { useState } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavigationItem {
    label: string;
    hasDropdown?: boolean;
    onClick?: () => void;
    href?: string;
}

interface ProgramCard {
    image: string;
    category: string;
    title: string;
    onClick?: () => void;
}

interface PulseFitHeroProps {
    logo?: string;
    navigation?: NavigationItem[];
    ctaButton?: {
        label: string;
        onClick?: () => void;
        href?: string;
    };
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
                                 logo = "Bulldog Gym Most",
                                 navigation = [
                                     { label: "O nás" },
                                     { label: "Služby", hasDropdown: true },
                                     { label: "Trenéři" },
                                     { label: "Ceník" },
                                     { label: "Kontakt" },
                                 ],
                                 ctaButton,
                                 title = "Tvůj limit je v hlavě. Překonej ho u nás.",
                                 subtitle = "Největší posilovna v Mostě na ploše 1000 m². Špičkové vybavení značek Cybex a Nautilus, profesionální trenéři a komunita, která tě nenechá přestat.",
                                 primaryAction,
                                 secondaryAction,
                                 disclaimer = "*Přijímáme karty MultiSport a ActivePass",
                                 socialProof,
                                 programs = [
                                     {
                                         image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop",
                                         category: "SILOVÁ ZÓNA",
                                         title: "80 stanovišť a stroje Cybex",
                                     },
                                     {
                                         image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
                                         category: "KARDIO",
                                         title: "Moderní aerobní zóna",
                                     },
                                     {
                                         image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
                                         category: "TRADICE",
                                         title: "Více než 20 let zkušeností",
                                     },
                                     {
                                         image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=500&fit=crop",
                                         category: "REGENERACE",
                                         title: "Masáže a lymfodrenáže",
                                     },
                                 ],
                                 className,
                                 children,
                             }: PulseFitHeroProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section
            className={cn(
                "relative w-full min-h-screen flex flex-col overflow-hidden pt-[100px]",
                className
            )}
            style={{
                background: "linear-gradient(180deg, #E8F0FF 0%, #F5F9FF 50%, #FFFFFF 100%)",
            }}
            role="banner"
            aria-label="Hero section"
        >
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 left-0 w-full z-50 flex flex-row justify-between items-center px-4 sm:px-8 lg:px-16 bg-white/80 backdrop-blur-md"
                style={{
                    paddingTop: "20px",
                    paddingBottom: "20px",
                }}
            >
                <div
                    style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(18px, 5vw, 24px)",
                        color: "#1a1a1a",
                    }}
                >
                    {logo}
                </div>

                <nav className="hidden lg:flex flex-row items-center gap-8" aria-label="Main navigation">
                    {navigation.map((item, index) => {
                        const content = (
                            <>
                                <span>{item.label}</span>
                                {item.hasDropdown && (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M4 6L8 10L12 6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </>
                        );

                        const commonProps = {
                            onClick: item.onClick,
                            className: "flex flex-row items-center gap-1 text-gray-600 hover:text-red-600 transition-colors cursor-pointer",
                            style: {
                                fontFamily: "Inter, sans-serif",
                                fontSize: "16px",
                                fontWeight: 400,
                            } as React.CSSProperties,
                        };

                        if (item.href) {
                            return (
                                <a key={index} {...commonProps} href={item.href}>
                                    {content}
                                </a>
                            );
                        }

                        return (
                            <button key={index} {...commonProps}>
                                {content}
                            </button>
                        );
                     })}
                </nav>

                <div className="flex items-center gap-4">
                    {ctaButton && (
                        ctaButton.href ? (
                            <a
                                href={ctaButton.href}
                                className="hidden sm:inline-block px-4 lg:px-6 py-2 lg:py-3 rounded-full transition-all hover:scale-105 cursor-pointer text-sm lg:text-base"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #e2e8f0",
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: 500,
                                    color: "#1a1a1a",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                                }}
                            >
                                {ctaButton.label}
                            </a>
                        ) : (
                            <button
                                onClick={ctaButton.onClick}
                                className="hidden sm:inline-block px-4 lg:px-6 py-2 lg:py-3 rounded-full transition-all hover:scale-105 cursor-pointer text-sm lg:text-base"
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #e2e8f0",
                                    fontFamily: "Inter, sans-serif",
                                    fontWeight: 500,
                                    color: "#1a1a1a",
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                                }}
                            >
                                {ctaButton.label}
                            </button>
                        )
                    )}

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-[70px] left-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-40 lg:hidden overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4" aria-label="Mobile navigation">
                            {navigation.map((item, index) => {
                                const content = (
                                    <span className="text-lg">{item.label}</span>
                                );

                                const commonProps = {
                                    onClick: () => {
                                        item.onClick?.();
                                        setMobileMenuOpen(false);
                                    },
                                    className: "py-3 px-4 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer text-left",
                                    style: {
                                        fontFamily: "Inter, sans-serif",
                                        fontWeight: 500,
                                    } as React.CSSProperties,
                                };

                                if (item.href) {
                                    return (
                                        <a key={index} {...commonProps} href={item.href}>
                                            {content}
                                        </a>
                                    );
                                }

                                return (
                                    <button key={index} {...commonProps}>
                                        {content}
                                    </button>
                                );
                            })}

                            {ctaButton && (
                                <div className="pt-4 border-t border-gray-200">
                                    {ctaButton.href ? (
                                        <a
                                            href={ctaButton.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block w-full px-6 py-3 rounded-full text-center transition-all hover:scale-105 cursor-pointer"
                                            style={{
                                                background: "#1a1a1a",
                                                fontFamily: "Inter, sans-serif",
                                                fontSize: "16px",
                                                fontWeight: 500,
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {ctaButton.label}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                ctaButton.onClick?.();
                                                setMobileMenuOpen(false);
                                            }}
                                            className="w-full px-6 py-3 rounded-full transition-all hover:scale-105 cursor-pointer"
                                            style={{
                                                background: "#1a1a1a",
                                                fontFamily: "Inter, sans-serif",
                                                fontSize: "16px",
                                                fontWeight: 500,
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {ctaButton.label}
                                        </button>
                                    )}
                                </div>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {children ? (
                <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                    {children}
                </div>
            ) : (
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
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
                                        <a
                                            href={primaryAction.href}
                                            className="flex flex-row items-center gap-2 px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                                            style={{
                                                background: "#1a1a1a",
                                                fontFamily: "Inter, sans-serif",
                                                fontSize: "18px",
                                                fontWeight: 500,
                                                color: "#FFFFFF",
                                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                                            }}
                                        >
                                            <span className="whitespace-nowrap">{primaryAction.label}</span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                                                <path
                                                    d="M7 10H13M13 10L10 7M13 10L10 13"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>
                                    ) : (
                                        <button
                                            onClick={primaryAction.onClick}
                                            className="flex flex-row items-center gap-2 px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                                            style={{
                                                background: "#1a1a1a",
                                                fontFamily: "Inter, sans-serif",
                                                fontSize: "18px",
                                                fontWeight: 500,
                                                color: "#FFFFFF",
                                                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                                            }}
                                        >
                                            <span className="whitespace-nowrap">{primaryAction.label}</span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                                                <path
                                                    d="M7 10H13M13 10L10 7M13 10L10 13"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    )
                                )}

                                {secondaryAction && (
                                    secondaryAction.href ? (
                                        <a
                                            href={secondaryAction.href}
                                            className="px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer inline-block"
                                            style={{
                                                background: "transparent",
                                                border: "1px solid #cbd5e0",
                                                fontFamily: "Inter, sans-serif",
                                                fontSize: "18px",
                                                fontWeight: 500,
                                                color: "#1a1a1a",
                                            }}
                                        >
                                            {secondaryAction.label}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={secondaryAction.onClick}
                                            className="px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer"
                                            style={{
                                                background: "transparent",
                                                border: "1px solid #cbd5e0",
                                                fontFamily: "Inter, sans-serif",
                                                fontSize: "18px",
                                                fontWeight: 500,
                                                color: "#1a1a1a",
                                            }}
                                        >
                                            {secondaryAction.label}
                                        </button>
                                    )
                                )}
                             </motion.div>
                         )}

                        {disclaimer && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "13px",
                                    fontWeight: 400,
                                    color: "#718096",
                                    fontStyle: "italic",
                                }}
                            >
                                {disclaimer}
                            </motion.p>
                        )}

                        {socialProof && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="flex flex-row items-center gap-3"
                            >
                                <div className="flex flex-row -space-x-2">
                                    {socialProof.avatars.map((avatar, index) => (
                                        <Image
                                            key={index}
                                            src={avatar}
                                            alt={`User ${index + 1}`}
                                            className="rounded-full border-2 border-white"
                                            width={40}
                                            height={40}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ))}
                                </div>
                                <span
                                    style={{
                                        fontFamily: "Inter, sans-serif",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        color: "#4a5568",
                                    }}
                                >
                  {socialProof.text}
                </span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}

            {programs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="relative z-10 w-full overflow-hidden"
                    style={{
                        paddingTop: "60px",
                        paddingBottom: "60px",
                    }}
                >
                    <div
                        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
                        style={{
                            width: "150px",
                            background: "linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
                        }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
                        style={{
                            width: "150px",
                            background: "linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
                        }}
                    />

                    <motion.div
                        className="flex items-center"
                        animate={{
                            x: [0, -((programs.length * 380) / 2)],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: programs.length * 3,
                                ease: "linear",
                            },
                        }}
                        style={{
                            gap: "24px",
                            paddingLeft: "24px",
                        }}
                    >
                        {[...programs, ...programs].map((program, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ duration: 0.3 }}
                                onClick={program.onClick}
                                className="flex-shrink-0 cursor-pointer relative overflow-hidden"
                                style={{
                                    width: "356px",
                                    height: "480px",
                                    borderRadius: "24px",
                                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                                }}
                            >
                                {/* program image */}
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    width={356}
                                    height={480}
                                    style={{ objectFit: 'cover' }}
                                />

                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)",
                                    }}
                                />

                                <div
                                    className="absolute bottom-0 left-0 right-0 p-6"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px",
                                    }}
                                >
                  <span
                      style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "rgba(255, 255, 255, 0.8)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                      }}
                  >
                    {program.category}
                  </span>
                                    <h3
                                        style={{
                                            fontFamily: "Inter, sans-serif",
                                            fontSize: "24px",
                                            fontWeight: 600,
                                            color: "#FFFFFF",
                                            lineHeight: "1.3",
                                        }}
                                    >
                                        {program.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}