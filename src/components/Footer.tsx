"use client";

import Link from "next/link";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white dark:bg-[#0a0a0a] dark:border-t dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-3">LegalEase</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Connecting clients with trusted legal experts. Find, hire, and
              consult with verified lawyers, all in one place.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <FiFacebook size={16} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <FiTwitter size={16} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <FiInstagram size={16} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              >
                <FiLinkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-white/60 mb-3">
              Get legal tips and updates in your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center bg-white/10 rounded-full overflow-hidden"
            >
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent outline-none text-sm text-white placeholder-white/50 px-4 py-2 w-full"
              />
              <button
                type="submit"
                className="bg-white text-primary text-sm font-medium px-4 py-2 whitespace-nowrap hover:bg-gray-soft transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/50">
          Copyright {year} LegalEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}