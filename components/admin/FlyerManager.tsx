"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CalendarDays, ImagePlus, Loader2, Trash2 } from 'lucide-react';

interface Flyer {
    id: number;
    width: number;
    height: number;
}

// Fotky se před nahráním zmenší, aby se vešly do limitu uploadu a stránka se rychle načítala.
const MAX_SIDE = 2200;
const MAX_BYTES = 4 * 1024 * 1024 - 64 * 1024;
const QUALITIES = [0.88, 0.8, 0.7, 0.6];

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
}

async function prepareImage(file: File): Promise<{ blob: Blob; width: number; height: number }> {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        bitmap.close();
        throw new Error('Prohlížeč neumí zpracovat obrázek');
    }

    // Průhledné PNG by se jinak v JPEG změnilo na černé.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    for (const quality of QUALITIES) {
        const blob = await canvasToBlob(canvas, quality);
        if (blob && blob.size <= MAX_BYTES) {
            return { blob, width, height };
        }
    }
    throw new Error('Obrázek je i po zmenšení příliš velký');
}

export default function FlyerManager() {
    const [flyers, setFlyers] = useState<Flyer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [busy, setBusy] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            const res = await fetch('/api/akce');
            setFlyers(await res.json());
        } catch {
            setError('Letáky se nepodařilo načíst');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        e.target.value = '';
        if (files.length === 0) return;

        setError(null);
        const failed: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setBusy(`Nahrávám ${i + 1} / ${files.length}`);
            try {
                const { blob, width, height } = await prepareImage(file);
                const form = new FormData();
                form.append('file', blob, 'flyer.jpg');
                form.append('width', String(width));
                form.append('height', String(height));

                const res = await fetch('/api/akce', { method: 'POST', body: form });
                if (!res.ok) {
                    const data = await res.json().catch(() => null);
                    throw new Error(data?.error || 'Nahrání se nezdařilo');
                }
            } catch (err) {
                failed.push(`${file.name}: ${err instanceof Error ? err.message : 'Nahrání se nezdařilo'}`);
            }
        }

        setBusy(null);
        if (failed.length > 0) setError(failed.join('\n'));
        await load();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Opravdu smazat tento leták?')) return;

        setError(null);
        setBusy('Mažu…');
        try {
            const res = await fetch(`/api/akce/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
        } catch {
            setError('Leták se nepodařilo smazat');
        }
        setBusy(null);
        await load();
    };

    const handleMove = async (index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= flyers.length) return;

        const reordered = [...flyers];
        [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
        setFlyers(reordered);
        setError(null);

        try {
            const res = await fetch('/api/akce', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: reordered.map((f) => f.id) }),
            });
            if (!res.ok) throw new Error();
        } catch {
            setError('Pořadí se nepodařilo uložit');
            await load();
        }
    };

    return (
        <section>
            <div className="flex items-center gap-3 mb-2">
                <CalendarDays className="text-red-600" />
                <h2 className="text-2xl font-black italic">Akce – letáky</h2>
            </div>
            <p className="text-xs text-zinc-500 normal-case mb-6">
                Letáky se nahrávají a mažou hned, tlačítko „Uložit vše“ se jich netýká. Fotky se při nahrání automaticky zmenší.
                Nejlépe fungují letáky na výšku.
            </p>

            <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm">
                <label
                    className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-300 rounded-2xl py-8 transition-colors ${
                        busy ? 'opacity-60 cursor-wait' : 'cursor-pointer hover:border-red-600'
                    }`}
                >
                    {busy ? (
                        <Loader2 className="animate-spin text-red-600" size={28} />
                    ) : (
                        <ImagePlus className="text-red-600" size={28} />
                    )}
                    <span className="font-bold text-sm">{busy ?? 'Nahrát letáky'}</span>
                    <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        disabled={busy !== null}
                        onChange={handleUpload}
                    />
                </label>

                {error && (
                    <p className="mt-4 text-xs font-bold text-red-600 normal-case whitespace-pre-line">{error}</p>
                )}

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="animate-spin text-red-600" size={28} />
                    </div>
                ) : flyers.length === 0 ? (
                    <p className="mt-6 text-sm text-zinc-500 normal-case">Zatím nejsou nahrané žádné letáky.</p>
                ) : (
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-start">
                        {flyers.map((flyer, index) => (
                            <div key={flyer.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden">
                                <Image
                                    src={`/api/akce/${flyer.id}/image`}
                                    alt={`Leták ${index + 1}`}
                                    width={flyer.width}
                                    height={flyer.height}
                                    unoptimized
                                    className="w-full h-auto"
                                />
                                <div className="flex items-center justify-between p-2 border-t border-zinc-200 bg-white">
                                    <div className="flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() => handleMove(index, -1)}
                                            disabled={index === 0 || busy !== null}
                                            className="p-2 rounded-lg hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                                            aria-label="Posunout dopředu"
                                        >
                                            <ArrowLeft size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleMove(index, 1)}
                                            disabled={index === flyers.length - 1 || busy !== null}
                                            className="p-2 rounded-lg hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                                            aria-label="Posunout dozadu"
                                        >
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(flyer.id)}
                                        disabled={busy !== null}
                                        className="p-2 rounded-lg text-red-600 hover:bg-red-50 disabled:opacity-30 cursor-pointer"
                                        aria-label="Smazat leták"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
