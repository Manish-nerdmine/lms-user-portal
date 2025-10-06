import React from "react";
import certificateImage from "../Pages/certificate.png";
import logo from "../Pages/logo.png";

export default function Certificate() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="relative w-[1000px] h-[750px] border shadow-xl rounded-lg overflow-hidden bg-white">
        
        {/* Certificate Background Image */}
        <img
          src={certificateImage}
          alt="Certificate"
          className="w-full h-full object-cover"
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center text-center px-16 mt-[170px]">
          {/* Heading */}
          <h1 className="text-5xl font-bold text-gray-800 mb-12 italic tracking-wide">
            Certificate of Completion
          </h1>

          {/* Subtext */}
          <p className="text-2xl text-gray-700 mb-2">This is to certify that</p>

          {/* Name */}
          <h2 className="text-4xl font-extrabold text-indigo-800 italic mb-6 underline">
            {localStorage.getItem("fullName")}
          </h2>

          {/* Course Details */}
          <p className="text-2xl text-gray-800 leading-relaxed max-w-3xl mb-6">
            has successfully completed{" "}
            <span className="font-semibold">2.5 total hours</span> of{" "}
            <span className="font-semibold italic">Web Development</span> online
            course on <span className="font-semibold">October 03, 2025</span>
          </p>

          {/* Circle ke andar text */}
          <div className="absolute bottom-[12rem] flex items-center justify-center w-full">
            <img src={logo} alt="Logo" className="w-auto h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
