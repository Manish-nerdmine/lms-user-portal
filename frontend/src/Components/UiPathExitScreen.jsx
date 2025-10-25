import React from "react";
import { FiExternalLink } from "react-icons/fi";

const UiPathExitScreen = () => {
  return (
    <div className=" bg-gray-100/50 flex flex-col items-center justify-center pb-16">
      {/* Container for the Card and Mascot */}
      <div className="relative w-full max-w-xl mx-auto flex justify-center items-start mt-16">
        <div className="absolute -left-16 top-60 transform -translate-y-1/2">
          <div className="w-28 h-28">
            <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold p-1">
              🤖
            </div>
          </div>
        </div>

        {/* The main white card with the message */}
        <div className="bg-white p-6 md:p-10 shadow-lg rounded-lg w-full mt-10 md:mt-0">
          <p className="text-xl font-semibold mb-2 mx-8 ">Before we end...</p>
          <p className="text-gray-700 leading-relaxed mx-8 text-lg mb-8">
            Liked what you saw? Fill in the {/* The 'survey' link styling */}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium underline inline-flex items-center"
              onClick={(e) => e.preventDefault()} // Prevent navigation in this demo
            >
              survey
              <FiExternalLink className="ml-1 h-4 w-4" />
            </a>{" "}
            and tell us what more you would like to see on the
            <span className="font-semibold"> UiPath Academy</span>.
          </p>
        </div>
      </div>

      {/* Horizontal Divider Line */}
      <div className="mt-16 mb-5">
        <hr className="w-20 border-t-2 border-blue-500" />
      </div>

      {/* Footer Text */}
      <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 tracking-wide">
        Happy agentic automation!
      </p>

      {/* Close Session Button */}
      <button
        className="bg-[#048699] hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 uppercase tracking-wider text-sm"
        onClick={() => console.log("Session Closed")}
      >
        Close This Session
      </button>
    </div>
  );
};

export default UiPathExitScreen;