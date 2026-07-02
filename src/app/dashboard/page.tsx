"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiUsers, FiBriefcase, FiStar, FiDollarSign } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";

type Stats = {
  totalHires: number;
  totalComments: number;
  averageRating: number;
  totalSpent: number;
};

export default function DashboardHomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch user stats
        const res = await axiosInstance.get("/users/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        // Set dummy stats if API not ready
        setStats({
          totalHires: 0,
          totalComments: 0,
          averageRating: 0,
          totalSpent: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (!user) return null;

  const getInitial = () => {
    return user.fullName?.charAt(0)?.toUpperCase() || "U";
  };

  // Stats cards data
  const statCards = [
    {
      label: "Total Hires",
      value: stats?.totalHires || 0,
      icon: FiBriefcase,
      color: "bg-blue-500",
    },
    {
      label: "Comments",
      value: stats?.totalComments || 0,
      icon: FiStar,
      color: "bg-purple-500",
    },
    {
      label: "Avg Rating",
      value: stats?.averageRating || 0,
      icon: FiStar,
      color: "bg-yellow-500",
      suffix: " ★",
    },
    {
      label: "Total Spent",
      value: stats?.totalSpent || 0,
      icon: FiDollarSign,
      color: "bg-green-500",
      prefix: "$",
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4">
          {user.photoURL ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary dark:ring-white/30">
              <Image
                src={user.photoURL}
                alt={user.fullName}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center text-2xl font-heading">
              {getInitial()}
            </div>
          )}
          <div>
            <h1 className="font-heading text-2xl text-primary dark:text-white">
              Welcome back, {user.fullName}
            </h1>
            <p className="text-sm text-text-muted dark:text-white/50">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-border dark:border-white/10 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted dark:text-white/40 uppercase tracking-wider">
                  {card.label}
                </span>
                <div className={`w-8 h-8 rounded-lg ${card.color} bg-opacity-20 dark:bg-opacity-30 flex items-center justify-center`}>
                  <Icon className={`${card.color.replace("bg-", "text-")} text-opacity-80`} size={16} />
                </div>
              </div>
              <p className="font-heading text-2xl text-primary dark:text-white">
                {card.prefix || ""}
                {card.value}
                {card.suffix || ""}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-border dark:border-white/10 rounded-xl p-6">
          <h3 className="font-medium text-primary dark:text-white mb-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/browse-lawyers"
              className="text-center p-3 rounded-lg border border-gray-border dark:border-white/10 hover:border-primary dark:hover:border-white/30 transition text-sm text-text-muted dark:text-white/60 hover:text-primary dark:hover:text-white"
            >
              Browse Lawyers
            </a>
            <a
              href="/dashboard/user/hiring-history"
              className="text-center p-3 rounded-lg border border-gray-border dark:border-white/10 hover:border-primary dark:hover:border-white/30 transition text-sm text-text-muted dark:text-white/60 hover:text-primary dark:hover:text-white"
            >
              My Hires
            </a>
            <a
              href="/dashboard/user/update-profile"
              className="text-center p-3 rounded-lg border border-gray-border dark:border-white/10 hover:border-primary dark:hover:border-white/30 transition text-sm text-text-muted dark:text-white/60 hover:text-primary dark:hover:text-white"
            >
              Update Profile
            </a>
            <a
              href="/dashboard/user/comments"
              className="text-center p-3 rounded-lg border border-gray-border dark:border-white/10 hover:border-primary dark:hover:border-white/30 transition text-sm text-text-muted dark:text-white/60 hover:text-primary dark:hover:text-white"
            >
              My Comments
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-border dark:border-white/10 rounded-xl p-6">
          <h3 className="font-medium text-primary dark:text-white mb-2">Account Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-border dark:border-white/10">
              <span className="text-text-muted dark:text-white/40">Email</span>
              <span className="text-primary dark:text-white">{user.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-border dark:border-white/10">
              <span className="text-text-muted dark:text-white/40">Role</span>
              <span className="text-primary dark:text-white capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-text-muted dark:text-white/40">Status</span>
              <span className="text-green-600 dark:text-green-400">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}