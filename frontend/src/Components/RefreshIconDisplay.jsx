import React from "react";
import { FiRotateCw } from "react-icons/fi";

const RefreshIconDisplay = () => {
  return (
    <div className="w-full h-20 bg-[#048699] flex items-center justify-center">
      <a href="#main">
        <FiRotateCw className="text-black text-3xl cursor-pointer" />
      </a>
    </div>
  );
};

export default RefreshIconDisplay;