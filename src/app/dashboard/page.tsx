"use client";

import Image from "next/image";
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
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            {user.photoURL ? (
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary dark:ring-white/30">
                <Image
                  src={user.photoURL}
                  alt={user.fullName}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-heading">
                {user.fullName?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <p className="font-medium text-primary dark:text-white">{user.fullName}</p>
              <p className="text-sm text-text-muted dark:text-white/50">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 bg-primary dark:bg-white text-white dark:text-primary text-xs font-medium px-4 py-2 rounded-full hover:bg-primary-light dark:hover:bg-gray-soft transition"
          >
            <FiEdit2 size={13} /> Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 pt-4 border-t border-gray-border dark:border-white/10">
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