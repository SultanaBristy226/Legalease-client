"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

type ReceivedRequest = {
  _id: string;
  client: { fullName: string; email: string };
  fee: number;
  status: string;
  isPaid: boolean;
  createdAt: string;
};

export default function LawyerHiringHistoryPage() {
  const [requests, setRequests] = useState<ReceivedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/hiring/received", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Failed to fetch hiring requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id: string, status: "accepted" | "rejected") => {
    setActingId(id);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.patch(
        `/hiring/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setActingId(null);
    }
  };

  if (loading) {
    return <p className="text-text-muted">Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary mb-6">
        Hiring Requests
      </h1>

      {error && (
        <p className="bg-red-50 text-red-600 text-sm rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      {requests.length === 0 ? (
        <p className="text-text-muted">
          You haven&apos;t received any hiring requests yet.
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-border rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-soft text-left">
              <tr>
                <th className="px-4 py-3">Client Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Request Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-t border-gray-border">
                  <td className="px-4 py-3">{req.client?.fullName}</td>
                  <td className="px-4 py-3">{req.client?.email}</td>
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
                    {req.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAction(req._id, "accepted")}
                          disabled={actingId === req._id}
                          className="bg-primary text-white text-xs px-3 py-1.5 rounded-full hover:bg-primary-light transition disabled:opacity-60"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(req._id, "rejected")}
                          disabled={actingId === req._id}
                          className="border border-gray-border text-primary text-xs px-3 py-1.5 rounded-full hover:bg-gray-soft transition disabled:opacity-60"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-text-muted text-xs">
                        {req.isPaid ? "Paid" : "—"}
                      </span>
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