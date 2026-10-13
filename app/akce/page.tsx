import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Foter from '@/components/Foter';
import AkceFlyers from '@/components/AkceFlyers';

export const metadata: Metadata = {
    title: 'Akce | Bulldog gym',
    description: 'Aktuální akce a letáky Bulldog Gymu v Mostě.',
};

// Letáky stačí nahrát do složky public/letaky. Zobrazí se podle názvu souboru,
// takže pořadí jde určit číslem na začátku (01-vanoce.jpg, 02-nabor.jpg ...).
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

async function getFlyers() {
    try {
        const files = await fs.readdir(path.join(process.cwd(), 'public', 'letaky'));
        return files
            .filter((file) => IMAGE_EXT.test(file))
            .sort((a, b) => a.localeCompare(b, 'cs', { numeric: true }))
            .map((file) => ({ src: `/letaky/${encodeURIComponent(file)}` }));
    } catch {
        return [];
    }
}

export default async function AkcePage() {
    const flyers = await getFlyers();

    return (
        <>
            <Navbar />
            <main className="bg-white px-5 sm:px-8 pt-32 md:pt-44 pb-20 md:pb-32 min-h-[70vh]">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-2 duration-700 motion-reduce:animate-none">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-red-600 mb-3">
                            Aktuálně
                        </p>
                        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
                            Akce v Bulldog Gymu
                        </h1>
                    </header>

                    <AkceFlyers flyers={flyers} />
                </div>
            </main>
            <Foter />
        </>
    );
}
