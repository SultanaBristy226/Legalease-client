"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiUser,
  FiBriefcase,
  FiMessageCircle,
  FiUsers,
  FiCreditCard,
  FiBarChart2,
} from "react-icons/fi";
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
    { name: "Profile", href: "/dashboard", icon: FiUser },
    { name: "Hiring History", href: "/dashboard/user/hiring-history", icon: FiBriefcase },
    { name: "My Comments", href: "/dashboard/user/comments", icon: FiMessageCircle },
  ];

  const lawyerLinks = [
    { name: "Profile", href: "/dashboard", icon: FiUser },
    { name: "Hiring Requests", href: "/dashboard/lawyer/hiring-history", icon: FiBriefcase },
    { name: "Manage Profile", href: "/dashboard/lawyer/manage-legal-profile", icon: FiUser },
  ];

  const adminLinks = [
    { name: "Profile", href: "/dashboard", icon: FiUser },
    { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: FiUsers },
    { name: "Transactions", href: "/dashboard/admin/all-transactions", icon: FiCreditCard },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: FiBarChart2 },
  ];

  const links =
    user.role === "admin" ? adminLinks : user.role === "lawyer" ? lawyerLinks : userLinks;

  return (
    <div>
      <div className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center font-heading text-lg flex-shrink-0">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="font-heading text-lg">Welcome back, {user.fullName}</h1>
              <p className="text-white/50 text-xs">
                {user.email} · {user.role} account
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-white text-primary"
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`}
                >
                  <Icon size={14} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  );
}