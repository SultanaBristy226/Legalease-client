"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/register", formData);
      login(res.data.token, res.data.user);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-[#0a0a0a] px-4 py-12">
      <div className="w-full max-w-md border border-gray-border dark:border-white/10 rounded-xl p-8 bg-white dark:bg-white/5">
        <h1 className="font-heading text-2xl text-primary dark:text-white mb-6 text-center">
          Create an Account
        </h1>

        {error && (
          <p className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-muted dark:text-white/60 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-border dark:border-white/10 rounded-md px-3 py-2 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary placeholder:text-text-muted dark:placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted dark:text-white/60 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-border dark:border-white/10 rounded-md px-3 py-2 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary placeholder:text-text-muted dark:placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted dark:text-white/60 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-border dark:border-white/10 rounded-md px-3 py-2 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary placeholder:text-text-muted dark:placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted dark:text-white/60 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-border dark:border-white/10 rounded-md px-3 py-2 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary placeholder:text-text-muted dark:placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted dark:text-white/60 mb-1">
              I want to join as
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-border dark:border-white/10 rounded-md px-3 py-2 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary"
            >
              <option value="user">User (Client)</option>
              <option value="lawyer">Lawyer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary dark:bg-white text-white dark:text-primary rounded-md py-2.5 text-sm font-medium hover:bg-primary-light dark:hover:bg-gray-soft transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-text-muted dark:text-white/50 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary dark:text-white font-medium">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}