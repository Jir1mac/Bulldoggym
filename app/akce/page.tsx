import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Foter from '@/components/Foter';
import AkceFlyers from '@/components/AkceFlyers';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Akce | Bulldog gym',
    description: 'Aktuální akce a letáky Bulldog Gymu v Mostě.',
};

async function getFlyers() {
    try {
        return await prisma.flyer.findMany({
            select: { id: true, width: true, height: true },
            orderBy: [{ position: 'asc' }, { id: 'asc' }],
        });
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
