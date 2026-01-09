import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const services = await prisma.service.findMany();
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching services' }, { status: 500 });
    }
}
