"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

type Comment = {
  _id: string;
  lawyer: { name: string; specialization: string };
  text: string;
  createdAt: string;
};

export default function UserCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/comments/my-comments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(res.data.comments);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  if (loading) {
    return <p className="text-text-muted dark:text-white/50">Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary dark:text-white mb-6">
        My Comments
      </h1>

      {comments.length === 0 ? (
        <p className="text-text-muted dark:text-white/50">
          You haven&apos;t commented on any lawyer yet.
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="border border-gray-border dark:border-white/10 rounded-xl p-5 bg-white dark:bg-white/5"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-primary dark:text-white">
                  {comment.lawyer?.name}
                </h3>
                <p className="text-xs text-text-muted dark:text-white/40">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-text-muted dark:text-white/60">
                {comment.lawyer?.specialization}
              </p>
              <p className="text-sm text-primary dark:text-white mt-2">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}