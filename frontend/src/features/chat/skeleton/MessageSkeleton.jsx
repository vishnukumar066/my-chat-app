const MessageSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {Array.from({ length: 10 }).map((_, i) => {
        const isSender = i % 2 === 0;

        return (
          <div
            key={i}
            className={`flex items-end gap-2 ${
              isSender ? "justify-end" : "justify-start"
            }`}
          >
            {/* Avatar (receiver) */}
            {!isSender && (
              <div className="w-8 h-8 rounded-full bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 shimmer" />
              </div>
            )}

            {/* Bubble */}
            <div
              className={`relative max-w-xs sm:max-w-sm px-4 py-3 rounded-2xl overflow-hidden ${
                isSender
                  ? "bg-gray-200 rounded-br-none"
                  : "bg-gray-100 rounded-bl-none"
              }`}
            >
              {/* Shimmer Overlay */}
              <div className="absolute inset-0 shimmer" />

              {/* Fake content */}
              <div className="space-y-2 relative">
                <div className="h-3 w-24 bg-gray-300 rounded" />
                <div className="h-3 w-36 bg-gray-300 rounded" />
                <div className="h-3 w-20 bg-gray-300 rounded" />

                {/* Media block (random) */}
                {i % 3 === 0 && (
                  <div className="h-24 w-full bg-gray-300 rounded-lg mt-2" />
                )}

                {/* Time */}
                <div className="h-2 w-10 bg-gray-400 rounded ml-auto mt-1" />
              </div>
            </div>

            {/* Avatar (sender) */}
            {isSender && (
              <div className="w-8 h-8 rounded-full bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 shimmer" />
              </div>
            )}
          </div>
        );
      })}

      {/* Shimmer CSS */}
      <style>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.6) 50%,
            rgba(255,255,255,0) 100%
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default MessageSkeleton;
