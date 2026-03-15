import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minut

function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    return forwarded?.split(',')[0]?.trim() ?? 'unknown';
}

export async function POST(request: Request) {
    const ip = getClientIp(request);

    const now = Date.now();
    const attempts = loginAttempts.get(ip);
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
        const elapsed = now - attempts.lastAttempt;
        if (elapsed < LOCKOUT_DURATION) {
            return NextResponse.json({
                success: false,
                message: "Příliš mnoho pokusů. Zkuste to znovu za 15 minut."
            }, { status: 429 });
        }
        loginAttempts.delete(ip);
    }

    const body = await request.json();
    const { username, password } = body;

    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH;

    if (!ADMIN_USER || !ADMIN_PASS_HASH) {
        const missing = [
            !ADMIN_USER && 'ADMIN_USER',
            !ADMIN_PASS_HASH && 'ADMIN_PASS_HASH'
        ].filter(Boolean).join(', ');
        console.error(`Chybí povinné proměnné prostředí: ${missing}`);
        return NextResponse.json({
            success: false,
            message: "Chyba konfigurace serveru"
        }, { status: 500 });
    }

    const isUsernameValid = username === ADMIN_USER;
    const isPasswordValid = await bcrypt.compare(password ?? '', ADMIN_PASS_HASH);

    if (isUsernameValid && isPasswordValid) {
        loginAttempts.delete(ip);

        (await cookies()).set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24
        });

        return NextResponse.json({
            success: true,
            message: "Přihlášení úspěšné"
        }, { status: 200 });
    }

    const current = loginAttempts.get(ip) ?? { count: 0, lastAttempt: now };
    loginAttempts.set(ip, { count: current.count + 1, lastAttempt: now });

    return NextResponse.json({
        success: false,
        message: "Špatné jméno nebo heslo"
    }, { status: 401 });
}