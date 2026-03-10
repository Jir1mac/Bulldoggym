import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const session = request.cookies.get('admin_session');

    if (request.nextUrl.pathname.startsWith('/admin') && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};