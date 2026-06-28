"use client";

import { motion } from "framer-motion";

const topExperts = [
  { id: 1, name: "Farah Ahmed", hires: 142 },
  { id: 2, name: "Tanvir Rahman", hires: 118 },
  { id: 3, name: "Sadia Karim", hires: 97 },
];

export default function TopExperts() {
  return (
    <section className="py-20 bg-gray-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl text-primary mb-3">
            Top Legal Experts
          </h2>
          <p className="text-text-muted">
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
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <div className="w-20 h-20 rounded-full bg-primary text-white mx-auto mb-4 flex items-center justify-center text-2xl font-heading">
                {expert.name.charAt(0)}
              </div>
              <h3 className="font-medium text-primary mb-1">{expert.name}</h3>
              <p className="text-sm text-text-muted">
                {expert.hires} successful hires
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}