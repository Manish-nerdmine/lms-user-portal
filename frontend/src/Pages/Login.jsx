import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const LoginPage = ({ setGroupId , groupId,setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://195.35.21.108:3002/auth/api/v1/employment/login",
        { email, password }
      );

      console.log(" Login Success:", response.data);
      console.log(" Login Success:", response.data.employment);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
      }

      console.log(response.data);
      setGroupId(response.data?.groupId);
      toast.success("Login successful!");
      localStorage.setItem("eId", response.data.employment);
      localStorage.setItem("employment", response.data.employment);
      localStorage.setItem("userId", response.data.userId);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(" Login Error:", err);
      const msg = err.response?.data?.message || "Login failed! Please try again.";
      toast.error(Array.isArray(msg) ? msg.join("\n") : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">PhishFarm</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to access your PhishFarm account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium py-2 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
