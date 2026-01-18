"use client"
import PulseFitHero from '@/components/Hero'
import About from "@/components/About";
import Trainers from '@/components/Trainers';
import Cenik from "@/components/Cenik";
import FindUs from '@/components/FindUs';
import Foter from "@/components/Foter";
import Dobra from '@/components/Dobra';
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <>
        <Navbar/>
        <PulseFitHero/>
        <Dobra/>
        <About/>
        <Trainers/>
        <Cenik/>
        <FindUs/>
        <Foter/>
        </>
    )
}