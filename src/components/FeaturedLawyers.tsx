"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const placeholderLawyers = [
  {
    id: 1,
    name: "Farah Ahmed",
    specialization: "Corporate Law",
    rate: 60,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Rakib Hasan",
    specialization: "Family Law",
    rate: 45,
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Nadia Islam",
    specialization: "Criminal Law",
    rate: 55,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Tanvir Rahman",
    specialization: "Property Law",
    rate: 50,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Sadia Karim",
    specialization: "Tax Law",
    rate: 65,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Imran Hossain",
    specialization: "Immigration Law",
    rate: 48,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60",
  },
];

export default function FeaturedLawyers() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl sm:text-4xl text-primary mb-3">
          Featured Lawyers
        </h2>
        <p className="text-text-muted">
          Meet some of our top-rated legal professionals
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {placeholderLawyers.map((lawyer, index) => (
          <motion.div
            key={lawyer.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="border-2 border-primary rounded-xl p-5 text-center bg-white hover:bg-primary transition group cursor-pointer"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-primary group-hover:ring-white transition">
              <Image
                src={lawyer.image}
                alt={lawyer.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-medium text-primary group-hover:text-white mb-1 transition">
              {lawyer.name}
            </h3>
            <p className="text-sm text-text-muted group-hover:text-white/70 mb-2 transition">
              {lawyer.specialization}
            </p>
            <p className="text-sm font-semibold text-primary group-hover:text-white transition">
              ${lawyer.rate}/hr
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}