import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const [hours, pricing, settings] = await Promise.all([
        prisma.openingHour.findMany({ orderBy: { id: "asc" } }),
        prisma.pricing.findMany({ orderBy: { id: "asc" } }),
        prisma.settings.findFirst(),
    ]);

    return NextResponse.json({
        hours,
        pricing,
        entry10: settings?.entry10,
        entrySingle: settings?.entrySingle,
    });
}
