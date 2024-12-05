import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Profile from "./pages/Profile";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreateTodo from "./pages/CreateTodo";
import UpdateTodoPage from "./pages/UpdateTodoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
        <Route path="/update-todo/:id" element={<UpdateTodoPage />} />
        <Route path="/create-todo" element={<CreateTodo />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
