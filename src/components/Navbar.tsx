"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Lawyers", href: "/browse-lawyers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#111111] text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="font-heading text-xl font-semibold tracking-wide text-primary dark:text-white">
            LegalEase
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary dark:text-white border-b-2 border-primary dark:border-white pb-1"
                      : "text-gray-500 dark:text-white/70 hover:text-primary dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-white/10 rounded-full px-3 py-1.5 w-56">
            <FiSearch className="text-gray-400 dark:text-white/60 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search lawyers..."
              className="bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/50 w-full"
            />
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition text-gray-700 dark:text-white"
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 dark:text-white/80 hover:text-primary dark:hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-500 dark:text-white/80 hover:text-primary dark:hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white"
            >
              {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>
            <button
              className="text-gray-700 dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-gray-700 dark:text-white/90 hover:text-primary dark:hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center bg-gray-100 dark:bg-white/10 rounded-full px-3 py-1.5">
            <FiSearch className="text-gray-400 dark:text-white/60 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search lawyers..."
              className="bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-white/50 w-full"
            />
          </div>
          <div className="flex gap-3 pt-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium bg-primary text-white px-4 py-1.5 rounded-full"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium text-gray-500 dark:text-white/90">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-gray-500 dark:text-white/90"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium bg-primary text-white px-4 py-1.5 rounded-full"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}