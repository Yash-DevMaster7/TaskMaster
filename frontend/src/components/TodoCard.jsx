import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateTodoPage from "../pages/UpdateTodoPage";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const TodoCard = ({ todo, onToggle, onDelete }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/todo/${todo._id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      // onDelete function passed as a prop to update the state in the parent component
      onDelete(todo._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3
        className={`text-xl font-semibold mb-2 ${
          todo.isCompleted ? "line-through" : ""
        }`}
      >
        {todo.title}
      </h3>
      <p
        className={`text-gray-600 mb-4 ${
          todo.isCompleted ? "line-through" : ""
        }`}
      >
        {todo.description}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Created on: {formatDate(todo.createdAt)}
      </p>
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-md ${
          todo.isCompleted
            ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
            : "bg-teal-500 text-white hover:bg-teal-600"
        } transition duration-300`}
      >
        {todo.isCompleted ? "Undo" : "Done"}
      </button>
      <button
        onClick={
          todo.isCompleted
            ? null
            : () => {
                navigate(`/update-todo/${todo._id}`);
              }
        }
        className={`px-4 py-2 rounded-md mx-3 ${
          todo.isCompleted
            ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
            : "bg-teal-500 text-white hover:bg-teal-600"
        } transition duration-400`}
      >
        Update
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 rounded-md bg-red-400 mx-1 hover:bg-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoCard;
