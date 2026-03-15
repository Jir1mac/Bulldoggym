"use client";

import React from 'react';
import {
    Dumbbell,
    History,
    Users,
    CreditCard,
    MapPin,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Youtube,
    ChevronRight,
    ArrowUpRight,
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: "Navigace",
            links: [
                { name: "Domů", href: "/", icon: <ChevronRight size={14} /> },
                { name: "O nás", href: "/#o-nas", icon: <History size={14} /> },
                { name: "Trenéři", href: "/#trainers", icon: <Users size={14} /> },
                { name: "Ceník", href: "/#cenik", icon: <CreditCard size={14} /> },
            ]
        },
        {
            title: "Kontakt",
            links: [
                { name: "K.H. Máchy 344, Most, 434 01", icon: <MapPin size={14} /> },
                { name: "+420 777 656 367", href: "tel:+420777656367", icon: <Phone size={14} /> },
                { name: "bulldog.gym@seznam.cz", href: "mailto:bulldog.gym@seznam.cz", icon: <Mail size={14} /> },
            ]
        }
    ];

    const socialLinks = [
        { icon: <Instagram size={20} />, href: "https://www.instagram.com/bulldoggym.most" },
        { icon: <Facebook size={20} />, href: "https://www.facebook.com/profile.php?id=100057360913960" },
        { icon: <Youtube size={20} />, href: "https://www.youtube.com/channel/UCDtv1fhz07WQ5O2lVJWg0zg" },
    ];

    return (
        <footer className="bg-zinc-100 text-black pt-16 pb-8 px-4 sm:px-6 border-t border-zinc-200">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Dumbbell className="text-red-600" size={32} />
                            <span className="text-2xl font-black uppercase tracking-tighter">
                                Bulldog<span className="text-red-600">Gym</span>
                            </span>
                        </div>
                        <p className="text-zinc-600 leading-relaxed max-w-sm">
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    className="p-2 bg-white border border-zinc-200 rounded-lg hover:bg-red-600 transition-all group"
                                >
                                    <span className="text-zinc-600 group-hover:text-white">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-red-600">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors group"
                                        >
                                            <span>
                                                {link.icon}
                                            </span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-red-600">
                            Otevírací doba
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex justify-between items-center">
                                        <span className="text-zinc-500 font-medium">Po - Pá:</span>
                                        <span className="font-bold">07:30 - 22:00</span>
                                    </li>
                                    <li className="flex justify-between items-center">
                                        <span className="text-zinc-500 font-medium">So, Ne:</span>
                                        <span className="font-bold">08:00 - 22:00</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-400">
                    <p>© {currentYear} Bulldog Gym Most</p>
                    <p className="flex items-center gap-2">
                        Vytvořil
                        <a
                            href="https://www.jirimacal.cz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-zinc-900 font-bold hover:text-red-600 transition-colors group"
                        >
                            Jiří Macal
                            <ArrowUpRight size={13} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}