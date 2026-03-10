"use client";

import React, { useState, useEffect } from 'react';
import { Save, Tag, Clock, Loader2, Ticket } from 'lucide-react';

interface HourRow {
    day: string;
    hours: string;
    note: string;
}

interface PriceRow {
    title: string;
    priceNormal: string;
    priceDiscount: string;
}

export default function AdminPage() {
    const [hours, setHours] = useState<HourRow[]>([]);
    const [pricing, setPricing] = useState<PriceRow[]>([]);

    const [entry10, setEntry10] = useState("");
    const [entrySingle, setEntrySingle] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/content');
                const data = await res.json();
                setHours(data.hours || []);
                setPricing(data.pricing || []);
                setEntry10(data.entry10 || "1 100");
                setEntrySingle(data.entrySingle || "130");
            } catch (error) {
                console.error("Chyba při načítání:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus('idle');
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hours,
                    pricing,
                    entry10,
                    entrySingle
                }),
            });
            if (res.ok) {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch {
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    const updateDay = (index: number, field: keyof HourRow, value: string) => {
        const newHours = [...hours];
        newHours[index] = { ...newHours[index], [field]: value };
        setHours(newHours);
    };

    const updatePrice = (index: number, field: keyof PriceRow, value: string) => {
        const newPricing = [...pricing];
        newPricing[index] = { ...newPricing[index], [field]: value };
        setPricing(newPricing);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
                <Loader2 className="animate-spin text-red-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-100 text-black p-8 font-sans uppercase">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-black italic tracking-tighter">
                        Admin <span className="text-red-600">Bulldog</span>
                    </h1>

                    <div className="flex items-center gap-4">
                        {saveStatus === 'success' && <span className="text-green-600 font-bold text-xs italic">Uloženo!</span>}
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-red-600 hover:bg-red-700 disabled:bg-zinc-400 px-8 py-3 rounded-xl text-white font-bold flex items-center gap-2 shadow-lg shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
                        >
                            {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                            Uložit vše
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12">

                    <section className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Ticket className="text-red-600" />
                            <h2 className="text-2xl font-black italic">Základní vstupné</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-bold text-zinc-400 block mb-2">Permanentka (10 vstupů) - Kč</label>
                                <input
                                    className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl font-bold outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                                    value={entry10}
                                    onChange={(e) => setEntry10(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-zinc-400 block mb-2">Jednorázový vstup - Kč</label>
                                <input
                                    className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 rounded-xl font-bold outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                                    value={entrySingle}
                                    onChange={(e) => setEntrySingle(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="text-red-600" />
                            <h2 className="text-2xl font-black italic">Otevírací doba</h2>
                        </div>
                        <div className="space-y-3">
                            {hours.map((item, index) => (
                                <div key={index} className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
                                    <div className="w-28 font-bold text-zinc-400 text-sm">{item.day}</div>
                                    <input
                                        className="bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-lg flex-1 outline-none focus:border-red-600 font-bold"
                                        value={item.hours}
                                        onChange={(e) => updateDay(index, 'hours', e.target.value)}
                                    />
                                    <input
                                        className="bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-lg flex-1 text-zinc-500 outline-none focus:border-red-600"
                                        value={item.note}
                                        onChange={(e) => updateDay(index, 'note', e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <Tag className="text-red-600" />
                            <h2 className="text-2xl font-black italic">Ceny členství</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pricing.map((plan, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl border border-zinc-200">
                                    <div className="font-bold mb-4 text-red-600">{plan.title}</div>
                                    <div className="space-y-4">
                                        <input
                                            className="w-full bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-lg font-bold"
                                            value={plan.priceNormal}
                                            onChange={(e) => updatePrice(index, 'priceNormal', e.target.value)}
                                        />
                                        <input
                                            className="w-full bg-red-50 border border-red-100 px-4 py-2 rounded-lg text-red-600 font-bold"
                                            value={plan.priceDiscount}
                                            onChange={(e) => updatePrice(index, 'priceDiscount', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}