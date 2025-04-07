import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; 

const ImageUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { token } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/v1/posts/images/upload", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      onUpload(res.data);
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      console.error("Image upload error:", err);
      alert(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        key={preview ?? 'empty'}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        aria-label="Choose an image to upload"
      />
      {preview && (
        <img
          src={preview}
          alt="Image preview"
          className="w-40 h-auto rounded"
        />
      )}
      {file && (
        <button
          className="bg-indigo-600 text-white px-4 py-1 rounded"
          onClick={handleUpload}
          disabled={uploading}
          aria-label="Upload image"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
