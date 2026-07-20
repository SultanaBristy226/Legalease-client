"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosInstance from "@/lib/axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Checkout Form Component
function CheckoutForm({ hiringId, onSuccess, onCancel }: { hiringId: string; onSuccess: () => void; onCancel: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (submitError) {
        setError(submitError.message || "Payment failed");
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-primary text-white py-2 rounded-full font-medium hover:bg-primary-light transition disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-full font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Main Payment Button Component
export default function PaymentButton({ hiringId, amount }: { hiringId: string; amount: number }) {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/payment/create-payment-intent",
        { hiringId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClientSecret(res.data.clientSecret);
      setShowPayment(true);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    // Refresh the page or update UI
    window.location.reload();
  };

  const handleCancel = () => {
    setShowPayment(false);
    setClientSecret("");
  };

  // Show payment form
  if (showPayment && clientSecret) {
    return (
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-medium text-gray-900 mb-3">Complete Payment</h3>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm 
            hiringId={hiringId} 
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </Elements>
      </div>
    );
  }

  // Show pay button
  return (
    <button
      onClick={initiatePayment}
      disabled={loading}
      className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-light transition disabled:opacity-60 text-sm"
    >
      {loading ? "Loading..." : `Pay $${amount}`}
    </button>
  );
}