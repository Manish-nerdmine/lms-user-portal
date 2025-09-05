import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail, MdWork } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sign = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  // form states
  const [fullName, setFullName] = useState("John Smith");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
      role,
      groupId: "657e902c4b628d1f0fc8f09",
      departmentId: "657e902c4b628d1f0fc8f09",
      isTermsAccepted: agree,
    };

    try {
      const res = await axios.post(
        "http://195.35.21.108:3002/auth/api/v1/employment/signup",
        newUser
      );
      console.log("API Response:", res.data);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data);

      const msg = error.response?.data?.message;
      if (Array.isArray(msg)) {
        // Backend returns array of errors
        toast.error(msg.map((err) => `${err.field || ""}: ${err.error || err}`).join("\n"));
      } else if (typeof msg === "object") {
        toast.error(JSON.stringify(msg));
      } else {
        toast.error(msg || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f7fb]">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <div className="flex justify-center mb-2">
            <LuBookOpen className="text-white text-3xl" />
          </div>
          <h2 className="text-xl font-semibold text-white">Join LearningHub</h2>
          <p className="text-sm text-gray-200">Complete your account setup</p>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <p className="text-xs font-semibold text-gray-500">EMPLOYEE INFORMATION</p>

          {/* Full Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 space-x-1">
              <FaUserAlt className="text-gray-500" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 space-x-1">
              <MdEmail className="text-gray-500" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.smith@company.com"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 space-x-1">
              <MdWork className="text-gray-500" />
              <span>Role</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <p className="text-xs font-semibold text-gray-500 mt-6">ACCOUNT SECURITY</p>

          {/* Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 space-x-1">
              <FaLock className="text-gray-500" />
              <span>Password</span>
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 space-x-1">
              <FaLock className="text-gray-500" />
              <span>Confirm Password</span>
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400"
              >
                {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start space-x-2 text-sm mt-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1"
            />
            <p className="text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!agree}
            className={`w-full font-medium py-2 rounded-lg mt-2 ${
              agree
                ? "bg-blue-600 text-white hover:bg-blue-700 transition"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Complete Sign Up
          </button>

          {/* Support */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-blue-600 underline cursor-pointer"
            >
              Log in
            </a>
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Need help?{" "}
            <a href="#" className="text-blue-600 underline">
              Contact IT Support
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Sign;
