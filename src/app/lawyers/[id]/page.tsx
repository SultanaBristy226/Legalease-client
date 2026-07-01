"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

type Lawyer = {
  _id: string;
  name: string;
  photo: string;
  specialization: string;
  bio: string;
  hourlyRate: number;
  status: string;
  createdAt: string;
};

type Comment = {
  _id: string;
  text: string;
  user: { fullName: string };
  createdAt: string;
};

export default function LawyerDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hireStatus, setHireStatus] = useState("");
  const [hireLoading, setHireLoading] = useState(false);

  // Comment states
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch lawyer details
  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await axiosInstance.get(`/lawyers/${id}`);
        setLawyer(res.data.lawyer);
      } catch (err) {
        console.error("Failed to fetch lawyer:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchLawyer();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/comments/lawyer/${id}`);
        setComments(res.data.comments);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };
    if (id) fetchComments();
  }, [id]);

  // Handle hire request
  const handleHire = async () => {
    setHireLoading(true);
    setHireStatus("");
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "/hiring",
        { lawyerId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHireStatus("success");
    } catch (err: any) {
      setHireStatus(err.response?.data?.message || "Something went wrong.");
    } finally {
      setHireLoading(false);
    }
  };

  // Handle comment submit
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to comment.");
      return;
    }
    if (user.role !== "user") {
      alert("Only clients can comment.");
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.post(
        "/comments",
        { lawyerId: id, text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      const res = await axiosInstance.get(`/comments/lawyer/${id}`);
      setComments(res.data.comments);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 animate-pulse dark:bg-[#0a0a0a]">
        <div className="h-40 w-40 rounded-full bg-gray-soft dark:bg-white/5 mx-auto mb-6"></div>
        <div className="h-6 bg-gray-soft dark:bg-white/5 rounded w-1/3 mx-auto mb-3"></div>
        <div className="h-4 bg-gray-soft dark:bg-white/5 rounded w-1/4 mx-auto"></div>
      </main>
    );
  }

  if (!lawyer) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center text-text-muted dark:text-white/50 dark:bg-[#0a0a0a]">
        Lawyer not found.
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16 dark:bg-[#0a0a0a]">
      <div className="text-center">
        <div className="relative w-36 h-36 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-primary dark:ring-white/30">
          <Image
            src={lawyer.photo}
            alt={lawyer.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="font-heading text-3xl text-primary dark:text-white mb-1">
          {lawyer.name}
        </h1>
        <p className="text-text-muted dark:text-white/50 mb-3">
          {lawyer.specialization}
        </p>

        <span
          className={`inline-block text-xs px-3 py-1 rounded-full mb-6 ${
            lawyer.status === "available"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {lawyer.status === "available" ? "Available" : "Busy"}
        </span>

        <div className="border border-gray-border dark:border-white/10 rounded-xl p-6 text-left mb-8 bg-white dark:bg-white/5">
          <h2 className="font-medium text-primary dark:text-white mb-2">About</h2>
          <p className="text-sm text-text-muted dark:text-white/60 leading-relaxed mb-4">
            {lawyer.bio}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-muted dark:text-white/40">
                Consultation Fee
              </p>
              <p className="font-semibold text-primary dark:text-white">
                ${lawyer.hourlyRate}/hr
              </p>
            </div>
            <div>
              <p className="text-text-muted dark:text-white/40">Date Joined</p>
              <p className="font-semibold text-primary dark:text-white">
                {new Date(lawyer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {user ? (
          user.role === "user" ? (
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary-light transition"
            >
              Hire This Lawyer
            </button>
          ) : (
            <p className="text-sm text-text-muted dark:text-white/50">
              Only clients can hire lawyers.
            </p>
          )
        ) : (
          <p className="text-sm text-text-muted dark:text-white/50">
            Please login as a client to hire this lawyer.
          </p>
        )}
      </div>

      {/* Hire Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 max-w-sm w-full text-center">
            {hireStatus === "success" ? (
              <>
                <h3 className="font-heading text-xl text-primary dark:text-white mb-2">
                  Request Sent!
                </h3>
                <p className="text-sm text-text-muted dark:text-white/50 mb-5">
                  Your hiring request has been sent to {lawyer.name}. You can
                  track its status in your dashboard.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h3 className="font-heading text-xl text-primary dark:text-white mb-2">
                  Confirm Hiring Request
                </h3>
                <p className="text-sm text-text-muted dark:text-white/50 mb-5">
                  Send a hiring request to {lawyer.name} for ${lawyer.hourlyRate}/hr?
                </p>
                {hireStatus && (
                  <p className="text-red-600 dark:text-red-400 text-sm mb-4">
                    {hireStatus}
                  </p>
                )}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="border border-gray-border dark:border-white/10 px-5 py-2 rounded-full text-sm dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleHire}
                    disabled={hireLoading}
                    className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium disabled:opacity-60"
                  >
                    {hireLoading ? "Sending..." : "Confirm"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-10 border-t border-gray-border dark:border-white/10 pt-8">
        <h2 className="font-heading text-xl text-primary dark:text-white mb-4">
          Comments ({comments.length})
        </h2>

        {user && user.role === "user" && (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this lawyer..."
              className="w-full border border-gray-border dark:border-white/10 rounded-lg px-4 py-3 text-sm bg-white dark:bg-white/5 text-primary dark:text-white focus:outline-none focus:border-primary placeholder:text-text-muted dark:placeholder:text-white/40"
              rows={3}
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary-light transition disabled:opacity-60"
            >
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        )}

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-text-muted dark:text-white/40 text-center py-4">
              No comments yet. Be the first to share your experience!
            </p>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="border-b border-gray-border dark:border-white/10 pb-4 last:border-0"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-primary dark:text-white">
                    {c.user?.fullName || "Anonymous"}
                  </span>
                  <span className="text-xs text-text-muted dark:text-white/40">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-text-muted dark:text-white/60">
                  {c.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}