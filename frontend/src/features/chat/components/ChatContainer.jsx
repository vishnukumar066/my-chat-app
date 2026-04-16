import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, pushNewMessage } from "../chat.slice";
import { getSocket } from "../../../lib/socket";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { messages, isMessagesLoading, selectedUser } = useSelector(
    (state) => state.chat,
  );
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [selectedUser?._id, dispatch]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (message) => {
      dispatch(pushNewMessage(message));
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [dispatch]);

  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const isSender = message.senderId === authUser._id;

            return (
              <div
                key={message._id}
                ref={index === messages.length - 1 ? messageEndRef : null}
                className={`flex items-end gap-2 ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar (receiver) */}
                {!isSender && (
                  <img
                    src={
                      selectedUser?.avatar?.url ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover shadow-sm"
                  />
                )}

                {/* Message Bubble */}
                <div
                  className={`group relative max-w-[75%] sm:max-w-sm px-4 py-2 rounded-2xl shadow-sm text-sm wrap-break-word transition ${
                    isSender
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border"
                  }`}
                >
                  {/* Media */}
                  {message.media && (
                    <div className="mb-2">
                      {message.media.match(/\.(mp4|webm|mov)$/) ? (
                        <video
                          src={message.media}
                          controls
                          className="rounded-lg max-h-40 w-full"
                        />
                      ) : (
                        <img
                          src={message.media}
                          alt="attachment"
                          className="rounded-lg max-h-40 w-full object-cover"
                        />
                      )}
                    </div>
                  )}

                  {/* Text */}
                  {message.text && (
                    <p className="leading-relaxed">{message.text}</p>
                  )}

                  {/* Time */}
                  <div
                    className={`text-[10px] mt-1 text-right opacity-70 ${
                      isSender ? "text-indigo-100" : "text-gray-400"
                    }`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </div>
                </div>

                {/* Avatar (sender) */}
                {isSender && (
                  <img
                    src={
                      authUser?.avatar?.url ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="me"
                    className="w-8 h-8 rounded-full object-cover shadow-sm"
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <p className="text-lg">💬</p>
            <p>No messages yet</p>
            <span className="text-xs">Start the conversation</span>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
