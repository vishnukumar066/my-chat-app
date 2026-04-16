import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarSkeleton from "../skeleton/SidebarSkeleton.jsx";
import { getUsers, setSelectedUser } from "../chat.slice.js";
import { Users } from "lucide-react";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const { users, selectedUser, isUsersLoading } = useSelector(
    (state) => state.chat,
  );

  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full flex flex-col border border-blue-500 rounded-md p-4">
      {/* Header */}
      <div className="p-4 border border-blue-600 bg-[#C9BEFF] rounded-md">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-800">Contacts</h2>
              <p className="text-xs text-gray-400">Manage your chats</p>
            </div>
          </div>

          <span className="text-xs font-medium text-gray-500 bg-gray-300 px-2 py-1 rounded-md">
            {onlineUsers.length - 2} online
          </span>
        </div>

        {/* Divider */}
        <div className="mt-4 border-t border-blue-600 pt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Filters</span>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-9 h-5 rounded-full transition ${
                  showOnlineOnly ? "bg-indigo-600" : "bg-gray-100"
                }`}
              />
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-gray-300 rounded-full shadow transition ${
                  showOnlineOnly ? "translate-x-4" : ""
                }`}
              />
            </div>
            <span className="text-xs font-medium">Online only</span>
          </label>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-500">
            No users found
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;

            return (
              <button
                key={user._id}
                onClick={() => dispatch(setSelectedUser(user))}
                className={`w-full border rounded-md border-blue-600 mt-1.5 flex items-center gap-3 px-4 py-3 hover:bg-blue-200 transition ${
                  isSelected ? "bg-blue-200" : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={
                      user?.avatar?.url ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-left hidden sm:block">
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {user.name}
                  </div>
                  <div
                    className={`text-xs ${
                      isOnline ? "text-green-500" : "text-gray-400"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
