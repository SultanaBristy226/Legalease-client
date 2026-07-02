"use client";

import { useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHomePage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleEdit = () => {
    router.push("/dashboard/user/update-profile");
  };

  return (
    <div>
      <div className="border border-gray-border dark:border-white/10 rounded-xl p-6 bg-white dark:bg-white/5">
        <div className="flex items-center justify-between mb-5">
          <p className="font-medium text-primary dark:text-white">Account Details</p>
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 bg-primary dark:bg-white text-white dark:text-primary text-xs font-medium px-4 py-2 rounded-full hover:bg-primary-light dark:hover:bg-gray-soft transition"
          >
            <FiEdit2 size={13} /> Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-text-muted dark:text-white/40 mb-1">Full Name</p>
            <p className="text-sm text-primary dark:text-white">{user.fullName}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted dark:text-white/40 mb-1">Email</p>
            <p className="text-sm text-primary dark:text-white">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted dark:text-white/40 mb-1">Role</p>
            <p className="text-sm text-primary dark:text-white capitalize">{user.role}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted dark:text-white/40 mb-1">Status</p>
            <p className="text-sm text-green-700 dark:text-green-400">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}