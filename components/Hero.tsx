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
                    image: "/Boxerna.png",
                    category: "FUNKČNÍ SÁL",
                    title: "Funkční trénink, box",
                    onClick: () => console.log("Silová zóna"),
                },
                {
                    image: "/CardioSal.png",
                    category: "KARDIO SÁL",
                    title: "Běžecké pásy, schody, trenažery",
                    onClick: () => console.log("Kardio"),
                },
                {
                    image: "/HlavniSal.png",
                    category: "SILOVÁ ZÓNA",
                    title: "Posilovací stroje, činky ",
                    onClick: () => console.log("Tradice"),
                },
                {
                    image: "/Recepce.png",
                    category: "RECEPCE",
                    title: "Odpočinek, občerstvení",
                    onClick: () => console.log("Trenéři"),
                },
                {
                    image: "/Maserna1.jpeg",
                    category: "REGENERACE",
                    title: "Masáže, lymfodrenáže, rázová vlna",
                    onClick: () => console.log("Regenerace"),
                },
                {
                    image: "/Sal1,1.png",
                    category: "SILOVÁ ZÓNA",
                    title: "Posilovací stroje, činky ",
                    onClick: () => console.log("Regenerace"),
                },
                {
                    image: "/Sal2.png",
                    category: "FUNKČNÍ ZÓNA",
                    title: "Funkční trénink",
                    onClick: () => console.log("Regenerace"),
                },
            ]}
        />
    );
}