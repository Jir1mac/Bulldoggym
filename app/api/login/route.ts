import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Input validation
        if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
            return NextResponse.json({
                success: false,
                message: "Špatné jméno nebo heslo"
            }, { status: 401 });
        }

        if (username.trim() === '' || password.trim() === '') {
            return NextResponse.json({
                success: false,
                message: "Špatné jméno nebo heslo"
            }, { status: 401 });
        }

        // Find user in database
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Špatné jméno nebo heslo"
            }, { status: 401 });
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({
                success: false,
                message: "Špatné jméno nebo heslo"
            }, { status: 401 });
        }

        // Password is valid, create session
        const response = NextResponse.json({
            success: true,
            message: "Přihlášení úspěšné"
        }, { status: 200 });

        // Set authentication cookie
        (await cookies()).set('admin_session', 'true', {
            httpOnly: true, // Bezpečné, JS k tomu nemá přístup
            secure: process.env.NODE_ENV === 'production', // Jen přes HTTPS v produkci
            path: '/', // Platí pro celý web
            maxAge: 60 * 60 * 24 // Platnost 24 hodin
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        // Return same error message to avoid leaking information
        return NextResponse.json({
            success: false,
            message: "Špatné jméno nebo heslo"
        }, { status: 401 });
    }
}