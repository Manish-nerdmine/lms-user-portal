import React from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Setting() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    toast.success("Logout successful!");
    setTimeout(() => navigate("/login"), 1500); 
  };

  return (
    <main className="flex-1 p-6 bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-600" />
            Settings
          </h2>
          <p className="text-gray-500">Manage your account and preferences</p>
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      <div className="space-y-6">
        {/* Profile Information */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Profile Information
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-600 font-bold rounded-full">
              JD
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-sm">
                Change Photo
              </button>
              <button className="px-3 py-1 text-red-600 hover:text-red-700 text-sm">
                Remove Photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              defaultValue="John"
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              defaultValue="Doe"
              className="border rounded-md px-3 py-2 w-full"
            />
            <div className="flex items-center border rounded-md px-3 py-2">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                defaultValue="john.doe@company.com"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Phone className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Phone"
                defaultValue="+1 (555) 123-4567"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Job Title"
                defaultValue="Software Engineer"
                className="w-full outline-none"
              />
            </div>
          </div>

          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Save Changes
          </button>
        </section>

        {/* Learning Preferences */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Learning Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="border rounded-md px-3 py-2">
              <option>Eastern Time (EST)</option>
              <option>Pacific Time (PST)</option>
              <option>Central Time (CST)</option>
            </select>
            <select className="border rounded-md px-3 py-2">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
          <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            Reset to Defaults
          </button>
        </section>
      </div>
    </main>
  );
}
