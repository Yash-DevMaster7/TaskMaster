import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = ({ onCreateTodo, onOpenModal }) => {
  const handleAuth = () => {
    const token = localStorage.getItem("token");
    if (token === null || token === "" || !token) {
      // console.log(false);
      return false;
    }
    // console.log(true);
    return true;
  };
  return (
    <nav className="bg-teal-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to={handleAuth() ? "/profile" : "/"}
            className="text-xl font-semibold"
          >
            TaskMaster
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={onCreateTodo}
              className="bg-white text-teal-600 px-4 py-2 rounded-md hover:bg-teal-100 transition duration-300"
            >
              Create Todo
            </button>
            <button
              onClick={onOpenModal}
              className="text-white hover:text-teal-200 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
