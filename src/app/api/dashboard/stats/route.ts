import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        // Parallel data fetching for dashboard stats
        const [
            totalBookings,
            totalUsers,
            totalServices,
            recentBookings
        ] = await Promise.all([
            prisma.booking.count(),
            prisma.user.count(),
            prisma.service.count(),
            prisma.booking.findMany({
                take: 5,
                orderBy: { date: 'desc' },
                include: {
                    user: { select: { name: true, email: true } },
                    service: { select: { name: true, price: true } },
                    stylist: { select: { name: true } }
                }
            })
        ]);

        // Calculate Total Revenue (Simple sum of all bookings)
        // In a real app, you might filter by 'completed' status
        const allBookingsWithPrice = await prisma.booking.findMany({
            select: {
                service: { select: { price: true } }
            }
        });
        const totalRevenue = allBookingsWithPrice.reduce((sum, booking) => sum + booking.service.price, 0);

        // Calculate Average Ticket
        const averageTicket = totalBookings > 0 ? totalRevenue / totalBookings : 0;

        return NextResponse.json({
            totalBookings,
            totalUsers,
            totalRevenue,
            averageTicket,
            recentBookings
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
