// Základní údaje o webu na jednom místě – používají je metadata, sitemap i strukturovaná data.
export const site = {
    url: 'https://www.bulldoggym.cz',
    name: 'Bulldog Gym Most',
    shortName: 'Bulldog Gym',
    title: 'Bulldog Gym – posilovna a fitness Most | 1000 m²',
    description:
        'Největší posilovna v Mostě: 1 000 m², 5 sálů a 90 stanovišť strojů CYBEX, TECHNOGYM, HOIST. Osobní trenéři, masáže, MultiSport. Otevřeno denně do 22:00.',
    phone: '+420777656367',
    email: 'bulldog.gym@seznam.cz',
    address: {
        street: 'K. H. Máchy 344',
        city: 'Most',
        postalCode: '434 01',
        region: 'Ústecký kraj',
        country: 'CZ',
    },
    geo: { latitude: 50.508369, longitude: 13.651979 },
    foundingYear: '2013',
    sameAs: [
        'https://www.instagram.com/bulldoggym.most',
        'https://www.facebook.com/profile.php?id=100057360913960',
        'https://www.youtube.com/channel/UCDtv1fhz07WQ5O2lVJWg0zg',
    ],
} as const;

/** Open Graph pro podstránky – Next.js vnořená metadata nemerguje, takže doplníme i společné údaje. */
export function pageOpenGraph(path: string, title: string, description: string) {
    return {
        type: 'website' as const,
        locale: 'cs_CZ',
        siteName: site.name,
        url: path,
        title: `${title} | ${site.name}`,
        description,
    };
}
