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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.patch(
        "/users/update-profile",
        { fullName, photoURL },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(token as string, res.data.user);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Update Profile</h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        {error && (
          <p className="bg-red-50 text-red-600 text-sm rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <label className="block text-sm text-text-muted mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full border border-gray-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm text-text-muted mb-1">
            Profile Picture URL
          </label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://..."
            className="w-full border border-gray-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}