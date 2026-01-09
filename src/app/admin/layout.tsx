"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-ivory">
            <AdminSidebar />
            <div className="pl-64 flex-1">
                {children}
            </div>
        </div>
    );
}
