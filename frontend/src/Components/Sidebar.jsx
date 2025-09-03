import React, { useState } from "react";
import { FiHome, FiList, FiClock, FiCheckCircle, FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white font-semibold rounded-md"
      : "text-gray-200 hover:text-white hover:bg-gray-800 rounded-md";

  return (
    <>
      {/* ----------- Desktop Sidebar (only lg and up) ----------- */}
      <div className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex-col z-50">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <h1 className="text-xl font-bold text-blue-400">phish</h1>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <p
            onClick={() => navigate("/")}
            className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
              "/"
            )}`}
          >
            <FiHome className="mr-2" /> Dashboard
          </p>
          <p
            onClick={() => navigate("/todo-training")}
            className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
              "/todo-training"
            )}`}
          >
            <FiList className="mr-2" /> ToDo Training
          </p>
          <p
            onClick={() => navigate("/overdue")}
            className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
              "/overdue"
            )}`}
          >
            <FiClock className="mr-2" /> Overdue Training
          </p>
          <p
            onClick={() => navigate("/complete-training")}
            className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
              "/complete-training"
            )}`}
          >
            <FiCheckCircle className="mr-2" /> Complete Training
          </p>
          <p
            onClick={() => navigate("/setting")}
            className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
              "/setting"
            )}`}
          >
            <FiSettings className="mr-2" /> Settings
          </p>
        </nav>
      </div>

      {/* ----------- Mobile + Tablet Navbar ----------- */}
      <div className="lg:hidden w-full bg-gray-900 text-white fixed top-0 left-0 z-50 shadow-md">
        <div className="flex items-center justify-between h-14 px-4">
          <h1 className="text-lg font-bold text-blue-400">phish</h1>
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {open ? <IoClose /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {open && (
          <div className="bg-gray-800 px-4 py-3 space-y-2">
            <p
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
              className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
                "/"
              )}`}
            >
              <FiHome className="mr-2" /> Dashboard
            </p>
            <p
              onClick={() => {
                navigate("/todo-training");
                setOpen(false);
              }}
              className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
                "/todo-training"
              )}`}
            >
              <FiList className="mr-2" /> ToDo Training
            </p>
            <p
              onClick={() => {
                navigate("/overdue");
                setOpen(false);
              }}
              className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
                "/overdue"
              )}`}
            >
              <FiClock className="mr-2" /> Overdue Training
            </p>
            <p
              onClick={() => {
                navigate("/complete-training");
                setOpen(false);
              }}
              className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
                "/complete-training"
              )}`}
            >
              <FiCheckCircle className="mr-2" /> Complete Training
            </p>
            <p
              onClick={() => {
                navigate("/setting");
                setOpen(false);
              }}
              className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
                "/setting"
              )}`}
            >
              <FiSettings className="mr-2" /> Settings
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
