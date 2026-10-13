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
            <main className="bg-zinc-100 px-4 sm:px-6 pt-32 md:pt-44 pb-16 md:pb-24 min-h-[70vh]">
                <div className="max-w-7xl mx-auto">
                    <p className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4">
                        Aktuálně
                    </p>
                    <h1 className="text-4xl md:text-5xl font-black uppercase text-black mb-12 leading-tight">
                        Akce v <span className="text-red-600">Bulldog Gymu</span>
                    </h1>

                    <AkceFlyers flyers={flyers} />
                </div>
            </main>
            <Foter />
        </>
    );
}
