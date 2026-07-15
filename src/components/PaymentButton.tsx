"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import axiosInstance from "@/lib/axios";

export default function PaymentButton({ hiringId, onSuccess }: { hiringId: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/payment/create-payment-intent", { hiringId });
      
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
        },
      });

      if (error) {
        console.error("Payment error:", error);
      } else {
        onSuccess();
      }
    } catch (err) {
      console.error("Payment failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePay}
      disabled={loading || !stripe}
      className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition disabled:opacity-60"
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  );
}