import { MessageCircle, Users, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-inherit">
      <div className="text-center max-w-md px-6">
        {/* Icon */}
        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-indigo-100 shadow-sm">
          <MessageCircle className="w-10 h-10 text-indigo-600" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800">
          No chat selected
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Choose a conversation from the sidebar or start a new one to begin
          chatting.
        </p>

        {/* Suggestions */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 justify-center text-gray-600 text-sm">
            <Users className="w-4 h-4 text-indigo-500" />
            <span>Select a user to start chatting</span>
          </div>

          <div className="flex items-center gap-3 justify-center text-gray-600 text-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Or create a new conversation</span>
          </div>
        </div>

        {/* Optional CTA */}
        <button className="mt-8 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm">
          Start New Chat
        </button>
      </div>
    </div>
  );
};

export default NoChatSelected;
