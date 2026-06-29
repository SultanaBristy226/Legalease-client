"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import {
  FiCamera,
  FiUser,
  FiImage,
  FiBriefcase,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";

type LawyerProfile = {
  _id: string;
  name: string;
  photo: string;
  specialization: string;
  bio: string;
  hourlyRate: number;
  status: string;
};

export default function ManageLegalProfilePage() {
  const [profile, setProfile] = useState<LawyerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    specialization: "",
    bio: "",
    hourlyRate: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get("/lawyers/my-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.lawyer);
        setFormData({
          name: res.data.lawyer.name,
          photo: res.data.lawyer.photo,
          specialization: res.data.lawyer.specialization,
          bio: res.data.lawyer.bio,
          hourlyRate: String(res.data.lawyer.hourlyRate),
        });
      } catch (err) {
        // No profile yet — that's fine, user will create one
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const payload = { ...formData, hourlyRate: Number(formData.hourlyRate) };

      if (profile) {
        const res = await axiosInstance.patch(
          `/lawyers/${profile._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data.lawyer);
        setSuccess("Profile updated successfully.");
      } else {
        const res = await axiosInstance.post("/lawyers", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.lawyer);
        setSuccess("Profile created successfully.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-text-muted">Loading...</p>;
  }

  return (
    <div className="max-w-lg">
      <div className="bg-white border border-gray-border rounded-2xl p-7">
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-border">
          <div className="w-16 h-16 rounded-full bg-gray-soft border-2 border-primary flex items-center justify-center overflow-hidden flex-shrink-0">
            {formData.photo ? (
              <div className="relative w-full h-full">
                <Image
                  src={formData.photo}
                  alt="Profile preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <FiCamera className="text-text-muted" size={22} />
            )}
          </div>
          <div>
            <h1 className="font-heading text-lg text-primary">
              Manage Legal Profile
            </h1>
            <p className="text-xs text-text-muted">
              This is how clients see you on Browse Lawyers
            </p>
          </div>
        </div>

        {error && (
          <p className="bg-red-50 text-red-600 text-sm rounded-md px-3 py-2 mb-4">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-50 text-green-700 text-sm rounded-md px-3 py-2 mb-4">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
              <FiUser size={14} /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white text-primary border border-gray-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary placeholder:text-text-muted"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
              <FiImage size={14} /> Photo URL
            </label>
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              required
              placeholder="https://..."
              className="w-full bg-white text-primary border border-gray-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary placeholder:text-text-muted"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
                <FiBriefcase size={14} /> Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                placeholder="e.g. Corporate Law"
                className="w-full bg-white text-primary border border-gray-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary placeholder:text-text-muted"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
                <FiDollarSign size={14} /> Hourly Rate
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                required
                min={1}
                className="w-full bg-white text-primary border border-gray-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary placeholder:text-text-muted"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs text-text-muted mb-1.5">
              <FiFileText size={14} /> Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-white text-primary border border-gray-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary placeholder:text-text-muted resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-white rounded-full py-3 text-sm font-medium hover:bg-primary-light transition disabled:opacity-60"
          >
            {saving ? "Saving..." : profile ? "Save Changes" : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}