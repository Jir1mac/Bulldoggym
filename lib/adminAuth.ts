import { cookies } from 'next/headers';

// Stejná kontrola jako v proxy.ts a login route: přítomnost cookie admin_session.
export async function isAdmin(): Promise<boolean> {
    const cookieStore = await cookies();
    return Boolean(cookieStore.get('admin_session'));
}
