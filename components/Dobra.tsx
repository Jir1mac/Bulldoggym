"use client";

import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";

const openingHours = [
    { day: "Pondělí", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Úterý", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Středa", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Čtvrtek", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Pátek", hours: "7:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Sobota", hours: "08:00 – 22:00", note: "Víkendový režim" },
    { day: "Neděle", hours: "08:00 – 22:00", note: "Víkendový režim" },
];

export default function BusinessHours() {
    const today = new Intl.DateTimeFormat('cs-CZ', { weekday: 'long' }).format(new Date());

    return (
        <section id="oteviraci-doba" className="py-24 bg-zinc-150 text-white px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">Provozní doba</h2>
                    <h3 className="text-5xl md:text-6xl font-black uppercase text-black mb-6">
                        Kdy u nás <span className="text-red-600">makat?</span>
                    </h3>
                </div>

                <div
                    className="bg-zinc-300 border border-zinc-300 rounded-3xl p-8 md:p-12 shadow-2xl"
                    data-aos="zoom-in"
                >
                    <div className="flex items-center mb-10 pb-6 border-b border-zinc-100">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4">
                            <Clock className="text-white" size={28} />
                        </div>
                        <div>
                            <p className="text-zinc-800 text-sm uppercase font-bold tracking-wider">Aktuální režim</p>
                            <p className="text-xl text-black font-black italic uppercase">Standardní provoz</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {openingHours.map((item, index) => {
                            const isToday = item.day.toLowerCase() === today.toLowerCase();

                            return (
                                <div
                                    key={item.day}
                                    className={cn(
                                        "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl transition-all duration-300",
                                        isToday
                                            ? "bg-red-600/10 border border-red-600/30 scale-[1.02]"
                                            : "hover:bg-zinc-800/50 border border-transparent"
                                    )}
                                    data-aos="fade-left"
                                    data-aos-delay={index * 50}
                                >
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <Calendar
                                            size={18}
                                            className={cn("mr-3", isToday ? "text-red-600" : "text-zinc-500")}
                                        />
                                        <span className={cn(
                                            "text-lg font-bold uppercase italic",
                                            isToday ? "text-white" : "text-black"
                                        )}>
                                            {item.day}
                                            {isToday && <span className="ml-3 text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full not-italic tracking-normal">Dnes</span>}
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:items-end">
                                        <span className={cn(
                                            "text-xl font-black tracking-tighter",
                                            isToday ? "text-red-600" : "text-white"
                                        )}>
                                            {item.hours}
                                        </span>
                                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                                            {item.note}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
                        <p className="text-zinc-500 text-sm">
                            * O svátcích může být otevírací doba upravena. Sledujte prosím náš <span className="text-red-600 font-bold">Facebook</span>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}