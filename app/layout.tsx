import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import AosProvider from "@/components/AosProvider";

export const metadata: Metadata = {
    title: "Bulldog gym",
    description: "1000m<sup>2</sup> posilovna, masáže",
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="cs" className="scroll-smooth">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AosProvider>{children}</AosProvider>
        </body>
        </html>
    );
}