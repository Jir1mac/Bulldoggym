import { PulseFitHero } from "@/components/pulse-fit-hero";

export default function BulldogGymHero() {
    return (
        <PulseFitHero
            title="Tvůj limit je v hlavě. Překonej ho u nás."
            subtitle="Fitness s tradicí od roku 2013. Na ploše 1 000 m² najdete špičkové vybavení značek CYBEX, TUFF STUFF, TECHNOGYM, IMPULSE, HOIST a NAUTILUS."
            primaryAction={{
                label: "Chci začít cvičit",
                onClick: () => console.log("Start training"),
                href: "/#trainers",
            }}
            secondaryAction={{
                label: "Ceník",
                onClick: () => console.log("Ceník"),
                href: "/#cenik",
            }}
            programs={[
                {
                    image: "/boxerna.png",
                    category: "Boxerna",
                    title: "80 stanovišť a stroje Cybex",
                    onClick: () => console.log("Silová zóna"),
                },
                {
                    image: "/cardiosal.png",
                    category: "KARDIO",
                    title: "Moderní aerobní zóna",
                    onClick: () => console.log("Kardio"),
                },
                {
                    image: "/Hlavnisal.png",
                    category: "TRADICE",
                    title: "Více než 10 let zkušeností",
                    onClick: () => console.log("Tradice"),
                },
                {
                    image: "/Recepce.png",
                    category: "TRENÉŘI",
                    title: "Osobní trénink na míru",
                    onClick: () => console.log("Trenéři"),
                },
                {
                    image: "/Maserna1.jpeg",
                    category: "REGENERACE",
                    title: "Masáže a lymfodrenáže",
                    onClick: () => console.log("Regenerace"),
                },
                {
                    image: "/Sal1,1.png",
                    category: "1 Sál",
                    title: "Sál 1",
                    onClick: () => console.log("Regenerace"),
                },
                {
                    image: "/Sal2.png",
                    category: "REGENERACE",
                    title: "Sál 2",
                    onClick: () => console.log("Regenerace"),
                },
            ]}
        />
    );
}