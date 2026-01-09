export type Service = {
    id: string;
    name: string;
    category: string;
    price: number;
    duration: number; // in minutes
    description: string;
    image: string;
};

export const SERVICES: Service[] = [
    // Hair
    {
        id: 'h1',
        name: 'Silk Press & Style',
        category: 'Hair',
        price: 85,
        duration: 60,
        description: 'A smooth, silky finish for natural hair using premium heat protectants.',
        image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2626&auto=format&fit=crop',
    },
    {
        id: 'h2',
        name: 'Luxury Trim & Treatment',
        category: 'Hair',
        price: 120,
        duration: 90,
        description: 'Deep conditioning treatment followed by a precision trim to maintain health.',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2669&auto=format&fit=crop',
    },
    // Nails
    {
        id: 'n1',
        name: 'Gel Manicure',
        category: 'Nails',
        price: 50,
        duration: 45,
        description: 'Long-lasting gel polish with cuticle care and hand massage.',
        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2670&auto=format&fit=crop',
    },
    {
        id: 'n2',
        name: 'Acrylic Full Set',
        category: 'Nails',
        price: 85,
        duration: 90,
        description: 'Full set of acrylic extensions shaped to perfection.',
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2669&auto=format&fit=crop',
    },
    // Spa
    {
        id: 's1',
        name: 'Rejuvenating Facial',
        category: 'Spa',
        price: 150,
        duration: 60,
        description: 'Customized facial treatment to cleanse, exfoliate, and hydrate.',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop',
    },
];

export const CATEGORIES = ['All', 'Hair', 'Nails', 'Spa', 'Brows', 'Lash'];

export type Stylist = {
    id: string;
    name: string;
    role: string;
    rating: number;
    reviews: number;
    image: string;
    specialties: string[];
};

export const STYLISTS: Stylist[] = [
    {
        id: 'any',
        name: 'Any Stylist',
        role: 'First Available',
        rating: 5.0,
        reviews: 999,
        image: '', // Special handling for "Any"
        specialties: ['Fastest Service'],
    },
    {
        id: 'st1',
        name: 'Elena R.',
        role: 'Senior Hair Stylist',
        rating: 5.0,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2669&auto=format&fit=crop',
        specialties: ['Color', 'Silk Press'],
    },
    {
        id: 'st2',
        name: 'Marcus Chen',
        role: 'Master Barber',
        rating: 4.9,
        reviews: 86,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
        specialties: ['Short Cuts', 'Fades'],
    },
    {
        id: 'st3',
        name: 'Sarah J.',
        role: 'Nail Artist',
        rating: 4.8,
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop',
        specialties: ['Gel', 'Nail Art'],
    },
];
