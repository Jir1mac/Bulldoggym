"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface HourRow {
    day: string;
    hours: string;
    note: string;
}

const DAY_CLASS_BASE = "text-base md:text-lg font-bold uppercase italic";
const DAY_CLASS_TODAY = "text-red-600";
const DAY_CLASS_DEFAULT = "text-black";

const HOUR_CLASS_BASE = "text-lg md:text-xl font-black tracking-tighter";
const HOUR_CLASS_TODAY = "text-red-600";
const HOUR_CLASS_DEFAULT = "text-black";

export default function BusinessHours() {
    const [openingHours, setOpeningHours] = useState<HourRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const today = new Intl.DateTimeFormat('cs-CZ', { weekday: 'long' }).format(new Date());

    useEffect(() => {
        const fetchHours = async () => {
            try {
                const res = await fetch('/api/content');
                const data = await res.json();
                if (data.hours) {
                    setOpeningHours(data.hours);
                }
            } catch (error) {
                console.error("Chyba při načítání otevírací doby:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHours();
    }, []);

    if (isLoading) {
        return (
            <div className="py-24 flex justify-center items-center bg-zinc-100">
                <Loader2 className="animate-spin text-red-600" size={32} />
            </div>
        );
    }

    return (
        <section id="oteviraci-doba" className="py-12 md:py-24 bg-zinc-100 text-black px-4 sm:px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 md:mb-16" data-aos="fade-up">
                    <h2 className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">Provozní doba</h2>
                </div>

                <div
                    className="bg-white border border-zinc-200 rounded-3xl p-4 sm:p-8 md:p-12 shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="flex items-center mb-6 md:mb-10 pb-4 md:pb-6 border-b border-zinc-100">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-red-600/20">
                            <Clock className="text-white" size={28} />
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs uppercase font-bold tracking-wider">Aktuální režim</p>
                            <p className="text-xl text-black font-black italic uppercase">Standardní provoz</p>
                        </div>
                    </div>

                    <div className="space-y-1 sm:space-y-4">
                        {openingHours.map((item) => {
                            const isToday = item.day.toLowerCase() === today.toLowerCase();

                            return (
                                <div
                                    key={item.day}
                                    className={cn(
                                        "flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 rounded-2xl transition-all duration-300",
                                        isToday
                                            ? "bg-red-50 border border-red-200 scale-[1.02] shadow-sm"
                                            : "border border-transparent"
                                    )}
                                >
                                    <div className="flex items-center mb-1 sm:mb-0">
                                        <Calendar
                                            size={18}
                                            className={cn("mr-3", isToday ? "text-red-600" : "text-zinc-400")}
                                        />
                                        <span className={cn(
                                            DAY_CLASS_BASE,
                                            isToday ? DAY_CLASS_TODAY : DAY_CLASS_DEFAULT
                                        )}>
                                            {item.day}
                                            {isToday && (
                                                <span className="ml-3 text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full not-italic tracking-normal font-bold">
                                                    DNES
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex flex-col sm:items-end">
                                        <span className={cn(
                                            HOUR_CLASS_BASE,
                                            isToday ? HOUR_CLASS_TODAY : HOUR_CLASS_DEFAULT
                                        )}>
                                            {item.hours}
                                        </span>
                                        <span className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">
                                            {item.note}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}