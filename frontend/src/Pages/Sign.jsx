import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail, MdWork } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";

const Sign = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f7fb]">
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
        <form className="p-6 space-y-4">
          {/* Section 1 */}
          <p className="text-xs font-semibold text-gray-500">
            EMPLOYEE INFORMATION
          </p>

          {/* Full Name */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 space-x-1">
              <FaUserAlt className="text-gray-500" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              defaultValue="John Smith"
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
              placeholder="john.smith@company.com"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 space-x-1">
              <MdWork className="text-gray-500" />
              <span>Role</span>
            </label>
            <input
              type="text"
              placeholder="Software Developer"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            />
          </div>

          {/* Section 2 */}
          <p className="text-xs font-semibold text-gray-500 mt-6">
            ACCOUNT SECURITY
          </p>

          {/* Password */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1 space-x-1">
              <FaLock className="text-gray-500" />
              <span>Password</span>
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <input
                type={showPassword ? "text" : "password"}
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
                placeholder="Confirm your password"
                className="w-full outline-none text-sm"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
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
