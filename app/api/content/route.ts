import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const initialData = {
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

async function getDataFromDB() {
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

async function saveDataToDB(data: typeof initialData) {
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

export async function GET() {
    try {
        const dbData = await getDataFromDB();
        if (dbData) {
            return NextResponse.json(dbData);
        }
    } catch {
        // Database not available, fall back to initial data
    }

    return NextResponse.json(initialData);
}

export async function POST(request: Request) {
    try {
        const newData = await request.json();
        await saveDataToDB(newData);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false, error: "Chyba při zápisu dat" }, { status: 500 });
    }
}