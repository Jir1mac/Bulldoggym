import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Musíš importovat cookies

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    const ADMIN_USER = "admin";
    const ADMIN_PASS = "heslo123";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const response = NextResponse.json({
            success: true,
            message: "Přihlášení úspěšné"
        }, { status: 200 });

        // TADY NASTAVÍME COOKIE
        (await cookies()).set('admin_session', 'true', {
            httpOnly: true, // Bezpečné, JS k tomu nemá přístup
            secure: process.env.NODE_ENV === 'production', // Jen přes HTTPS v produkci
            path: '/', // Platí pro celý web
            maxAge: 60 * 60 * 24 // Platnost 24 hodin
        });

        return response;
    }

    return NextResponse.json({
        success: false,
        message: "Špatné jméno nebo heslo"
    }, { status: 401 });
}