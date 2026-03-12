import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import "./globals.css";
import AosProvider from "@/components/AosProvider";

export const metadata: Metadata = {
    title: "Bulldog gym",
    description: "1000m2 posilovna, masáže",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="cs" className="scroll-smooth">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        </head>
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AosProvider>{children}</AosProvider>
        </body>
        </html>
    );
}