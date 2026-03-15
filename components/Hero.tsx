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
                    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop",
                    category: "SILOVÁ ZÓNA",
                    title: "80 stanovišť a stroje Cybex",
                    onClick: () => console.log("Silová zóna"),
                },
                {
                    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
                    category: "KARDIO",
                    title: "Moderní aerobní zóna",
                    onClick: () => console.log("Kardio"),
                },
                {
                    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop",
                    category: "TRADICE",
                    title: "Více než 10 let zkušeností",
                    onClick: () => console.log("Tradice"),
                },
                {
                    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop",
                    category: "TRENÉŘI",
                    title: "Osobní trénink na míru",
                    onClick: () => console.log("Trenéři"),
                },
                {
                    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=500&fit=crop",
                    category: "REGENERACE",
                    title: "Masáže a lymfodrenáže",
                    onClick: () => console.log("Regenerace"),
                },
            ]}
        />
    );
}