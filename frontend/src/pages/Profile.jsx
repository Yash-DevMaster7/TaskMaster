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
    localStorage.clear("token");
    navigate("/");
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
        {todos.length > 0 ? (
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
