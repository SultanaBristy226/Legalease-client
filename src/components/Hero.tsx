"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section
      className="relative w-full h-[80vh] min-h-[480px] flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&auto=format&fit=crop&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isDark
            ? "linear-gradient(90deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.35) 100%)"
            : "linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 45%, rgba(255,255,255,0.15) 100%)",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className={`text-sm uppercase tracking-widest mb-4 ${isDark ? "text-white/50" : "text-primary/60"}`}>
            Trusted Legal Counsel
          </p>

          <h1 className={`font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Find &amp; Hire Expert Legal Counsel
          </h1>

          <p className={`text-lg mb-8 max-w-md ${isDark ? "text-white/70" : "text-gray-600"}`}>
            Connect with verified, experienced lawyers across every
            specialization. Fast, secure, and built for trust.
          </p>

          <Link
            href="/browse-lawyers"
            className={`inline-block font-medium px-7 py-3 rounded-full transition ${
              isDark
                ? "bg-white text-primary hover:bg-gray-100"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            Browse Lawyers
          </Link>
        </motion.div>
      </div>
    </section>
  );
}