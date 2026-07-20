"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axiosInstance from "@/lib/axios";

export default function ShortlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShortlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/shortlist/my-shortlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(res.data.shortlist || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShortlist();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Shortlist</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">You haven't shortlisted any lawyers yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(({ _id, lawyer }) => (
            <Link
              key={_id}
              href={`/lawyers/${lawyer._id}`}
              className="border rounded-xl p-4 text-center hover:shadow-lg transition"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                <Image src={lawyer.photo} alt={lawyer.name} fill className="object-cover" />
              </div>
              <h3 className="font-semibold">{lawyer.name}</h3>
              <p className="text-sm text-gray-500">{lawyer.specialization}</p>
              <p className="text-sm font-semibold mt-1">${lawyer.hourlyRate}/hr</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}