"use client";

import { useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHomePage() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <div>
      <div className="border border-gray-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="font-medium text-primary">Account Details</p>
          <button
            onClick={() => router.push("/dashboard/user/update-profile")}
            className="flex items-center gap-1.5 bg-primary text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-primary-light transition"
          >
            <FiEdit2 size={13} /> Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-text-muted mb-1">Full Name</p>
            <p className="text-sm text-primary">{user.fullName}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Email</p>
            <p className="text-sm text-primary">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Role</p>
            <p className="text-sm text-primary capitalize">{user.role}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Status</p>
            <p className="text-sm text-green-700">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}