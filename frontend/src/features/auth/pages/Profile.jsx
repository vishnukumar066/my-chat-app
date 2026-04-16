import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../auth.slice";
import { Camera, Mail, Phone, User, Loader2 } from "lucide-react";

const Profile = () => {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);

  const [selectedImage, setSelectedImage] = useState(null);

  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    avatar: authUser?.avatar?.url || "",
  });

  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSelectedImage(reader.result);
      setFormData({ ...formData, avatar: file });
    };
  };

  const handleProfileUpdate = () => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("avatar", formData.avatar);

    dispatch(updateProfile(data));
  };

  return (
    <div className="min-h-full w-full bg-gray-50 flex justify-center py-10 px-4 overflow-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 sm:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your personal information
          </p>
        </div>

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
          {/* Avatar */}
          <div className="relative">
            <img
              src={
                selectedImage ||
                formData.avatar ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border shadow"
            />

            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer text-white shadow hover:bg-indigo-700 transition ${
                isUpdatingProfile ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <Camera size={16} />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-gray-800">
              {authUser?.name}
            </h2>
            <p className="text-sm text-gray-500">{authUser?.email}</p>

            <p className="text-xs text-gray-400 mt-2">
              {isUpdatingProfile
                ? "Uploading image..."
                : "Click the camera icon to update photo"}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
              <User size={16} /> Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleProfileUpdate}
          disabled={isUpdatingProfile}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isUpdatingProfile && <Loader2 size={18} className="animate-spin" />}
          {isUpdatingProfile ? "Updating..." : "Update Profile"}
        </button>

        {/* Account Info */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Member since</span>
              <span>{new Date(authUser?.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Status</span>
              <span className="text-green-500 font-medium">Active</span>
            </div>

            <div className="flex justify-between">
              <span>Last updated</span>
              <span>{new Date(authUser?.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
