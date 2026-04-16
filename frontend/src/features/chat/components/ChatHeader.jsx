import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../chat.slice";
import { X, Phone, Video } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isOnline = onlineUsers.includes(selectedUser?._id);

  return (
    <header className="w-full border-b bg-white px-4 py-3 flex items-center justify-between">
      {/* Left: User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <img
            src={
              selectedUser?.avatar?.url ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Online indicator */}
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>

        {/* Name + Status */}
        <div className="leading-tight">
          <h3 className="text-sm font-semibold text-gray-800 truncate max-w-40">
            {selectedUser?.name}
          </h3>
          <p
            className={`text-xs ${
              isOnline ? "text-green-500" : "text-gray-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Call buttons (optional UI only) */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Phone className="w-4 h-4 text-gray-600" />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Video className="w-4 h-4 text-gray-600" />
        </button>

        {/* Close chat */}
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="p-2 rounded-lg hover:bg-red-50 transition"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
