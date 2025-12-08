import React, { useState } from "react";
import YouTube from "react-youtube";
import { FaPlus, FaMinus } from "react-icons/fa";

// Note: 'dQw4w9WgXcQ' is a placeholder ID.
const VIDEO_ID = "dQw4w9WgXcQ";

const opts = {
  width: "100%",
  height: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0, // 0 = Do not autoplay
    controls: 1, // Show player controls
    modestbranding: 1, // Hide YouTube logo on controls
    rel: 0, // Do not show related videos
  },
};

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition duration-150"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg">{title}</span>
        {isOpen ? (
          <FaMinus className="text-gray-600" />
        ) : (
          <FaPlus className="text-gray-600" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 p-4 pt-0" : "max-h-0 opacity-0 p-0"
        }`}
      >
        <div className="text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
          {content}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;