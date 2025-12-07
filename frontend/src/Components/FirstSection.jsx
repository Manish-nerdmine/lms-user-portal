import React from "react";
import { FaArrowRight, FaTrophy, FaLaptopCode } from "react-icons/fa";

const FirstSection = ({ handleScroll, videoData }) => {
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent;
  };

  console.log("Video Data in FirstSection:", videoData);
  return (
    <section
      className="relative w-full h-screen bg-purple-900 text-white flex flex-col justify-center items-center px-10"
      id="main"
    >
      {/* Shapes */}
      <div className="absolute top-40 left-0 grid grid-cols-3 gap-1 opacity-30">
        <div className="w-24 h-16 bg-[#031b1f]" />
        <div className="w-16 h-24 bg-[#031b1f]" />
        <div className="w-20 h-20 bg-[#031b1f]" />
        <div className="w-20 h-20 bg-[#031b1f]" />
        <div className="w-20 h-20 bg-[#031b1f]" />
      </div>
      <div className="absolute top-40 right-0 grid grid-cols-3 gap-1 opacity-30">
        <div className="w-20 h-20 bg-[#031b1f]" />
        <div className="w-16 h-24 bg-[#031b1f]" />
        <div className="w-20 h-20 bg-[#031b1f]" />
        <div className="w-16 h-24 bg-[#031b1f]" />
        <div className="w-20 h-20 bg-[#031b1f]" />
      </div>

      {/* Hero Title */}
      <h1 className="text-5xl md:text-5xl font-bold leading-snug">
        {videoData ? stripHtml(videoData.title) : "Loading..."}
      </h1>

      <h1 className="text-3xl md:text-3xl font-bold leading-snug">
        {videoData ? stripHtml(videoData.subtitle || " ") : " "}
      </h1>

      {/* Arrow */}
      <button
        onClick={handleScroll}
        className="absolute bottom-10 text-3xl animate-bounce"
      >
        <FaArrowRight className="rotate-90" />
      </button>
    </section>
  );
};

export default FirstSection;
