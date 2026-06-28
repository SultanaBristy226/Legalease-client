"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

type Lawyer = {
  _id: string;
  name: string;
  photo: string;
  specialization: string;
  hourlyRate: number;
  status: string;
};

export default function BrowseLawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/lawyers", {
          params: { search, page, limit: 8 },
        });
        setLawyers(res.data.lawyers);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch lawyers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [search, page]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl text-primary mb-3">
          Browse Lawyers
        </h1>
        <p className="text-text-muted">
          Find the right legal expert for your needs
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or specialization..."
          className="w-full border border-gray-border rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-border rounded-xl p-5 h-56 bg-gray-soft animate-pulse"
            ></div>
          ))}
        </div>
      ) : lawyers.length === 0 ? (
        <p className="text-center text-text-muted py-20">
          No lawyers found matching your search.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {lawyers.map((lawyer) => (
              <Link
                key={lawyer._id}
                href={`/lawyers/${lawyer._id}`}
                className="border-2 border-primary rounded-xl p-5 text-center bg-white hover:bg-primary transition group relative"
              >
                {lawyer.status === "busy" && (
                  <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-0.5 rounded-full group-hover:bg-white group-hover:text-primary">
                    Busy
                  </span>
                )}
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-primary group-hover:ring-white transition">
                  <Image
                    src={lawyer.photo}
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
                  ${lawyer.hourlyRate}/hr
                </p>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition ${
                    page === i + 1
                      ? "bg-primary text-white"
                      : "border border-gray-border text-primary hover:bg-gray-soft"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}