import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const UiPathExitScreen = () => {
  const navigate = useNavigate();
  
  const { courseId } = useParams(); 
  return (
    <div className=" bg-gray-100/50 flex flex-col items-center justify-center pb-16">

      {/* Close Session Button */}
      <button
        className="bg-[#048699] hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 uppercase tracking-wider text-sm"
        onClick={() => navigate(`/videos/${courseId}`)}
      >
        Close This Session
      </button>
    </div>
  );
};

export default UiPathExitScreen;