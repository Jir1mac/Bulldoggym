import { PulseFitHero } from "@/components/pulse-fit-hero";

export default function BulldogGymHero() {
    return (
        <PulseFitHero
            eyebrow="Posilovna a fitness centrum Most"
            title="Tvůj limit je v hlavě. Překonej ho u nás."
            subtitle="Fitness s tradicí od roku 2013. Na ploše 1 000 m² najdete špičkové vybavení značek CYBEX, TUFF STUFF, TECHNOGYM, IMPULSE, HOIST a NAUTILUS."
            primaryAction={{
                label: "Chci začít cvičit",
                href: "/#trainers",
            }}
            secondaryAction={{
                label: "Ceník",
                href: "/#cenik",
            }}
            programs={[
                {
                    image: "/Boxerna.png",
                    category: "FUNKČNÍ SÁL",
                    title: "Funkční trénink, box",
                },
                {
                    image: "/CardioSal.png",
                    category: "KARDIO SÁL",
                    title: "Běžecké pásy, schody, trenažery",
                },
                {
                    image: "/HlavniSal.png",
                    category: "SILOVÁ ZÓNA",
                    title: "Posilovací stroje, činky ",
                },
                {
                    image: "/Recepce.png",
                    category: "RECEPCE",
                    title: "Odpočinek, občerstvení",
                },
                {
                    image: "/Maserna1.jpeg",
                    category: "REGENERACE",
                    title: "Masáže, lymfodrenáže, rázová vlna",
                },
                {
                    image: "/Sal1,1.png",
                    category: "SILOVÁ ZÓNA",
                    title: "Posilovací stroje, činky ",
                },
                {
                    image: "/Sal2.png",
                    category: "FUNKČNÍ ZÓNA",
                    title: "Funkční trénink",
                },
            ]}
        />
    );
}