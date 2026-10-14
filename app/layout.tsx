import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import AosProvider from "@/components/AosProvider";
import { site } from "@/lib/site";

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: site.title,
        template: `%s | ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    keywords: [
        'posilovna Most',
        'fitness Most',
        'fitko Most',
        'posilovna Most cena',
        'osobní trenér Most',
        'permanentka posilovna Most',
        'MultiSport Most',
        'Bulldog Gym',
    ],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    formatDetection: { telephone: true, address: true, email: true },
    openGraph: {
        type: 'website',
        locale: 'cs_CZ',
        url: site.url,
        siteName: site.name,
        title: site.title,
        description: site.description,
    },
    twitter: {
        card: 'summary_large_image',
        title: site.title,
        description: site.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    // Ověřovací kódy z Google Search Console a Seznam Webmaster (nastav ve Vercelu, viz README)
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        other: process.env.NEXT_PUBLIC_SEZNAM_SITE_VERIFICATION
            ? { 'seznam-wmt': process.env.NEXT_PUBLIC_SEZNAM_SITE_VERIFICATION }
            : undefined,
    },
    category: 'sport',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#dc2626',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="cs" className="scroll-smooth">
        <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AosProvider>{children}</AosProvider>
        </body>
        </html>
    );
}
