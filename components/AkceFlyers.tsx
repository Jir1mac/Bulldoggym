'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface FlyerItem {
    src: string;
}

export default function AkceFlyers({ flyers }: { flyers: FlyerItem[] }) {
    const [selected, setSelected] = useState<number | null>(null);

    const close = useCallback(() => setSelected(null), []);
    const next = useCallback(() => {
        setSelected((i) => (i === null ? i : (i + 1) % flyers.length));
    }, [flyers.length]);
    const prev = useCallback(() => {
        setSelected((i) => (i === null ? i : (i - 1 + flyers.length) % flyers.length));
    }, [flyers.length]);

    useEffect(() => {
        if (selected === null) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = 'unset';
        };
    }, [selected, close, next, prev]);

    if (flyers.length === 0) {
        return <p className="text-zinc-500">Momentálně tu nejsou žádné akce. Podívejte se sem později.</p>;
    }

    const current = selected !== null ? flyers[selected] : null;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-start">
                {flyers.map((flyer, index) => (
                    <button
                        key={flyer.src}
                        type="button"
                        onClick={() => setSelected(index)}
                        style={{ animationDelay: `${Math.min(index, 8) * 90}ms` }}
                        className="group block w-full min-h-56 overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-black/5 shadow-sm cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards motion-reduce:animate-none transition-[box-shadow,translate] ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40"
                        aria-label={`Zvětšit leták ${index + 1}`}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={flyer.src}
                            alt={`Leták akce ${index + 1}`}
                            loading="lazy"
                            className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        />
                    </button>
                ))}
            </div>

            {current && selected !== null && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300 motion-reduce:animate-none"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Detail letáku"
                >
                    <button
                        type="button"
                        onClick={close}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
                        aria-label="Zavřít"
                    >
                        <X size={28} strokeWidth={1.5} />
                    </button>

                    {flyers.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            className="absolute left-1 md:left-5 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
                            aria-label="Předchozí leták"
                        >
                            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.25} />
                        </button>
                    )}

                    <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        {/* key přenastaví animaci při přepnutí na další leták */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            key={current.src}
                            src={current.src}
                            alt={`Leták akce ${selected + 1}`}
                            className="w-auto h-auto max-w-full max-h-[85vh] rounded-lg shadow-2xl select-none animate-in fade-in zoom-in-95 duration-300 motion-reduce:animate-none"
                        />
                        {flyers.length > 1 && (
                            <p className="mt-4 text-xs tracking-widest text-white/50">
                                {selected + 1} / {flyers.length}
                            </p>
                        )}
                    </div>

                    {flyers.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            className="absolute right-1 md:right-5 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white transition-colors duration-300 cursor-pointer"
                            aria-label="Další leták"
                        >
                            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.25} />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
