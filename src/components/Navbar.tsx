"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Lawyers", href: "/browse-lawyers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // TEMP: will be replaced with real auth state later
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 bg-primary text-white border-b border-gray-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl font-semibold tracking-wide"
          >
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
                      ? "text-white border-b-2 border-white pb-1"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search bar (desktop) */}
          <div className="hidden md:flex items-center bg-white/10 rounded-full px-3 py-1.5 w-56">
            <FiSearch className="text-white/60 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search lawyers..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full"
            />
          </div>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="text-sm font-medium bg-white text-primary px-4 py-2 rounded-full hover:bg-gray-soft transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-white/80 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-white text-primary px-4 py-2 rounded-full hover:bg-gray-soft transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-light border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-medium text-white/90 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5">
            <FiSearch className="text-white/60 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search lawyers..."
              className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-white/90"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium bg-white text-primary px-4 py-1.5 rounded-full"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}