"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  const userLinks = [
    { name: "Profile", href: "/dashboard" },
    { name: "Hiring History", href: "/dashboard/user/hiring-history" },
    { name: "My Comments", href: "/dashboard/user/comments" },
  ];

  const lawyerLinks = [
    { name: "Profile", href: "/dashboard" },
    { name: "Hiring Requests", href: "/dashboard/lawyer/hiring-history" },
    { name: "Manage Profile", href: "/dashboard/lawyer/manage-legal-profile" },
  ];

  const adminLinks = [
    { name: "Profile", href: "/dashboard" },
    { name: "Manage Users", href: "/dashboard/admin/manage-users" },
    { name: "All Transactions", href: "/dashboard/admin/all-transactions" },
    { name: "Analytics", href: "/dashboard/admin/analytics" },
  ];

  const links =
    user.role === "admin"
      ? adminLinks
      : user.role === "lawyer"
      ? lawyerLinks
      : userLinks;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
      <aside className="border border-gray-border rounded-xl p-4 h-fit">
        <p className="text-xs uppercase tracking-wide text-text-muted mb-4 px-2">
          {user.role} dashboard
        </p>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm px-3 py-2 rounded-md transition ${
                pathname === link.href
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-gray-soft"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}