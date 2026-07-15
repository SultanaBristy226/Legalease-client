"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axios";

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosInstance.post(
        "https://api.imgbb.com/1/upload?key=" + process.env.NEXT_PUBLIC_IMGBB_API_KEY,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onUpload(res.data.data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}