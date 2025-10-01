import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import TodoTraning from "./Pages/TodoTraning";
import Overdue from "./Pages/Overdue";
import Complete from "./Pages/Complete";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Setting from "./Pages/Setting";
import Sign from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoursePlayer from "./Pages/videos";

const App = () => {
  // auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [groupId, setGoupId] = useState(null);
  const [overdueCourses, setOverdueCourses] = useState([]); 

  const location = useLocation();

  // check login token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const hideSidebarRoutes = ["/login", "/signup"];
  const showSidebar =
    isAuthenticated && !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content */}
      <main
        className={`flex-1 p-6 md:mt-5 sm:mt-5 ${
          showSidebar ? "lg:mt-0 lg:ml-64" : ""
        }`}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Sign />} />
          <Route
            path="/login"
            element={<LoginPage setGroupId={setGoupId} groupId={groupId} />}
          />

          {/* Private Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/todo-training"
                element={<TodoTraning groupId={groupId} overdueCourses={overdueCourses} setOverdueCourses={setOverdueCourses} />}
              />
              <Route path="/overdue" element={<Overdue  overdueCourses={overdueCourses} />} />
              <Route path="/complete-training" element={<Complete />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/videos/:courseId" element={<CoursePlayer />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/signup" replace />} />
          )}
        </Routes>
      </main>

      <ToastContainer position="top-right"  />
    </div>
  );
};

export default App;
