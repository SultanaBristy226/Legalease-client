"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import PaymentButton from "@/components/PaymentButton";

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

  if (loading) {
    return <p className="text-text-muted">Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary dark:text-white mb-6">
        Hiring History
      </h1>

      {requests.length === 0 ? (
        <p className="text-text-muted dark:text-white/50">
          You haven&apos;t hired any lawyers yet.
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-border dark:border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-soft dark:bg-white/5 text-left">
              <tr>
                <th className="px-4 py-3 text-primary dark:text-white">Lawyer</th>
                <th className="px-4 py-3 text-primary dark:text-white">Specialization</th>
                <th className="px-4 py-3 text-primary dark:text-white">Fee</th>
                <th className="px-4 py-3 text-primary dark:text-white">Date</th>
                <th className="px-4 py-3 text-primary dark:text-white">Status</th>
                <th className="px-4 py-3 text-primary dark:text-white">Payment</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t border-gray-border dark:border-white/10">
                  <td className="px-4 py-3 text-primary dark:text-white">{req.lawyer?.name}</td>
                  <td className="px-4 py-3 text-text-muted dark:text-white/60">
                    {req.lawyer?.specialization}
                  </td>
                  <td className="px-4 py-3 text-primary dark:text-white">${req.fee}</td>
                  <td className="px-4 py-3 text-text-muted dark:text-white/60">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        req.status === "accepted"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : req.status === "rejected"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {req.status === "accepted" ? (
                      req.isPaid ? (
                        <span className="text-green-600 dark:text-green-400 font-medium text-xs">
                          Paid
                        </span>
                      ) : (
                        <PaymentButton hiringId={req._id} amount={req.fee} />
                      )
                    ) : (
                      <span className="text-text-muted dark:text-white/40 text-xs">—</span>
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