"use client"
import PulseFitHero from '@/components/Hero'
import About from "@/components/About";
import Cenik from "@/components/Cenik";
import FindUs from '@/components/FindUs';
import Foter from "@/components/Foter";
import Dobra from '@/components/Dobra';
import Navbar from "@/components/Navbar";
import Trainers from "@/components/Trainers";

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