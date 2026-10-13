import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/adminAuth';

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!(await isAdmin())) {
        return NextResponse.json({ success: false, error: 'Nepřihlášen' }, { status: 401 });
    }

    const { id } = await params;
    const flyerId = Number(id);
    if (!Number.isInteger(flyerId)) {
        return NextResponse.json({ success: false, error: 'Neplatné ID' }, { status: 400 });
    }

    try {
        await prisma.flyer.delete({ where: { id: flyerId } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false, error: 'Leták se nepodařilo smazat' }, { status: 500 });
    }
}
