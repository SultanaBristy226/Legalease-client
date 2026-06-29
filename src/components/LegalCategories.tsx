"use client";
import Link from "next/link";
import { FiShield, FiBriefcase, FiHeart, FiHome, FiDollarSign, FiGlobe } from "react-icons/fi";

const categories = [
  { name: "Criminal", icon: FiShield },
  { name: "Corporate", icon: FiBriefcase },
  { name: "Family", icon: FiHeart },
  { name: "Property", icon: FiHome },
  { name: "Tax", icon: FiDollarSign },
  { name: "Immigration", icon: FiGlobe },
];

export default function LegalCategories() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-primary dark:text-white mb-3">
            Legal Categories
          </h2>
          <p className="text-gray-500 dark:text-white/60">
            Browse lawyers by area of expertise
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={`/browse-lawyers?category=${category.name}`}
                className="border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 rounded-xl p-6 text-center hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition group"
              >
                <Icon
                  className="mx-auto mb-3 text-primary dark:text-white/70 group-hover:text-white transition"
                  size={28}
                />
                <p className="text-sm font-medium text-gray-700 dark:text-white/80 group-hover:text-white transition">
                  {category.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}