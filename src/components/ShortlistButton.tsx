"use client";

import { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import axiosInstance from "@/lib/axios";

export default function ShortlistButton({ lawyerId }: { lawyerId: string }) {
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkShortlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await axiosInstance.get(`/shortlist/check/${lawyerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsShortlisted(res.data.isShortlisted);
      } catch (err) {
        console.error("Failed to check shortlist:", err);
      } finally {
        setLoading(false);
      }
    };
    checkShortlist();
  }, [lawyerId]);

  const toggleShortlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to shortlist lawyers.");
        return;
      }
      await axiosInstance.post(
        `/shortlist/toggle/${lawyerId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsShortlisted(!isShortlisted);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update shortlist.");
    }
  };

  if (loading) return null;

  return (
    <button
      onClick={toggleShortlist}
      className={`p-3 rounded-full border transition ${
        isShortlisted
          ? "bg-red-500 border-red-500 text-white hover:bg-red-600"
          : "border-gray-border dark:border-white/10 hover:bg-gray-soft dark:hover:bg-white/10"
      }`}
      aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
    >
      <FiHeart
        size={20}
        className={isShortlisted ? "fill-white" : ""}
      />
    </button>
  );
}