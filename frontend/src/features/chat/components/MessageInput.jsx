import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendMessage } from "../chat.slice.js";
import { Image, X, Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediatype, setMediaType] = useState("");

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const { selectedUser } = useSelector((state) => state.chat);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);
    const type = file.type;

    if (type.startsWith("image/")) {
      setMediaType("image");
      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (type.startsWith("video/")) {
      setMediaType("video");
      const videoUrl = URL.createObjectURL(file);
      setMediaPreview(videoUrl);
    } else {
      toast.error("Please select image or video only.");
      setMedia(null);
      setMediaPreview(null);
      setMediaType("");
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !media) return;

    const data = new FormData();
    data.append("text", text.trim());
    data.append("media", media);

    dispatch(sendMessage(data));

    setText("");
    setMediaPreview(null);
    setMedia(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full border-t bg-white px-4 py-3">
      {/* Media Preview */}
      {mediaPreview && (
        <div className="mb-3">
          <div className="relative w-fit rounded-xl overflow-hidden shadow-md border">
            {mediatype === "image" ? (
              <img
                src={mediaPreview}
                alt="preview"
                className="max-h-52 object-cover"
              />
            ) : (
              <video src={mediaPreview} controls className="max-h-52" />
            )}

            <button
              onClick={removeMedia}
              type="button"
              className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSendMessage}>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-transparent outline-none px-2 text-sm"
          />

          <input
            type="file"
            accept="image/*, video/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleMediaChange}
          />

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-2 rounded-full transition ${
              mediaPreview
                ? "bg-blue-100 text-blue-600"
                : "hover:bg-gray-200 text-gray-500"
            }`}
          >
            <Image size={18} />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!text.trim() && !media}
            className={`p-2 rounded-full transition flex items-center justify-center ${
              text.trim() || media
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
