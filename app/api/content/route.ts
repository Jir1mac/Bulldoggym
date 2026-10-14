import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getContent, saveContent } from '@/lib/content';

export async function GET() {
    return NextResponse.json(await getContent());
}

export async function POST(request: Request) {
    const cookieStore = await cookies();
    if (!cookieStore.get('admin_session')) {
        return NextResponse.json({ success: false, error: "Nepřihlášen" }, { status: 401 });
    }

    try {
        const newData = await request.json();
        await saveContent(newData);
        // Homepage je předgenerovaná, po uložení ji přegenerujeme s novými cenami a otevírací dobou
        revalidatePath('/');
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false, error: "Chyba při zápisu dat" }, { status: 500 });
    }
}
