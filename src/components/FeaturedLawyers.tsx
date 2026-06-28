"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const placeholderLawyers = [
  {
    id: 1,
    name: "Sultana Bristy",
    specialization: "Corporate Law",
    rate: 60,
    image: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Jamil Joy",
    specialization: "Family Law",
    rate: 45,
    image: "https://images.unsplash.com/photo-1528900403525-dc523d4f18d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW91bmclMjBtYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    name: "Raihan Ahmed",
    specialization: "Tax Law",
    rate: 55,
    image: "https://images.unsplash.com/photo-1624797432677-6f803a98acb3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8eW91bmclMjBtYW58ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Amina Meem",
    specialization: "Property Law",
    rate: 50,
    image: "https://images.unsplash.com/photo-1690444963408-9573a17a8058?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Saima Rahman",
    specialization: "Criminal Law",
    rate: 65,
    image: "https://images.unsplash.com/photo-1690149346865-11563e802dfb?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Khadija Islam",
    specialization: "Immigration Law",
    rate: 48,
    image: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tYW58ZW58MHx8MHx8fDA%3D",
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
            className="border-2 border-primary rounded-xl p-5 text-center bg-white hover:bg-primary transition-all duration-300 group cursor-pointer"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-primary group-hover:ring-white transition-all duration-300">
              <Image
                src={lawyer.image}
                alt={lawyer.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <h3 className="font-medium text-primary group-hover:text-white mb-1 transition-colors duration-300">
              {lawyer.name}
            </h3>
            <p className="text-sm text-text-muted group-hover:text-white/70 mb-2 transition-colors duration-300">
              {lawyer.specialization}
            </p>
            <p className="text-sm font-semibold text-primary group-hover:text-white transition-colors duration-300">
              ${lawyer.rate}/hr
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}