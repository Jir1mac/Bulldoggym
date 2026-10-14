import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Foter from '@/components/Foter';
import GalleryGrid from '@/components/GalleryGrid';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/structured-data';
import { pageOpenGraph } from '@/lib/site';

const title = 'Fotogalerie posilovny';
const description =
    'Fotky posilovny Bulldog Gym v Mostě: silová zóna, kardio sál, funkční sál s boxem, masérna a recepce. Podívejte se, kde budete trénovat.';

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: '/gallery' },
    openGraph: pageOpenGraph('/gallery', title, description),
};

export default function GalleryPage() {
    return (
        <>
            <JsonLd data={breadcrumbJsonLd([{ name: 'Fotogalerie', path: '/gallery' }])} />
            <Navbar />
            <main>
                <GalleryGrid />
            </main>
            <Foter />
        </>
    );
}
