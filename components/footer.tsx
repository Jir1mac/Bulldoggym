"use client";

import * as React from "react";
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
        const { key: _key, ...rest } = props as Record<string, unknown>

        return (
            <div
                ref={ref}
                className={cn("pt-24", className)}
                {...(rest as any)}
            >
                <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <a href="/" className="text-xl font-semibold">
                                {brand.name}
                            </a>
                            <p className="text-sm text-foreground/60">
                                {brand.description}
                            </p>

                            <p className="text-sm font-light text-foreground/55 mt-3.5">
                                {socialLinks.map((link, index) => (
                                    <React.Fragment key={link.name}>
                                        <a
                                            className="hover:text-red-700"
                                            target="_blank"
                                            href={link.href}
                                            rel="noopener noreferrer"
                                        >
                                            {link.name}
                                        </a>
                                        {index < socialLinks.length - 1 && " • "}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 mt-16 md:grid-cols-2 lg:col-span-8 lg:mt-0">
                            {columns.map(({ title, links }, index) => (
                                <div
                                    key={title}
                                    className={cn(
                                        "flex flex-col",
                                        index === 0 ? "lg:items-center" : "lg:items-end text-right"
                                    )}
                                >
                                    <div>
                                        <h3 className="text-sm font-semibold">{title}</h3>
                                        <ul className="mt-4 space-y-2.5">
                                            {links.map(({ name, Icon, href }) => (
                                                <li key={name}>
                                                    <a
                                                        href={href ?? "/"}
                                                        className="text-sm transition-all text-foreground/60 hover:text-red-700 group"
                                                    >
                                                        <Icon className="inline stroke-2 h-4 mr-1.5 transition-all stroke-foreground/60 group-hover:stroke-foreground/90" />
                                                        {name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {copyright && (
                        <div className="mt-20 border-t pt-6 pb-8">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs text-foreground/55">
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