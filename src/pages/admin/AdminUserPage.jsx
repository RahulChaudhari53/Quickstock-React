// src/pages/AdminUserPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useUserById } from "../../hooks/admin/useAdminUser";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, Tag } from "lucide-react";

export default function AdminUserPage() {
  const { id: userId } = useParams();
  const { data: userData, isLoading, isError, error } = useUserById(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-indigo-300 text-xl">
        Loading user details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-400 text-xl">
        Error: {error?.message || "Failed to load user details."}
      </div>
    );
  }

  const user = userData?.data;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-white text-xl">
        <p>User not found.</p>
        <Link
          to="/admin/users"
          className="mt-4 text-emerald-400 hover:text-emerald-300 transition"
        >
          ← Back to User Management
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-6 bg-gray-900 rounded-xl shadow-lg text-white font-inter">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-400 tracking-wide">
        👤 User Details
      </h1>

      <div className="space-y-5">
        {/* Name */}
        <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-md shadow-sm">
          <User className="h-5 w-5 text-emerald-400" />
          <p className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-md shadow-sm">
          <Mail className="h-5 w-5 text-emerald-400" />
          <p className="text-lg">{user.email}</p>
        </div>

        {/* Phone Numbers */}
        <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-md shadow-sm">
          <Phone className="h-5 w-5 text-emerald-400" />
          <p className="text-lg">
            {" "}
            {[user.primaryPhone, user.secondaryPhone]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>

        {/* Role */}
        <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-md shadow-sm">
          <Tag className="h-5 w-5 text-emerald-400" />
          <p className="text-lg capitalize">{user.role.replace("_", " ")}</p>
        </div>

        {/* Profile Image */}
        {user.profileUrl && (
          <div className="p-4 bg-gray-800 rounded-md shadow-sm">
            <p className="text-sm text-gray-400 mb-2">Profile Image</p>
            <img
              src={user.profileUrl}
              alt={`${user.firstName}'s Profile`}
              className="w-24 h-24 rounded-full object-cover border-2 border-emerald-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://stock.adobe.com/images/gray-avatar-icon-contact-icon-person-icon-support-icon/549983970";
              }}
            />
          </div>
        )}

        {/* Join Date */}
        <div className="flex justify-between p-4 bg-gray-800 rounded-md text-sm text-gray-400 shadow-sm">
          <p>Joined on:</p>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link to="/admin/users">
          <Button
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 px-6 py-2 rounded-md transition"
          >
            ← Back to User List
          </Button>
        </Link>
      </div>
    </div>
  );
}
