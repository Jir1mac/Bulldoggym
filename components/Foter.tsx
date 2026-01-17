"use client";

import {
    Blocks,
    CreditCard,
    Handshake,
    Scale,
    History
} from "lucide-react";
import { Footer } from "@/components/footer";

const MatomoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            strokeMiterlimit="1.4"
            strokeWidth="2"
            d="m13.8 16.3.8.6v-.1l.2-.2a164.4 164.4 0 0 1 .6-.9l.9 1a4.1 4.1 0 0 0 5.3.4c1-.7 1.3-1.8 1.3-2.8 0-1-.5-2-1-2.8l-3-5A3 3 0 0 0 16 5c-.9 0-1.6.3-2 .5-.8.4-1.3 1-1.7 1.8l-1-1.1-.7.7.6-.7a5 5 0 0 0-3-1.3c-1.1 0-2.3.3-3 1.4L1.7 12a4.7 4.7 0 0 0-.7 3.1 4 4 0 0 0 1.2 2c1 .8 2.3.9 3.4.7 1-.2 2.3-.8 2.8-1.9l1 .8a3.6 3.6 0 0 0 3.5 1.2 3.8 3.8 0 0 0 1.5-.9l-.6-.7Zm0 0 .7.7v-.1l-.7-.6Z"
        />
    </svg>
);

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
                    href: "https://youtube.com/@BulldogGymMost",
                },
            ]}
            columns={[
                {
                    title: "Navigace",
                    links: [
                        {
                            name: "Domů",
                            Icon: Blocks,
                            href: "#",
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
