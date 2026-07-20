"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const paymentIntentId = params.get("payment_intent");
      const redirectStatus = params.get("redirect_status");

      if (redirectStatus === "succeeded") {
        setStatus("success");
        setLoading(false);
        return;
      }

      if (paymentIntentId) {
        try {
          const token = localStorage.getItem("token");
          await axiosInstance.post(
            "/payment/confirm-payment",
            { paymentIntentId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setStatus("success");
        } catch (err) {
          console.error("Payment confirmation failed:", err);
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
      setLoading(false);
    };

    confirmPayment();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600">Confirming your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">Something went wrong with your payment. Please try again.</p>
        <Link
          href="/dashboard/user/hiring-history"
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition"
        >
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Your payment has been completed successfully.</p>
      <div className="flex gap-4">
        <Link
          href="/dashboard/user/hiring-history"
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition"
        >
          View Hiring History
        </Link>
        <Link
          href="/"
          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-50 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}