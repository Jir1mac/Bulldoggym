import { prisma } from '@/lib/db';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const flyerId = Number(id);
    if (!Number.isInteger(flyerId)) {
        return new Response('Not found', { status: 404 });
    }

    try {
        const flyer = await prisma.flyer.findUnique({
            where: { id: flyerId },
            select: { data: true, mimeType: true },
        });
        if (!flyer) {
            return new Response('Not found', { status: 404 });
        }

        // ID se nikdy nepoužije znovu, obsah se nemění, proto může být cache dlouhá.
        return new Response(new Uint8Array(flyer.data), {
            headers: {
                'Content-Type': flyer.mimeType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'X-Content-Type-Options': 'nosniff',
            },
        });
    } catch {
        return new Response('Server error', { status: 500 });
    }
}
