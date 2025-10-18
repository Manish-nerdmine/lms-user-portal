import React, { useState, useEffect } from "react";
import { Settings, User, Mail, Briefcase } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import axios from "axios";

export default function Setting() {
  const navigate = useNavigate();
  const gId = localStorage.getItem("groupId");
  const userId = localStorage.getItem("userId");
  const eId = localStorage.getItem("eId"); // Employment ID for password update

  // Profile States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Password States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const employmentid= localStorage.getItem("employment");

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for userId:", userId);

        // 1. Fetch current user's profile
        const response = await axios.get(
          `http://195.35.21.108:3002/auth/api/v1/employment/${employmentid}`
        );
        const employment = response.data;
        console.log("Employment Profile Response:", employment);

        if (employment) {
          setFullName(employment.fullName || "");
          setEmail(employment.email || "");
          setJobTitle(employment.role || "");
          localStorage.setItem(`fullName_${userId}`, employment.fullName);
        }

        // 2. Fetch all users (to match ID if needed)
        const allUsersRes = await axios.get(
          "http://195.35.21.108:3002/auth/api/v1/users/all?page=1&limit=1000000000000000000"
        );
        const allUsers = allUsersRes.data.users || [];
        const matchedUser = allUsers.find(
          (user) => user.email === employment.email
        );

        if (matchedUser) {
          localStorage.setItem("uId", matchedUser._id);
          console.log("Stored uId:", matchedUser._id);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data!");
      }
    };

    fetchProfile();
  }, []);

  // Save Profile Info
  const handleSaveProfile = async () => {
    const uId = localStorage.getItem("uId");

    if (!fullName || !email || !jobTitle) {
      toast.error("Please fill all profile fields");
      return;
    }

    if (!uId) {
      toast.error("User ID not found!");
      return;
    }

    try {
      const payload = {
        role: jobTitle,
        fullName: fullName,
        email: email,
        groupId: gId,
      };

      const updateRes = await axios.put(
        `http://195.35.21.108:3002/auth/api/v1/employment/${employmentid}`,
        payload
      );

      console.log("Update Response:", updateRes.data);
      toast.success("Profile information updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      const msg = error.response?.data?.message || "Failed to update profile!";
      toast.error(Array.isArray(msg) ? msg.join("\n") : msg);
    }
  };

  const employmentId=localStorage.getItem("employment");
  // ✅ Change Password Function (API integrated)
  const handleChangePassword = async () => {
    console.log("employee",employmentId);
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      console.log("Changing password for eId:", eId);
      const response = await axios.patch(
        `http://195.35.21.108:3002/auth/api/v1/employment/${employmentId}/update-password`,
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        }
      );

      console.log("Password change response:", response.data);
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      const msg =
        error.response?.data?.message || "Failed to change password!";
      toast.error(msg);
    }
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
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border rounded-md px-3 py-2 w-full shadow-sm focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <div className="flex items-center border rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full outline-none"
              />
            </div>
          </div>

          <button
            className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 shadow"
            onClick={handleSaveProfile}
          >
            Save Changes
          </button>

          {/* Password Settings */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg border shadow-inner space-y-4">
            <div>
              <p className="text-md font-semibold text-gray-700 flex items-center gap-2 text-2xl">
                <FaKey className="text-blue-600" /> Password Settings
              </p>
              <p className="text-gray-600 m-0">Update your password</p>
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
