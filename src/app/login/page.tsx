"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      if (data) {
        const userData = {
          id: data.user.id,
          fullName: data.user.name,
          email: data.user.email,
          role: data.user.role || "user",
          photoURL: data.user.image || "",
        };
        
        localStorage.setItem("token", data.session?.accessToken || "");
        login(data.session?.accessToken || "", userData);
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: any) {
      console.error("Google login error:", err);
      setError(err.message || "Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-white dark:bg-[#0a0a0a] px-4 py-12">
      <div className="w-full max-w-md border border-gray-border dark:border-white/10 rounded-xl p-8 bg-white dark:bg-white/5">
        <h1 className="font-heading text-2xl text-primary dark:text-white mb-6 text-center">
          Welcome Back
        </h1>

        {error && (
          <p className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-text-muted dark:text-white/60 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-border dark:border-white/10 rounded-md px-3 py-2 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary placeholder:text-text-muted dark:placeholder:text-white/40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary dark:bg-white text-white dark:text-primary rounded-md py-2.5 text-sm font-medium hover:bg-primary-light dark:hover:bg-gray-soft transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-border dark:border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-white/5 text-text-muted dark:text-white/40">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full border border-gray-border dark:border-white/10 rounded-md py-2.5 text-sm font-medium hover:bg-gray-soft dark:hover:bg-white/10 transition text-primary dark:text-white disabled:opacity-60"
        >
          <FaGoogle className="inline mr-2 text-red-500" />
          {googleLoading ? "Loading..." : "Continue with Google"}
        </button>

        <p className="text-sm text-text-muted dark:text-white/50 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary dark:text-white font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}