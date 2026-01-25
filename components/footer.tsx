"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SocialLink {
    name: string;
    href: string;
}

interface FooterLink {
    name: string;
    Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
    href?: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
    brand: {
        name: string;
        description: string;
    };
    socialLinks: SocialLink[];
    columns: FooterColumn[];
    copyright?: React.ReactNode;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
    ({ className, brand, socialLinks, columns, copyright, ...props }, ref) => {
        // prevent accidental propagation of `key` through props
        const { key: _, ...rest } = props as Record<string, unknown>

        return (
            <div
                ref={ref}
                className={cn("pt-16 md:pt-24", className)}
                {...(rest as React.HTMLAttributes<HTMLDivElement>)}
            >
                <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
                    {/* Mobile-First Layout */}
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
                        {/* Brand Section - Mobile Optimized */}
                        <div className="lg:col-span-4">
                            <Link href="/" className="text-2xl md:text-xl font-bold inline-block mb-3 hover:text-red-600 transition-colors min-h-[44px] flex items-center">
                                {brand.name}
                            </Link>
                            <p className="text-base md:text-sm text-foreground/70 mb-6 leading-relaxed">
                                {brand.description}
                            </p>

                            {/* Social Links - Mobile Optimized with larger tap targets */}
                            <div className="flex flex-wrap gap-3 md:gap-2 mt-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        className="text-base md:text-sm font-medium text-foreground/70 hover:text-red-700 transition-colors px-3 py-2 md:px-0 md:py-0 rounded-lg hover:bg-red-50 md:hover:bg-transparent min-h-[44px] flex items-center"
                                        target="_blank"
                                        href={link.href}
                                        rel="noopener noreferrer"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Columns - Mobile Optimized */}
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:col-span-8 lg:mt-0">
                            {columns.map(({ title, links }) => (
                                <div
                                    key={title}
                                    className="flex flex-col"
                                >
                                    <h3 className="text-lg md:text-sm font-bold mb-4 md:mb-4">{title}</h3>
                                    <ul className="space-y-3 md:space-y-2.5">
                                        {links.map(({ name, Icon, href }) => (
                                            <li key={name}>
                                                <a
                                                    href={href ?? "/"}
                                                    className="flex items-center gap-2 text-base md:text-sm transition-all text-foreground/70 hover:text-red-700 group py-2 md:py-1 rounded-lg hover:bg-red-50 md:hover:bg-transparent px-3 md:px-0 -mx-3 md:mx-0 min-h-[44px] md:min-h-0"
                                                >
                                                    <Icon className="stroke-2 h-5 w-5 md:h-4 md:w-4 transition-all stroke-foreground/60 group-hover:stroke-red-700 flex-shrink-0" />
                                                    <span className="leading-tight">{name}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Copyright Section - Mobile Optimized */}
                    {copyright && (
                        <div className="mt-12 md:mt-20 border-t pt-6 pb-8">
                            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center text-sm md:text-xs text-foreground/60 text-center md:text-left">
                                {copyright}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Footer.displayName = "Footer";