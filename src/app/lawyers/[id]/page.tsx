"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCalendar, FiDollarSign, FiCheckCircle, FiXCircle, FiEdit2, FiTrash2 } from "react-icons/fi";
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
  rating: number;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    profilePicture?: string;
  };
};

export default function LawyerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const lawyerId = params.id as string;

  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [canComment, setCanComment] = useState(false);

  const [showHireModal, setShowHireModal] = useState(false);
  const [hiring, setHiring] = useState(false);
  const [hireMessage, setHireMessage] = useState("");

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);

  // Fetch lawyer details
  useEffect(() => {
    const fetchLawyer = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/lawyers/${lawyerId}`);
        setLawyer(res.data);
      } catch (err) {
        console.error("Failed to fetch lawyer:", err);
      } finally {
        setLoading(false);
      }
    };
    if (lawyerId) fetchLawyer();
  }, [lawyerId]);

  // Fetch comments
  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      const res = await axiosInstance.get(`/comments/lawyer/${lawyerId}`);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setCommentsLoading(false);
    }
  }, [lawyerId]);

  useEffect(() => {
    if (lawyerId) fetchComments();
  }, [lawyerId, fetchComments]);

  // Check if user has hired this lawyer (to allow commenting)
  useEffect(() => {
    const checkHiringStatus = async () => {
      if (!user) {
        setCanComment(false);
        return;
      }
      try {
        const res = await axiosInstance.get("/hiring/my-requests");
        const hired = res.data.requests.some(
          (h: { lawyer: { _id: string } | string; status: string }) => {
            const lawId = typeof h.lawyer === "string" ? h.lawyer : h.lawyer._id;
            return lawId === lawyerId;
          }
        );
        setCanComment(hired);
      } catch (err) {
        console.error("Failed to check hiring status:", err);
      }
    };
    checkHiringStatus();
  }, [user, lawyerId]);

  const handleHire = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setHiring(true);
    setHireMessage("");
    try {
      await axiosInstance.post("/hiring", { lawyerId });
      setHireMessage("Hiring request sent successfully!");
      setTimeout(() => {
        setShowHireModal(false);
        setHireMessage("");
      }, 1800);
    } catch (err: any) {
      setHireMessage(err.response?.data?.message || "Failed to send request.");
    } finally {
      setHiring(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    setSubmittingComment(true);
    setCommentError("");
    try {
      await axiosInstance.post("/comments", {
        lawyerId,
        text: newComment,
        rating: newRating,
      });
      setNewComment("");
      setNewRating(5);
      fetchComments();
    } catch (err: any) {
      setCommentError(err.response?.data?.message || "Failed to post comment.");
    } finally {
      setSubmittingComment(false);
    }
  };

  const startEdit = (comment: Comment) => {
    setEditingId(comment._id);
    setEditText(comment.text);
    setEditRating(comment.rating);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = async (id: string) => {
    try {
      await axiosInstance.put(`/comments/${id}`, {
        text: editText,
        rating: editRating,
      });
      setEditingId(null);
      fetchComments();
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await axiosInstance.delete(`/comments/${id}`);
      fetchComments();
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-white/10 rounded-2xl mb-8"></div>
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-white/10 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-white/10 rounded"></div>
      </main>
    );
  }

  if (!lawyer) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Lawyer not found
        </h1>
        <p className="text-gray-500 dark:text-white/60">
          The lawyer you&apos;re looking for doesn&apos;t exist.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-[#0a0a0a]">
      {/* Lawyer Info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"
      >
        <div className="md:col-span-1">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-4 ring-primary/10 dark:ring-white/10">
            <Image src={lawyer.photo} alt={lawyer.name} fill className="object-cover" />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading text-3xl font-semibold text-gray-900 dark:text-white">
              {lawyer.name}
            </h1>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                lawyer.status === "busy"
                  ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                  : "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
              }`}
            >
              {lawyer.status === "busy" ? "Busy" : "Available"}
            </span>
          </div>
          <p className="text-primary dark:text-white/70 font-medium mb-4">
            {lawyer.specialization}
          </p>
          <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-6">
            {lawyer.bio}
          </p>

          <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-500 dark:text-white/50">
            <div className="flex items-center gap-2">
              <FiDollarSign /> ${lawyer.hourlyRate}/hr
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar /> Joined{" "}
              {new Date(lawyer.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          <button
            onClick={() => setShowHireModal(true)}
            disabled={lawyer.status === "busy"}
            className="bg-primary text-white font-medium px-7 py-3 rounded-full hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {lawyer.status === "busy" ? "Currently Unavailable" : "Hire Now"}
          </button>
        </div>
      </motion.div>

      {/* Hire Modal */}
      {showHireModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Confirm Hiring Request
            </h3>
            <p className="text-gray-500 dark:text-white/60 text-sm mb-6">
              You&apos;re about to send a hiring request to{" "}
              <span className="font-medium text-gray-900 dark:text-white">{lawyer.name}</span> for{" "}
              <span className="font-medium text-gray-900 dark:text-white">${lawyer.hourlyRate}/hr</span>.
            </p>

            {hireMessage && (
              <p
                className={`text-sm mb-4 ${
                  hireMessage.includes("success") ? "text-green-600" : "text-red-500"
                }`}
              >
                {hireMessage}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowHireModal(false)}
                className="flex-1 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleHire}
                disabled={hiring}
                className="flex-1 bg-primary text-white py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition disabled:opacity-60"
              >
                {hiring ? "Sending..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="border-t border-gray-100 dark:border-white/10 pt-12">
        <h2 className="font-heading text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Client Reviews ({comments.length})
        </h2>

        {/* New comment form - only for users who hired this lawyer */}
        {user && canComment && (
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-5 mb-8">
            <p className="text-sm font-medium text-gray-700 dark:text-white/80 mb-3">
              Share your experience
            </p>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className={`text-xl ${
                    star <= newRating ? "text-yellow-400" : "text-gray-300 dark:text-white/20"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your review..."
              rows={3}
              className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-lg p-3 text-sm outline-none focus:border-primary dark:focus:border-white/30 mb-3"
            />
            {commentError && (
              <p className="text-red-500 text-xs mb-2">{commentError}</p>
            )}
            <button
              onClick={handleCommentSubmit}
              disabled={submittingComment || !newComment.trim()}
              className="bg-primary text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-primary/90 transition disabled:opacity-50"
            >
              {submittingComment ? "Posting..." : "Post Review"}
            </button>
          </div>
        )}

        {user && !canComment && (
          <p className="text-sm text-gray-400 dark:text-white/40 mb-8 italic">
            Only clients who have hired this lawyer can leave a review.
          </p>
        )}

        {!user && (
          <p className="text-sm text-gray-400 dark:text-white/40 mb-8 italic">
            Please log in and hire this lawyer to leave a review.
          </p>
        )}

        {/* Comments list */}
        {commentsLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-400 dark:text-white/40 text-sm">
            No reviews yet. Be the first to share your experience.
          </p>
        ) : (
          <div className="space-y-5">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="border border-gray-100 dark:border-white/10 rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary dark:text-white font-medium text-sm">
                      {comment.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {comment.user?.name || "Anonymous"}
                      </p>
                      <div className="flex text-yellow-400 text-xs">
                        {"★".repeat(comment.rating)}
                        <span className="text-gray-300 dark:text-white/20">
                          {"★".repeat(5 - comment.rating)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {user && comment.user?._id === user.id && editingId !== comment._id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(comment)}
                        className="text-gray-400 hover:text-primary dark:hover:text-white transition"
                        aria-label="Edit comment"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => deleteComment(comment._id)}
                        className="text-gray-400 hover:text-red-500 transition"
                        aria-label="Delete comment"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {editingId === comment._id ? (
                  <div className="mt-3">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditRating(star)}
                          className={`text-lg ${
                            star <= editRating ? "text-yellow-400" : "text-gray-300 dark:text-white/20"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={2}
                      className="w-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white rounded-lg p-2 text-sm outline-none focus:border-primary mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(comment._id)}
                        className="flex items-center gap-1 text-xs bg-primary text-white px-3 py-1.5 rounded-full"
                      >
                        <FiCheckCircle size={12} /> Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1 text-xs border border-gray-200 dark:border-white/20 text-gray-600 dark:text-white/70 px-3 py-1.5 rounded-full"
                      >
                        <FiXCircle size={12} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-white/70 mt-2 leading-relaxed">
                    {comment.text}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}