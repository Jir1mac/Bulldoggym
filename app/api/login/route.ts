import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');

    if (!forwarded) {
        return 'unknown';
    }

    return forwarded.split(',')[0].trim();
}

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const now = Date.now();
    const attempts = loginAttempts.get(ip);

    if (attempts && attempts.count >= MAX_ATTEMPTS) {
        if (now - attempts.lastAttempt < LOCKOUT_DURATION) {
            return NextResponse.json({ success: false }, { status: 429 });
        } else {
            loginAttempts.delete(ip);
        }
    }

    const { username, password } = await request.json();
    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH;

    if (!ADMIN_USER || !ADMIN_PASS_HASH) {
        return NextResponse.json({ success: false }, { status: 500 });
    }

    if (username === ADMIN_USER && bcrypt.compareSync(password, ADMIN_PASS_HASH)) {
        loginAttempts.delete(ip);
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });
        return NextResponse.json({ success: true });
    }

    const newCount = (attempts?.count || 0) + 1;
    loginAttempts.set(ip, { count: newCount, lastAttempt: now });

    return NextResponse.json({ success: false }, { status: 401 });
}