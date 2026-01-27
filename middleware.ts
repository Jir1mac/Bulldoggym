import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Funkce se MUSÍ jmenovat "middleware"
export function middleware(request: NextRequest) {
    const session = request.cookies.get('admin_session');

    // Ochrana cesty /admin
    if (request.nextUrl.pathname.startsWith('/admin') && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// Konfigurace, kde se má middleware spouštět
export const config = {
    matcher: '/admin/:path*',
};