"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

type Analytics = {
  totalUsers: number;
  totalLawyers: number;
  totalHires: number;
  totalRevenue: number;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/admin/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return <p className="text-text-muted dark:text-white/50">Loading...</p>;
  }

  if (!data) {
    return <p className="text-text-muted dark:text-white/50">No data available.</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary dark:text-white mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-border dark:border-white/10 rounded-xl p-6 bg-white dark:bg-white/5">
          <p className="text-xs text-text-muted dark:text-white/40">Total Users</p>
          <p className="font-heading text-3xl text-primary dark:text-white">
            {data.totalUsers}
          </p>
        </div>

        <div className="border border-gray-border dark:border-white/10 rounded-xl p-6 bg-white dark:bg-white/5">
          <p className="text-xs text-text-muted dark:text-white/40">Total Lawyers</p>
          <p className="font-heading text-3xl text-primary dark:text-white">
            {data.totalLawyers}
          </p>
        </div>

        <div className="border border-gray-border dark:border-white/10 rounded-xl p-6 bg-white dark:bg-white/5">
          <p className="text-xs text-text-muted dark:text-white/40">Total Hires</p>
          <p className="font-heading text-3xl text-primary dark:text-white">
            {data.totalHires}
          </p>
        </div>

        <div className="border border-gray-border dark:border-white/10 rounded-xl p-6 bg-white dark:bg-white/5">
          <p className="text-xs text-text-muted dark:text-white/40">Total Revenue</p>
          <p className="font-heading text-3xl text-primary dark:text-white">
            ${data.totalRevenue}
          </p>
        </div>
      </div>
    </div>
  );
}