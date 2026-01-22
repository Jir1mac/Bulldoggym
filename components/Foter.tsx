"use client";

import {
    Blocks,
    CreditCard,
    Handshake,
    Scale,
    History
} from "lucide-react";
import { Footer } from "@/components/footer";

const GoogleAnalyticsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M17 5.1v13.5c0 1.6 1 2.4 2 2.4s2-.7 2-2.4V5.2C21 4 20 3 19 3s-2 1-2 2.1Zm-7 7v6.6c0 1.5 1 2.3 2 2.3s2-.7 2-2.3v-6.5c0-1.3-1-2.2-2-2.2s-2 1-2 2.1Zm-3.6 8.3a2 2 0 1 0-2.8-2.8 2 2 0 0 0 2.8 2.8Z" />
    </svg>
);

export default function Foter() {
    return (
        <Footer
            className="mt-20"
            brand={{
                name: "Bulldog Gym",
                description: "Největší posilovna v Mostě na ploše 1000 m².",
            }}
            socialLinks={[
                {
                    name: "instagram",
                    href: "https://instagram.com/bulldoggymmost",
                },
                {
                    name: "facebook",
                    href: "https://facebook.com/bulldoggymmost",
                },
                {
                    name: "youTube",
                    href: "https://www.youtube.com/channel/UCDtv1fhz07WQ5O2lVJWg0zg",
                },
            ]}
            columns={[
                {
                    title: "Navigace",
                    links: [
                        {
                            name: "Domů",
                            Icon: Blocks,
                            href: "/",
                        },
                        {
                            name: "Příběh",
                            Icon: History,
                            href: "/#o-nas",
                        },
                        {
                            name: "Trenéři",
                            Icon: GoogleAnalyticsIcon,
                            href: "/#trainers",
                        },
                    ],
                },
                {
                    title: "Ceník",
                    links: [
                        {
                            name: "Jednodenní vstup - 130 Kč",
                            Icon: Scale,
                            href: "#cenik",
                        },
                        {
                            name: "Měsíční permanentka - 1390 Kč",
                            Icon: Handshake,
                            href: "#cenik",
                        },
                        {
                            name: "Roční členství - 16000 Kč",
                            Icon: CreditCard,
                            href: "#cenik",
                        },
                    ],
                },

            ]}
            copyright={
                <>
                    <div className="mb-2 md:mb-0">© {new Date().getFullYear()} Bulldog gym</div>
                    <div>
                        Vytvořil{' '}
                        <a
                            href="https://www.jirimacal.cz/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-700 font-medium"
                        >
                            Jiří Macal
                        </a>
                    </div>
                </>
             }
         />
     );
 }
