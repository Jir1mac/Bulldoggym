import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Foter from '@/components/Foter';
import AkceFlyers from '@/components/AkceFlyers';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { pageOpenGraph } from '@/lib/site';

const title = 'Akce a slevy';
const description =
    'Aktuální akce, slevy a letáky posilovny Bulldog Gym v Mostě. Zvýhodněné permanentky, tréninky a novinky z fitka.';

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: '/akce' },
    openGraph: pageOpenGraph('/akce', title, description),
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
            .map((file) => ({
                src: `/letaky/${encodeURIComponent(file)}`,
                // "02-letni-akce.jpg" -> "letni akce" (popis obrázku pro vyhledávače)
                alt: file.replace(IMAGE_EXT, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim(),
            }));
    } catch {
        return [];
    }
}

export default async function AkcePage() {
    const flyers = await getFlyers();

    return (
        <>
            <JsonLd data={breadcrumbJsonLd([{ name: 'Akce', path: '/akce' }])} />
            <Navbar />
            <main className="bg-white px-5 sm:px-8 pt-32 md:pt-44 pb-20 md:pb-32 min-h-[70vh]">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none">
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-red-600 mb-3">
                            Aktuálně
                        </p>
                        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
                            Akce v Bulldog Gymu Most
                        </h1>
                    </header>

                    <AkceFlyers flyers={flyers} />
                </div>
            </main>
            <Foter />
        </>
    );
}
