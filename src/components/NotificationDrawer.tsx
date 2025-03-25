import React, { useState, useRef } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: {
    title: string;
    message: string;
    image: string | null;
  }) => void;
}

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      // Reset the file input to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
  };

  const handleSend = () => {
    if (title.trim() && message.trim()) {
      onSend({
        title: title.trim(),
        message: message.trim(),
        image: previewImage,
      });
      setTitle("");
      setMessage("");
      setPreviewImage(null);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <motion.div
        className="fixed right-0 w-[317px] h-[447px] bg-white rounded-[3%] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden z-50"
        style={{
          top: "141px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">SEND NOTIFICATION</h2>
          <button
            onClick={onClose}
            className="rounded-[3%] p-1 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(447px-64px-80px)]">
          {/* Banner Image Section - Moved to top */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Banner Image
            </label>
            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-[3%] mb-2"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white"
                  aria-label="Remove image"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-[3%] p-4 cursor-pointer hover:bg-gray-50">
                <label className="cursor-pointer w-full text-center">
                  <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-500">
                    Upload banner image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title"
              className="w-full rounded-[3%]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Notification message"
              className="w-full rounded-[3%]"
              rows={4}
            />
          </div>
        </div>

        <div className="p-4 border-t">
          <Button
            onClick={handleSend}
            className="w-full bg-[#0A1128] text-white py-3 rounded-[3%] font-medium hover:bg-[#0A1128]/90"
            disabled={!title.trim() || !message.trim()}
          >
            Send Notification
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export { NotificationDrawer };
