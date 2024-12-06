import { Link } from "react-router-dom";

const Navbar = () => {
  const handleAuth = () => {
    const token = localStorage.getItem("token");
    if (token === null || token === "" || !token) {
      return false;
    }
    return true;
  };

  return (
    <nav className="bg-teal-100 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link
                to={handleAuth() ? "/profile" : "/"}
                className="flex items-center py-4 px-2"
              >
                <span className="font-semibold text-teal-700 text-lg">
                  TaskMaster
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/signin"}
              className="py-2 px-4 font-medium text-teal-500 border-2 border-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition duration-300"
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="py-2 px-6 font-medium text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
