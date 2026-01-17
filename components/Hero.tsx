import { PulseFitHero } from "@/components/pulse-fit-hero";

export default function BulldogGymHero() {
    return (
        <PulseFitHero
            logo="Bulldog gym"
            navigation={[
                { label: "O nás", href: "/#o-nas", onClick: () => console.log("O nás") },
                { label: "Trenéři", href: "/#trainers", onClick: () => console.log("Trenéři") },
                { label: "Ceník", href: "/#cenik", onClick: () => console.log("Ceník") },
                { label: "Kontakt", href: "/#kontakt", onClick: () => console.log("Kontakt") },
            ]}
            ctaButton={{
                label: "Otevírací doba",
                onClick: () => console.log("Otevírací doba"),
                href: "/#oteviraci-doba",
            }}
            title="Tvůj limit je v hlavě. Překonej ho u nás."
            subtitle="Největší posilovna v Mostě na ploše 1000 m². Špičkové vybavení značek Cybex a Nautilus, profesionální trenéři a komunita, která tě nenechá přestat."
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
            disclaimer="*Přijímáme karty MultiSport a ActivePass"
            socialProof={{
                avatars: [
                    "https://i.pravatar.cc/150?img=11",
                    "https://i.pravatar.cc/150?img=12",
                    "https://i.pravatar.cc/150?img=13",
                    "https://i.pravatar.cc/150?img=14",
                ],
                text: "Přidej se k tisícům spokojených členů v Mostě",
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
                    title: "Více než 20 let zkušeností",
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