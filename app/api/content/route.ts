import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data.json');

const initialData = {
    hours: [
        { day: "Pondělí", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Úterý", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Středa", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Čtvrtek", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Pátek", hours: "7:30 – 22:00", note: "Špička: 16:00-19:00" },
        { day: "Sobota", hours: "08:00 – 22:00", note: "Víkendový režim" },
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

async function getStoredData() {
    try {
        const file = await fs.readFile(DATA_PATH, 'utf8');
        const data = JSON.parse(file);
        return { ...initialData, ...data };
    } catch {
        await fs.writeFile(DATA_PATH, JSON.stringify(initialData, null, 2));
        return initialData;
    }
}

export async function GET() {
    const data = await getStoredData();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const newData = await request.json();
        await fs.writeFile(DATA_PATH, JSON.stringify(newData, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Chyba při zápisu dat" }, { status: 500 });
    }
}