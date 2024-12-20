import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import UserProfileModal from "../components/UserProfileModal";
import Navbar2 from "../components/Navbar2";
import { useAllTodo, useDetail } from "../hooks";

const Profile = () => {
  const { alltodo, loading } = useAllTodo();
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { detail } = useDetail();

  useEffect(() => {
    setTodos(alltodo);
  }, [alltodo]);

  const handleCreateTodo = () => {
    navigate("/create-todo");
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleLogout = () => {
    setTimeout(() => {
      localStorage.clear("token");
      navigate("/");
    }, 800);
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar2
        onCreateTodo={handleCreateTodo}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div role="status" className="text-center mt-10">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : todos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                onToggle={() => handleToggleTodo(todo._id)}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">
              Create some todos to display
            </p>
          </div>
        )}
      </main>
      {isModalOpen && (
        <UserProfileModal
          user={detail}
          onClose={() => setIsModalOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Profile;
