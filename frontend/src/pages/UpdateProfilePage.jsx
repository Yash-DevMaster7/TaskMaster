import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// Mock user data (replace with actual user data in a real application)

const UpdateProfilePage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // const { detail, loading } = useDetail();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const requestBody = {};
    if (name) requestBody.name = name;
    if (username) requestBody.username = username;
    if (email) requestBody.email = email;

    if (Object.keys(requestBody).length > 0) {
      try {
        const response = await axios.put(
          `${backendUrl}/user/update`,
          requestBody,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        navigate("/profile");
        // Handle successful response
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      try {
        // Mock API call
        await axios.put(
          `${backendUrl}/user/update/pswd`,
          {
            password,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setPassword("");
        navigate("/profile");
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors({ password: "Password must be at least 8 characters long" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">
          Update Profile
        </h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              placeholder="Enter Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500`}
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 `}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 `}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
          >
            Update Profile
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-teal-700">
            Change Password
          </h3>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
            >
              Update Password
            </button>
          </form>
          <div className="text-center mt-4">
            <Link
              to={"/profile"}
              className="bg-teal-500 text-white rounded-sm px-3 py-2 font-mono"
            >
              BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfilePage;
