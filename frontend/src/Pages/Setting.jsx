import React, { useState } from "react";
import { Settings, User, Mail, Briefcase } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";

export default function Setting() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    toast.success("Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
      </header>

      <div className="space-y-6">
        {/* Profile Information */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Profile Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              defaultValue="John"
              className="border rounded-md px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <div className="flex items-center border rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                defaultValue="john.doe@company.com"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Job Title"
                defaultValue="Software Engineer"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Save Changes Button */}
          <button className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 shadow">
            Save Changes
          </button>

          {/* Change Password Form - Always Open */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg border shadow-inner space-y-4">
            <div>
              <p className="text-md font-semibold text-gray-700 flex items-center gap-2 text-2xl">
                <FaKey className="text-blue-600" /> Password Settings
              </p>
              <p className="text-gray-600 m-0">
                Update your password 
              </p>
            </div>

            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border rounded-md px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded-md px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-md px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />

            {/* Button Right Align */}
            <div className="flex justify-end">
              <button
                onClick={handleChangePassword}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 shadow transition"
              >
                Update Password
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
