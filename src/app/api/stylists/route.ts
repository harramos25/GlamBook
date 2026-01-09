import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const stylists = await prisma.stylist.findMany();
        return NextResponse.json(stylists);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching stylists' }, { status: 500 });
    }
}
