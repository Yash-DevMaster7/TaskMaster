import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateTodoPage = ({ todo }) => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredData = {};
    if (title) requiredData.title = title;
    if (description) requiredData.description = description;
    if (Object.keys(requiredData).length > 0) {
      try {
        const response = await axios.put(
          `${backendUrl}/todo/${id}`,
          requiredData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        navigate("/profile");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Update Todo in TaskMaster
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="New Title"
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-gray-50 `}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              id="description"
              rows={5}
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your New Description here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300"
          >
            Update Todo
          </button>
        </form>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleBack}
            className="w-2/5 bg-gray-200 text-black py-2 px-4 mt-2 rounded-md hover:bg-gray-300 transition duration-300 font-semibold"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateTodoPage;
