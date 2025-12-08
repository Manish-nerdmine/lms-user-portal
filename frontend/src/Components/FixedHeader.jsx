import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const FixedHeader = () => {
  const navigate = useNavigate();
  const { courseId } = useParams(); 
  return (
    <header className="fixed top-0  w-full bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-md z-50 px-8">
      <button
        className="text-gray-700 hover:text-gray-900 flex items-center space-x-1 cursor-pointer"
        onClick={() => navigate(`/videos/${courseId}`)}
      >
        <span className="text-lg">Close</span>
        <AiOutlineClose className="text-xl hover:text-red-600" />
      </button>

      {/* 2. Center/Right Side: Course structure Dropdown */}
      <div className="text-gray-900 flex items-center space-x-1 cursor-pointer hover:text-blue-600">
        <span className="text-lg font-medium">Course structure</span>
        <IoIosArrowDown className="text-base mt-1" />
      </div>
    </header>
  );
};

export default FixedHeader;