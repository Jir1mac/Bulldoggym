import type { Metadata } from 'next';
import PulseFitHero from '@/components/Hero'
import About from "@/components/About";
import Cenik from "@/components/Cenik";
import FindUs from '@/components/FindUs';
import Foter from "@/components/Foter";
import Dobra from '@/components/Dobra';
import Navbar from "@/components/Navbar";
import Trainers from "@/components/Trainers";
import Karty from "@/components/Karty";
import PaymentMethods from "@/components/PaymentMethods";
import JsonLd from '@/components/JsonLd';
import { getContent } from '@/lib/content';
import { gymJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
    alternates: { canonical: '/' },
};

// Stránka se generuje staticky a obnovuje nejpozději jednou za hodinu
// (po uložení v adminu hned – viz revalidatePath v /api/content).
export const revalidate = 3600;

export default async function Home() {
    const content = await getContent();

    return (
        <>
        <JsonLd data={gymJsonLd(content)} />
        <Navbar/>
        <main>
        <PulseFitHero/>
        <Dobra hours={content.hours}/>
        <About/>
        <Trainers/>
        <Cenik content={content}/>
            <Karty/>
            <PaymentMethods/>
        <FindUs/>
        </main>
        <Foter/>
        </>
    )
}
