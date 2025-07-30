import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider"; 

export default function AdminProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-xl text-white">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-400">
        My Admin Profile
      </h1>
      <div className="space-y-4 max-w-md mx-auto">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Full Name</p>
          <p className="text-lg">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Email Address</p>
          <p className="text-lg">{user.email}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Role</p>
          <p className="text-lg capitalize">{user.role}</p>
        </div>
      </div>
    </div>
  );
}
