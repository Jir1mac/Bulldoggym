import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const hoursCount = await prisma.openingHour.count();
    if (hoursCount === 0) {
        await prisma.openingHour.createMany({
            data: [
                { day: "Pondělí", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
                { day: "Úterý", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
                { day: "Středa", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
                { day: "Čtvrtek", hours: "07:30 – 22:00", note: "Špička: 16:00-19:00" },
                { day: "Pátek", hours: "7:30 – 22:00", note: "Špička: 16:00-19:00" },
                { day: "Sobota", hours: "08:00 – 22:00", note: "Víkendový režim" },
                { day: "Neděle", hours: "08:00 – 22:00", note: "Víkendový režim" },
            ],
        });
    }

    const pricingCount = await prisma.pricing.count();
    if (pricingCount === 0) {
        await prisma.pricing.createMany({
            data: [
                { title: "Měsíční členství", priceNormal: "1 390", priceDiscount: "990" },
                { title: "Čtvrtletní členství", priceNormal: "4 000", priceDiscount: "2 900" },
                { title: "Pololetní členství", priceNormal: "8 000", priceDiscount: "5 800" },
                { title: "Roční členství", priceNormal: "16 000", priceDiscount: "11 000" },
            ],
        });
    }

    const settings = await prisma.settings.findFirst();
    if (!settings) {
        await prisma.settings.create({
            data: { id: 1, entry10: "1 100", entrySingle: "130" },
        });
    }

    console.log("Seed completed successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
