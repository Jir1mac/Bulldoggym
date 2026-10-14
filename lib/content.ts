import { prisma } from '@/lib/db';

export interface HourRow {
    day: string;
    hours: string;
    note: string;
}

export interface PriceRow {
    title: string;
    priceNormal: string;
    priceDiscount: string;
}

export interface SiteContent {
    hours: HourRow[];
    pricing: PriceRow[];
    entry10: string;
    entrySingle: string;
}

export const initialData: SiteContent = {
    hours: [
        { day: "Pondělí", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Úterý", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Středa", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Čtvrtek", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Pátek", hours: "7:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Sobota", hours: "08:00 – 22:00", note: "Špička: 13:00-16:00" },
        { day: "Neděle", hours: "08:00 – 22:00", note: "Víkendový režim" },
    ],
    pricing: [
        { title: "Měsíční členství", priceNormal: "1 390", priceDiscount: "990" },
        { title: "Čtvrtletní členství", priceNormal: "4 000", priceDiscount: "2 900" },
        { title: "Pololetní členství", priceNormal: "8 000", priceDiscount: "5 800" },
        { title: "Roční členství", priceNormal: "16 000", priceDiscount: "11 000" }
    ],
    entry10: "1 100",
    entrySingle: "130"
};

async function getDataFromDB(): Promise<SiteContent | null> {
    const [hours, pricing, settings] = await Promise.all([
        prisma.openingHour.findMany({ orderBy: { id: "asc" } }),
        prisma.pricing.findMany({ orderBy: { id: "asc" } }),
        prisma.settings.findFirst(),
    ]);

    if (hours.length === 0 && pricing.length === 0) {
        return null;
    }

    return {
        hours: hours.map(h => ({ day: h.day, hours: h.hours, note: h.note })),
        pricing: pricing.map(p => ({ title: p.title, priceNormal: p.priceNormal, priceDiscount: p.priceDiscount })),
        entry10: settings?.entry10 ?? initialData.entry10,
        entrySingle: settings?.entrySingle ?? initialData.entrySingle,
    };
}

/** Obsah z databáze (ceník, otevírací doba). Když DB není dostupná, vrátí výchozí data. */
export async function getContent(): Promise<SiteContent> {
    try {
        const dbData = await getDataFromDB();
        if (dbData) return dbData;
    } catch {
        // Databáze není dostupná, použijí se výchozí data
    }
    return initialData;
}

export async function saveContent(data: SiteContent) {
    await prisma.$transaction(async (tx) => {
        await tx.openingHour.deleteMany();
        await tx.pricing.deleteMany();

        if (data.hours && data.hours.length > 0) {
            await tx.openingHour.createMany({
                data: data.hours.map((h) => ({
                    day: h.day,
                    hours: h.hours,
                    note: h.note || "",
                })),
            });
        }

        if (data.pricing && data.pricing.length > 0) {
            await tx.pricing.createMany({
                data: data.pricing.map((p) => ({
                    title: p.title,
                    priceNormal: p.priceNormal,
                    priceDiscount: p.priceDiscount,
                })),
            });
        }

        await tx.settings.upsert({
            where: { id: 1 },
            update: {
                entry10: data.entry10 || initialData.entry10,
                entrySingle: data.entrySingle || initialData.entrySingle,
            },
            create: {
                id: 1,
                entry10: data.entry10 || initialData.entry10,
                entrySingle: data.entrySingle || initialData.entrySingle,
            },
        });
    });
}
