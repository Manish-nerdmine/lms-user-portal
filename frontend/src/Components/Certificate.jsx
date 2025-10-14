// Certificate.jsx

import React from "react";
import certificateImage from "../Pages/certificate.png";
import logo from "../Pages/logo.png";

const Certificate = ({ course, elementId }) => {
  const formattedDate = new Date(course?.dueDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      id={elementId} // use id for jsPDF/html2canvas
      className="relative w-[1000px] h-[750px] border shadow-xl rounded-lg overflow-hidden bg-white p-6"
      style={{ width: "1000px", height: "750px" }}
    >
      {/* Background Image */}
      <img src={certificateImage} alt="Certificate" className="w-full h-full object-cover absolute inset-0" />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center text-center px-16 mt-[170px]">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 italic tracking-wide">Certificate of Completion</h1>

        <p className="text-2xl text-gray-700 mb-2">This is to certify that</p>

        <h2 className="text-4xl font-extrabold text-indigo-800 italic mb-4 underline">Rajnish Kumar</h2>

        <p className="text-2xl text-gray-800 leading-relaxed max-w-xl mb-4">
          has successfully completed <span className="font-semibold">2</span> hours of{" "}
          <span className="font-semibold italic">{course?.courseDetails?.title}</span> course on{" "}
          <span className="font-semibold">{formattedDate}</span>.
        </p>

        <div className="absolute bottom-[12rem] flex items-center justify-center w-full">
          <img src={logo} alt="Logo" className="w-auto h-16" />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
