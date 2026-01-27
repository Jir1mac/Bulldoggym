import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const { username, password } = await request.json();

    if (username === "admin" && password === "bulldog2026") {
        // Nastavíme cookie, která prohlížeči řekne "tenhle borec je přihlášený"
        const response = NextResponse.json({ message: "Vítej" });

        (await cookies()).set('admin_session', 'true', {
            httpOnly: true, // Bezpečné, JavaScript k tomu nemůže
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 // Platnost 1 den
        });

        return response;
    }

    return NextResponse.json({ message: "Chyba" }, { status: 401 });
}