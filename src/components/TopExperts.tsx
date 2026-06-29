"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const topExperts = [
  {
    id: 1,
    name: "Sultana Bristy",
    hires: 178,
    image: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Sarim Ahmed",
    hires: 118,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Ayasha Tasnim",
    hires: 92,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
  },
];

export default function TopExperts() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-t dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">
            Top Legal Experts
          </h2>
          <p className="text-gray-500 dark:text-white/60">
            Our most trusted lawyers, based on hiring history
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {topExperts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 text-center"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-gray-300 dark:ring-white">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">{expert.name}</h3>
              <p className="text-sm text-gray-500 dark:text-white/60">
                {expert.hires} successful hires
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}