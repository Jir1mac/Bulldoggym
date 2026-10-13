'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface FlyerItem {
    id: number;
    width: number;
    height: number;
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {flyers.map((flyer, index) => (
                    <button
                        key={flyer.id}
                        type="button"
                        onClick={() => setSelected(index)}
                        className="block w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-lg hover:border-red-600 transition-all cursor-pointer"
                        aria-label={`Zvětšit leták ${index + 1}`}
                    >
                        <Image
                            src={`/api/akce/${flyer.id}/image`}
                            alt={`Leták akce ${index + 1}`}
                            width={flyer.width}
                            height={flyer.height}
                            unoptimized
                            className="w-full h-auto"
                        />
                    </button>
                ))}
            </div>

            {current && selected !== null && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 md:p-10"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Detail letáku"
                >
                    <button
                        type="button"
                        onClick={close}
                        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
                        aria-label="Zavřít"
                    >
                        <X size={36} />
                    </button>

                    {flyers.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
                            aria-label="Předchozí leták"
                        >
                            <ChevronLeft className="w-9 h-9 md:w-14 md:h-14" />
                        </button>
                    )}

                    <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={`/api/akce/${current.id}/image`}
                            alt={`Leták akce ${selected + 1}`}
                            width={current.width}
                            height={current.height}
                            unoptimized
                            className="w-auto h-auto max-w-full max-h-[85vh] select-none"
                        />
                        {flyers.length > 1 && (
                            <p className="mt-3 text-sm text-zinc-400">
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
                            className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
                            aria-label="Další leták"
                        >
                            <ChevronRight className="w-9 h-9 md:w-14 md:h-14" />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
