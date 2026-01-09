import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            userName,
            userEmail,
            userPhone,
            serviceId,
            stylistId,
            date,
            time,
            notes
        } = body;

        // 1. Find or Create User (Client)
        let user = await prisma.user.findUnique({
            where: { email: userEmail }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: userEmail,
                    name: userName,
                    phone: userPhone,
                    role: 'CLIENT'
                }
            });
        }

        // 2. Create Booking
        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                stylistId: stylistId,
                serviceId: serviceId,
                date: new Date(date), // ensure ISO string
                time: time,
                notes: notes,
                status: 'CONFIRMED' // Auto-confirm for demo
            }
        });

        return NextResponse.json({ success: true, booking });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
    }
}
