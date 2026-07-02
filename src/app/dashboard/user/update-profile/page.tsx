"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function UpdateProfilePage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(
        "/users/update-profile",
        { fullName, photoURL },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update auth context with new user data
      login(token as string, res.data.user);
      setSuccess("Profile updated successfully!");
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary dark:text-white mb-6">
        Update Profile
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        {error && (
          <p className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm rounded-md px-3 py-2">
            {success}
          </p>
        )}

        <div>
          <label className="block text-sm text-text-muted dark:text-white/60 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full border border-gray-border dark:border-white/10 rounded-md px-3 py-2 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary placeholder:text-text-muted dark:placeholder:text-white/40"
          />
        </div>

        <div>
          <label className="block text-sm text-text-muted dark:text-white/60 mb-1">
            Profile Picture URL
          </label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://..."
            className="w-full border border-gray-border dark:border-white/10 rounded-md px-3 py-2 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary placeholder:text-text-muted dark:placeholder:text-white/40"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary dark:bg-white text-white dark:text-primary px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light dark:hover:bg-gray-soft transition disabled:opacity-60 w-full"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}