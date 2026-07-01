"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

type User = {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, role: string) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.patch(
        `/users/${id}/role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      setError("Failed to update role.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  if (loading) {
    return <p className="text-text-muted dark:text-white/50">Loading...</p>;
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-primary dark:text-white mb-6">
        Manage Users
      </h1>

      {error && (
        <p className="bg-red-50 text-red-600 text-sm rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <div className="overflow-x-auto border border-gray-border dark:border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-soft dark:bg-white/5 text-left">
            <tr>
              <th className="px-4 py-3 text-primary dark:text-white">Name</th>
              <th className="px-4 py-3 text-primary dark:text-white">Email</th>
              <th className="px-4 py-3 text-primary dark:text-white">Role</th>
              <th className="px-4 py-3 text-primary dark:text-white">Joined</th>
              <th className="px-4 py-3 text-primary dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-border dark:border-white/10">
                <td className="px-4 py-3 text-primary dark:text-white">{user.fullName}</td>
                <td className="px-4 py-3 text-text-muted dark:text-white/60">{user.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="bg-transparent border border-gray-border dark:border-white/20 rounded-md px-2 py-1 text-sm text-primary dark:text-white"
                  >
                    <option value="user">User</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-text-muted dark:text-white/60">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-full hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}