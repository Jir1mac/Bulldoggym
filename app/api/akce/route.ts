import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/adminAuth';

const MAX_BYTES = 4 * 1024 * 1024;
const MAX_FLYERS = 40;
const MAX_DIMENSION = 10000;

function detectMime(b: Uint8Array): string | null {
    if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
    if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
    if (
        b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
        b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
    ) {
        return 'image/webp';
    }
    return null;
}

function toDimension(value: FormDataEntryValue | null): number | null {
    const n = Number(value);
    return Number.isInteger(n) && n > 0 && n <= MAX_DIMENSION ? n : null;
}

export async function GET() {
    try {
        const flyers = await prisma.flyer.findMany({
            select: { id: true, width: true, height: true },
            orderBy: [{ position: 'asc' }, { id: 'asc' }],
        });
        return NextResponse.json(flyers);
    } catch {
        return NextResponse.json([]);
    }
}

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ success: false, error: 'Nepřihlášen' }, { status: 401 });
    }

    try {
        const form = await request.formData();
        const file = form.get('file');
        const width = toDimension(form.get('width'));
        const height = toDimension(form.get('height'));

        if (!(file instanceof File) || !width || !height) {
            return NextResponse.json({ success: false, error: 'Neplatný požadavek' }, { status: 400 });
        }
        if (file.size === 0 || file.size > MAX_BYTES) {
            return NextResponse.json({ success: false, error: 'Obrázek je příliš velký (max 4 MB)' }, { status: 413 });
        }

        const bytes = new Uint8Array(await file.arrayBuffer());
        const mimeType = detectMime(bytes);
        if (!mimeType) {
            return NextResponse.json({ success: false, error: 'Podporované formáty: JPG, PNG, WebP' }, { status: 415 });
        }

        const count = await prisma.flyer.count();
        if (count >= MAX_FLYERS) {
            return NextResponse.json(
                { success: false, error: `Maximální počet letáků je ${MAX_FLYERS}` },
                { status: 409 }
            );
        }

        const last = await prisma.flyer.aggregate({ _max: { position: true } });
        const flyer = await prisma.flyer.create({
            data: {
                position: (last._max.position ?? -1) + 1,
                mimeType,
                width,
                height,
                data: bytes,
            },
            select: { id: true },
        });

        return NextResponse.json({ success: true, id: flyer.id });
    } catch {
        return NextResponse.json({ success: false, error: 'Chyba při ukládání letáku' }, { status: 500 });
    }
}

// Uloží nové pořadí letáků: tělo { ids: [3, 1, 2] }
export async function PUT(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ success: false, error: 'Nepřihlášen' }, { status: 401 });
    }

    try {
        const { ids } = await request.json();
        if (!Array.isArray(ids) || !ids.every((id) => Number.isInteger(id))) {
            return NextResponse.json({ success: false, error: 'Neplatný požadavek' }, { status: 400 });
        }

        await prisma.$transaction(
            ids.map((id: number, index: number) =>
                prisma.flyer.update({ where: { id }, data: { position: index } })
            )
        );
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false, error: 'Chyba při změně pořadí' }, { status: 500 });
    }
}
