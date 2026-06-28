"use client";

import { motion } from "framer-motion";

const placeholderLawyers = [
  { id: 1, name: "Farah Ahmed", specialization: "Corporate Law", rate: 60 },
  { id: 2, name: "Rakib Hasan", specialization: "Family Law", rate: 45 },
  { id: 3, name: "Nadia Islam", specialization: "Criminal Law", rate: 55 },
  { id: 4, name: "Tanvir Rahman", specialization: "Property Law", rate: 50 },
  { id: 5, name: "Sadia Karim", specialization: "Tax Law", rate: 65 },
  { id: 6, name: "Imran Hossain", specialization: "Immigration Law", rate: 48 },
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
            whileHover={{ scale: 1.03 }}
            className="border border-gray-border rounded-xl p-5 text-center bg-white"
          >
            <div className="w-16 h-16 rounded-full bg-gray-soft mx-auto mb-3 flex items-center justify-center text-xl font-heading text-primary">
              {lawyer.name.charAt(0)}
            </div>
            <h3 className="font-medium text-primary mb-1">{lawyer.name}</h3>
            <p className="text-sm text-text-muted mb-2">
              {lawyer.specialization}
            </p>
            <p className="text-sm font-semibold text-primary">
              ${lawyer.rate}/hr
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}