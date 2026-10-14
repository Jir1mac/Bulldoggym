import { site } from '@/lib/site';
import type { SiteContent } from '@/lib/content';

const DAY_MAP: Record<string, string> = {
    'pondělí': 'Monday',
    'úterý': 'Tuesday',
    'středa': 'Wednesday',
    'čtvrtek': 'Thursday',
    'pátek': 'Friday',
    'sobota': 'Saturday',
    'neděle': 'Sunday',
};

const pad = (t: string) => (t.length === 4 ? `0${t}` : t);

/** "07:30 – 22:00" -> ["07:30", "22:00"] */
function parseHours(value: string): [string, string] | null {
    const match = value.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
    return match ? [pad(match[1]), pad(match[2])] : null;
}

const toNumber = (price: string) => Number(price.replace(/[^\d]/g, ''));

export function gymJsonLd(content: SiteContent) {
    const openingHoursSpecification = content.hours.flatMap((row) => {
        const day = DAY_MAP[row.day.trim().toLowerCase()];
        const hours = parseHours(row.hours);
        if (!day || !hours) return [];
        return [{ '@type': 'OpeningHoursSpecification', dayOfWeek: day, opens: hours[0], closes: hours[1] }];
    });

    const offers = [
        { name: 'Jednorázové vstupné', price: content.entrySingle },
        { name: 'Permanentka na 10 vstupů', price: content.entry10 },
        ...content.pricing.map((p) => ({ name: p.title.replace('členství', 'permanentka'), price: p.priceNormal })),
    ]
        .filter((o) => toNumber(o.price) > 0)
        .map((o) => ({
            '@type': 'Offer',
            name: o.name,
            price: toNumber(o.price),
            priceCurrency: 'CZK',
        }));

    const prices = offers.map((o) => o.price);

    return {
        '@context': 'https://schema.org',
        '@type': 'ExerciseGym',
        '@id': `${site.url}/#gym`,
        name: site.name,
        alternateName: site.shortName,
        description: site.description,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        image: [`${site.url}/HlavniSal.png`, `${site.url}/CardioSal.png`, `${site.url}/Boxerna.png`],
        logo: `${site.url}/bulldog.png`,
        foundingDate: site.foundingYear,
        address: {
            '@type': 'PostalAddress',
            streetAddress: site.address.street,
            addressLocality: site.address.city,
            postalCode: site.address.postalCode,
            addressRegion: site.address.region,
            addressCountry: site.address.country,
        },
        geo: { '@type': 'GeoCoordinates', ...site.geo },
        hasMap: 'https://maps.google.com/?cid=16746178720201668362',
        areaServed: { '@type': 'City', name: 'Most' },
        openingHoursSpecification,
        ...(prices.length > 0 && { priceRange: `${Math.min(...prices)}–${Math.max(...prices)} Kč` }),
        currenciesAccepted: 'CZK',
        paymentAccepted: 'Hotovost, QR platba, MultiSport, Benefity, Pluxee, stravenky',
        amenityFeature: [
            'Silová zóna',
            'Kardio sál',
            'Funkční sál a box',
            'Masáže a rázová vlna',
            'Osobní trenéři',
        ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
        makesOffer: offers,
        sameAs: site.sameAs,
    };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Úvod', path: '/' }, ...items].map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${site.url}${item.path === '/' ? '' : item.path}`,
        })),
    };
}
