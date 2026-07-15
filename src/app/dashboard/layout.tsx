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
  FiHome,
  FiLogOut,
  FiSettings,
  FiHeart,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
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
        <div className="animate-pulse text-text-muted">Loading...</div>
      </div>
    );
  }

  const userLinks = [
    { name: "Overview", href: "/dashboard", icon: FiHome },
    { name: "Hiring History", href: "/dashboard/user/hiring-history", icon: FiBriefcase },
    { name: "My Comments", href: "/dashboard/user/comments", icon: FiMessageCircle },
    { name: "Shortlist", href: "/dashboard/user/shortlist", icon: FiHeart },
    { name: "Settings", href: "/dashboard/user/update-profile", icon: FiSettings },
  ];

  const lawyerLinks = [
    { name: "Overview", href: "/dashboard", icon: FiHome },
    { name: "Hiring Requests", href: "/dashboard/lawyer/hiring-history", icon: FiBriefcase },
    { name: "Manage Profile", href: "/dashboard/lawyer/manage-legal-profile", icon: FiUser },
    { name: "Settings", href: "/dashboard/user/update-profile", icon: FiSettings },
  ];

  const adminLinks = [
    { name: "Overview", href: "/dashboard", icon: FiHome },
    { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: FiUsers },
    { name: "Transactions", href: "/dashboard/admin/all-transactions", icon: FiCreditCard },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: FiBarChart2 },
    { name: "Settings", href: "/dashboard/user/update-profile", icon: FiSettings },
  ];

  const links =
    user.role === "admin" ? adminLinks : user.role === "lawyer" ? lawyerLinks : userLinks;

  const getInitial = () => {
    return user.fullName?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white dark:bg-[#1a1a1a] border-r border-gray-border dark:border-white/10 flex-shrink-0 hidden md:block">
          <div className="p-6">
            <Link href="/" className="font-heading text-xl font-semibold text-primary dark:text-white">
              LegalEase
            </Link>
          </div>

          <div className="px-4 pb-4 border-b border-gray-border dark:border-white/10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-soft/50 dark:bg-white/5">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-heading text-sm">
                {getInitial()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary dark:text-white truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-text-muted dark:text-white/40 truncate">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-muted dark:text-white/60 hover:bg-gray-soft dark:hover:bg-white/5 hover:text-primary dark:hover:text-white"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : ""} />
                  {link.name}
                </Link>
              );
            })}

            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all w-full mt-4 border-t border-gray-border dark:border-white/10 pt-4"
            >
              <FiLogOut size={18} />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <header className="md:hidden bg-white dark:bg-[#1a1a1a] border-b border-gray-border dark:border-white/10 px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-heading text-lg font-semibold text-primary dark:text-white">
              LegalEase
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="text-red-500"
              >
                <FiLogOut size={20} />
              </button>
            </div>
          </header>

          <div className="p-6 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}