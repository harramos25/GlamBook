const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const SERVICES = [
    // Hair
    {
        name: 'Silk Press & Style',
        category: 'Hair',
        price: 85,
        duration: 60,
        description: 'A smooth, silky finish for natural hair using premium heat protectants.',
        image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2626&auto=format&fit=crop',
    },
    {
        name: 'Luxury Trim & Treatment',
        category: 'Hair',
        price: 120,
        duration: 90,
        description: 'Deep conditioning treatment followed by a precision trim to maintain health.',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop',
    },
    // Nails
    {
        name: 'Gel Manicure',
        category: 'Nails',
        price: 50,
        duration: 45,
        description: 'Long-lasting gel polish with cuticle care and hand massage.',
        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2670&auto=format&fit=crop',
    },
];

const STYLISTS = [
    {
        name: 'Elena R.',
        roleTitle: 'Senior Hair Stylist',
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop',
        rating: 5.0,
        reviews: 124,
        specialties: 'Color,Silk Press',
        email: 'elena@glambook.com'
    },
    {
        name: 'Marcus Chen',
        roleTitle: 'Master Barber',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
        rating: 4.9,
        reviews: 86,
        specialties: 'Short Cuts,Fades',
        email: 'marcus@glambook.com'
    }
];

async function main() {
    console.log('Seeding database...');

    // Create Services
    for (const service of SERVICES) {
        await prisma.service.create({
            data: service
        });
    }

    // Create Stylists (and their Users)
    for (const stylist of STYLISTS) {
        const user = await prisma.user.create({
            data: {
                email: stylist.email,
                name: stylist.name,
                role: 'STYLIST',
            }
        });

        await prisma.stylist.create({
            data: {
                userId: user.id,
                name: stylist.name,
                roleTitle: stylist.roleTitle,
                image: stylist.image,
                rating: stylist.rating,
                reviews: stylist.reviews,
                specialties: stylist.specialties,
            }
        });
    }

    // Create Admin User
    await prisma.user.upsert({
        where: { email: 'admin@glambook.com' },
        update: {},
        create: {
            email: 'admin@glambook.com',
            name: 'Boss Admin',
            role: 'ADMIN',
        },
    });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
