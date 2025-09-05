import React from "react";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import TodoTraning from "./Pages/TodoTraning";
import Overdue from "./Pages/Overdue";
import Complete from "./Pages/Complete";
import { Route, Routes } from "react-router-dom";
import Setting from "./Pages/Setting";
import Sign from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:mt-5 sm:mt-5 lg:mt-0 lg:ml-64">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/todo-training" element={<TodoTraning />} />
          <Route path="/overdue" element={<Overdue />} />
          <Route path="/complete-training" element={<Complete />} />
          <Route path='/setting' element={<Setting />} />
          <Route path="/signup" element={<Sign />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
