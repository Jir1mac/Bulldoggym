"use client";

import React, { useState } from 'react';
import { Save, Tag, Clock } from 'lucide-react';
import Login from '../../components/Login';

const initialHours = [
    { day: "Pondělí", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Úterý", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Středa", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Čtvrtek", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Pátek", hours: "7:30 – 22:00", note: "Špička: 16:00-19:00" },
    { day: "Sobota", hours: "08:00 – 22:00", note: "Víkendový režim" },
    { day: "Neděle", hours: "08:00 – 22:00", note: "Víkendový režim" },
];

const initialPricing = [
    { title: "Měsíční členství", priceNormal: "1 390", priceDiscount: "990" },
    { title: "Čtvrtletní členství", priceNormal: "4 000", priceDiscount: "2 900" },
    { title: "Pololetní členství", priceNormal: "8 000", priceDiscount: "5 800" },
    { title: "Roční členství", priceNormal: "16 000", priceDiscount: "11 000" }
];

export default function AdminPage() {
    const [hours, setHours] = useState(initialHours);
    const [pricing, setPricing] = useState(initialPricing);

    const updateDay = (index: number, field: string, value: string) => {
        const newHours = [...hours];
        newHours[index] = { ...newHours[index], [field]: value };
        setHours(newHours);
    };

    const updatePrice = (index: number, field: string, value: string) => {
        const newPricing = [...pricing];
        newPricing[index] = { ...newPricing[index], [field]: value };
        setPricing(newPricing);
    };

    return (
        <>
            <Login />

        <div className="min-h-screen bg-zinc-100 text-black p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black uppercase italic">Admin <span className="text-red-600">Bulldog</span></h1>
                    <button className="bg-red-600 hover:bg-red-700 transition-colors px-8 py-3 rounded-xl text-white font-bold flex items-center gap-2 cursor-pointer uppercase tracking-tighter shadow-lg shadow-red-600/20">
                        <Save size={20} /> Uložit vše
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-12">

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="text-red-600" />
                            <h2 className="text-2xl font-black uppercase italic">Otevírací doba</h2>
                        </div>
                        <div className="space-y-3">
                            {hours.map((item, index) => (
                                <div key={item.day} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
                                    <div className="w-28 font-bold uppercase italic text-zinc-400 text-sm">{item.day}</div>
                                    <input
                                        className="bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-lg flex-1 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                                        value={item.hours}
                                        onChange={(e) => updateDay(index, 'hours', e.target.value)}
                                        placeholder="Čas"
                                    />
                                    <input
                                        className="bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-lg flex-1 text-zinc-500 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                                        value={item.note}
                                        onChange={(e) => updateDay(index, 'note', e.target.value)}
                                        placeholder="Poznámka"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Tag className="text-red-600" />
                            <h2 className="text-2xl font-black uppercase italic">Ceny členství</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pricing.map((plan, index) => (
                                <div key={plan.title} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                                    <div className="font-bold uppercase italic mb-4 text-red-600">{plan.title}</div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-zinc-400 mb-1 block">Základní cena (Kč)</label>
                                            <input
                                                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-lg outline-none focus:border-red-600 font-bold"
                                                value={plan.priceNormal}
                                                onChange={(e) => updatePrice(index, 'priceNormal', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-red-400 mb-1 block">Zvýhodněná cena (Kč)</label>
                                            <input
                                                className="w-full bg-red-50 border border-red-100 px-4 py-2 rounded-lg outline-none focus:border-red-600 text-red-600 font-bold"
                                                value={plan.priceDiscount}
                                                onChange={(e) => updatePrice(index, 'priceDiscount', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
        </>
    );
}