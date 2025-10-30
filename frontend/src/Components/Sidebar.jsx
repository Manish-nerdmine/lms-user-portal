import React, { useState } from "react";
import {
  FiHome,
  FiList,
  FiClock,
  FiCheckCircle,
  FiMenu,
  FiAward,
} from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import {
  Settings,
  User,
  Phone,
  Mail,
  Building,
  Briefcase,
  Download,
  Calendar,
  Shield,
  Bell,
  LogOut,
} from "lucide-react";
import { toast } from "react-toastify";
import { MdHelp } from 'react-icons/md';
import TicketModal from "./RealTicket";
import Chat from "./RealChat";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("groupId");
    toast.success("Logout successful!");
    setTimeout(() => navigate("/login"), 1500);
  };

const isActive = (path, isHelp = false) =>
  location.pathname === path || isHelp
    ? "bg-blue-600 text-white font-semibold rounded-md"
    : "text-gray-200 hover:text-white hover:bg-gray-800 rounded-md";

  const helpItems = [
    { label: "Raise a Ticket", action: () => setTicketOpen(true) },
    { label: "Email Us", action: () => alert("Email Us clicked") },
    { label: "Chat Support", action: () =>  setChatOpen(true) },
  ];

  const renderHelpDropdown = () =>
    helpItems.map((item, idx) => (
      <p
        key={idx}
        onClick={() => {
          item.action();
          setHelpOpen(false);
        }}
        className="cursor-pointer px-5 py-2 text-gray-500 hover:bg-gray-700 rounded-md"
      >
        {item.label}
      </p>
    ));

    
    const [ticketOpen, setTicketOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
    <TicketModal isOpen={ticketOpen} onClose={() => setTicketOpen(false)} />
    <Chat isOpen={chatOpen} onClose={() => setChatOpen(false)} />
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
            <FiCheckCircle className="mr-2" /> Completed Training
          </p>

          <p
            onClick={() => navigate("/certificates")}
            className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
              "/certificates"
            )}`}
          >
            <FiAward className="mr-2" /> Certificates
          </p>
          <p
            onClick={() => navigate("/setting")}
            className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
              "/setting"
            )}`}
          >
            <FiSettings className="mr-2" /> Settings
          </p>
          <p
            onClick={() => setHelpOpen(!helpOpen)}
            className="cursor-pointer flex items-center justify-between px-3 py-2 text-gray-200 hover:text-white hover:bg-gray-800 rounded-md"
          >
            <span className="flex items-center">
              <MdHelp className="mr-2" /> Get Help
            </span>
            <span
              className={`transform transition-transform duration-200 ${
                helpOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              ▶
            </span>
          </p>
          {helpOpen && (
            <div className="flex flex-col">{renderHelpDropdown()}</div>
          )}

          <p
            onClick={handleLogout}
            className={`cursor-pointer flex items-center px-3 py-2 hover:bg-gray-800`}
          >
            <LogOut className="mr-2" /> Logout
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
              <FiAward className="mr-2" /> Completed Training
            </p>

            <p
              onClick={() => {
                navigate("/certificates");
                setOpen(false);
              }}
              className={`cursor-pointer flex items-center px-3 py-2 ${isActive(
                "/certificates"
              )}`}
            >
              <FiCheckCircle className="mr-2" />
              Certificates
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
            <p
              onClick={() => setHelpOpen(!helpOpen)}
              className="cursor-pointer flex items-center justify-between px-3 py-2 text-gray-200 hover:text-white hover:bg-gray-800 rounded-md"
            >
              <span className="flex items-center">
                <MdHelp className="mr-2" /> Get Help
              </span>
              <span
                className={`transform transition-transform duration-200 ${
                  helpOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                ▶
              </span>
            </p>
            {helpOpen && (
              <div className="flex flex-col">{renderHelpDropdown()}</div>
            )}

            <p
              onClick={handleLogout}
              className={`cursor-pointer flex items-center px-3 py-2 hover:bg-gray-800`}
            >
              <LogOut className="mr-2" /> Logout
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
