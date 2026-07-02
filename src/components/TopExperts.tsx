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
  totalHires: number;
};

export default function TopExperts() {
  const [experts, setExperts] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axiosInstance.get("/lawyers", {
          params: { limit: 3, page: 1 },
        });
        const sorted = (res.data.lawyers || [])
          .sort((a: Lawyer, b: Lawyer) => (b.totalHires || 0) - (a.totalHires || 0))
          .slice(0, 3);
        setExperts(sorted);
      } catch (err) {
        console.error("Failed to fetch top experts:", err);
        setExperts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-soft dark:bg-[#0a0a0a] dark:border-t dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-primary dark:text-white mb-3">
              Top Legal Experts
            </h2>
            <p className="text-text-muted dark:text-white/50">Loading...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-white/5 border border-gray-border dark:border-white/10 rounded-xl p-6 text-center animate-pulse h-48"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (experts.length === 0) {
    return (
      <section className="py-20 bg-gray-soft dark:bg-[#0a0a0a] dark:border-t dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl text-primary dark:text-white mb-3">
              Top Legal Experts
            </h2>
            <p className="text-text-muted dark:text-white/50">No experts available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-soft dark:bg-[#0a0a0a] dark:border-t dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-primary dark:text-white mb-3">
            Top Legal Experts
          </h2>
          <p className="text-text-muted dark:text-white/50">
            Our most trusted lawyers, based on hiring history
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {experts.map((expert, index) => (
            <motion.div
              key={expert._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/lawyers/${expert._id}`}
                className="block bg-white dark:bg-white/5 border border-gray-border dark:border-white/10 rounded-xl p-6 text-center hover:shadow-md dark:hover:bg-white/10 transition"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-primary dark:ring-white/30">
                  <Image
                    src={expert.photo}
                    alt={expert.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-primary dark:text-white mb-1">
                  {expert.name}
                </h3>
                <p className="text-sm text-text-muted dark:text-white/50">
                  {expert.totalHires || 0} successful hires
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}