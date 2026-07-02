"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";

type Lawyer = {
  _id: string;
  name: string;
  photo: string;
  specialization: string;
  hourlyRate: number;
  status: string;
};

export default function FeaturedLawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axiosInstance.get("/lawyers", {
          params: { limit: 6, page: 1 }, // Only 6 lawyers
        });
        setLawyers(res.data.lawyers || []);
      } catch (err) {
        console.error("Failed to fetch featured lawyers:", err);
        setLawyers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyers();
  }, []);

  if (loading) {
    return (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-primary dark:text-white mb-3">
            Featured Lawyers
          </h2>
          <p className="text-text-muted dark:text-white/50">Loading...</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border-2 border-primary dark:border-white/20 rounded-xl p-5 text-center bg-white dark:bg-white/5 animate-pulse h-64"
            ></div>
          ))}
        </div>
      </section>
    );
  }

  if (lawyers.length === 0) {
    return (
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-primary dark:text-white mb-3">
            Featured Lawyers
          </h2>
          <p className="text-text-muted dark:text-white/50">No lawyers available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-[#0a0a0a]">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl sm:text-4xl text-primary dark:text-white mb-3">
          Featured Lawyers
        </h2>
        <p className="text-text-muted dark:text-white/50">
          Meet some of our top-rated legal professionals
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {lawyers.map((lawyer, index) => (
          <motion.div
            key={lawyer._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Link
              href={`/lawyers/${lawyer._id}`}
              className="block border-2 border-primary dark:border-white/20 rounded-xl p-5 text-center bg-white dark:bg-white/5 hover:bg-primary transition-all duration-300 group cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-primary dark:ring-white/30 group-hover:ring-white transition-all duration-300">
                <Image
                  src={lawyer.photo}
                  alt={lawyer.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-primary dark:text-white group-hover:text-white mb-1 transition-colors duration-300">
                {lawyer.name}
              </h3>
              <p className="text-sm text-text-muted dark:text-white/50 group-hover:text-white/70 mb-2 transition-colors duration-300">
                {lawyer.specialization}
              </p>
              <p className="text-sm font-semibold text-primary dark:text-white group-hover:text-white transition-colors duration-300">
                ${lawyer.hourlyRate}/hr
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}