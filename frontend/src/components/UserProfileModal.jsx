import React from "react";
import { Link } from "react-router-dom";

const UserProfileModal = ({ user, onClose, onLogout }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p>
          <strong>Full Name:</strong>
          <span className="mx-2 font-mono text-slate-800 font-semibold">
            {user.name}
          </span>
        </p>
        <p>
          <strong>Username:</strong>
          <span className="mx-2 font-mono text-slate-800 font-semibold">
            {user.username}
          </span>
        </p>
        <p>
          <strong>Email:</strong>
          <span className="mx-2 font-mono text-slate-800 font-semibold">
            {user.email}
          </span>
        </p>
        <div className="mt-6 space-y-2">
          <Link
            to="/update-profile"
            className="block w-full text-center bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition duration-300"
          >
            Update Profile
          </Link>
          <button
            onClick={onLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
