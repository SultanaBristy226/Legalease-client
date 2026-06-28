"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

type HiringRequestItem = {
  _id: string;
  lawyer: { name: string; specialization: string; photo: string };
  fee: number;
  status: string;
  isPaid: boolean;
  createdAt: string;
};

export default function UserHiringHistoryPage() {
  const [requests, setRequests] = useState<HiringRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/hiring/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Failed to fetch hiring history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handlePay = async (id: string) => {
    setPayingId(id);
    try {
      const token = localStorage.getItem("token");
      // NOTE: This is a placeholder pay action until Stripe is integrated.
      await axiosInstance.patch(
        `/hiring/${id}/pay`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err) {
      console.error("Payment failed:", err);
    } finally {
      setPayingId(null);
    }
  };

  if (loading) {
    return <p className="text-text-muted">Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">Hiring History</h1>

      {requests.length === 0 ? (
        <p className="text-text-muted">You haven&apos;t hired any lawyers yet.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-soft text-left">
              <tr>
                <th className="px-4 py-3">Lawyer</th>
                <th className="px-4 py-3">Specialization</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t border-gray-border">
                  <td className="px-4 py-3">{req.lawyer?.name}</td>
                  <td className="px-4 py-3">{req.lawyer?.specialization}</td>
                  <td className="px-4 py-3">${req.fee}</td>
                  <td className="px-4 py-3">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        req.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : req.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {req.status === "accepted" ? (
                      req.isPaid ? (
                        <button
                          disabled
                          className="bg-gray-soft text-text-muted text-xs px-3 py-1.5 rounded-full cursor-not-allowed"
                        >
                          Paid
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePay(req._id)}
                          disabled={payingId === req._id}
                          className="bg-primary text-white text-xs px-3 py-1.5 rounded-full hover:bg-primary-light transition disabled:opacity-60"
                        >
                          {payingId === req._id ? "Processing..." : "Pay"}
                        </button>
                      )
                    ) : (
                      <span className="text-text-muted text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}