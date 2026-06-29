"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function DashboardHomePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">My Profile</h1>

      <div className="border border-gray-border rounded-xl p-6 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          {user.photoURL ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={user.photoURL}
                alt={user.fullName}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-heading">
              {user.fullName.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium text-primary">{user.fullName}</p>
            <p className="text-sm text-text-muted">{user.email}</p>
            <p className="text-xs uppercase text-text-muted mt-1">{user.role}</p>
          </div>
        </div>

        <Link
          href="/dashboard/user/update-profile"
          className="inline-block bg-primary text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-primary-light transition"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
}