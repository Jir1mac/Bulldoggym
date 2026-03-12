import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    const ADMIN_USER = process.env.ADMIN_USER || "admin";
    const ADMIN_PASS = process.env.ADMIN_PASS || "bulldog2026";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        (await cookies()).set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24
        });

        return NextResponse.json({
            success: true,
            message: "Přihlášení úspěšné"
        }, { status: 200 });
    }

    return NextResponse.json({
        success: false,
        message: "Špatné jméno nebo heslo"
    }, { status: 401 });
}