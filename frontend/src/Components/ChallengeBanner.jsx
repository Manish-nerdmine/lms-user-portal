import React from "react";

const ChallengeBanner = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-4 overflow-hidden relative min-h-[400px] flex items-center">
      {/* Decorative Lines (Background) - Optional, for visual similarity */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="w-[80rem] h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://fakeimg.pl/1200x400/1a202c/666666?text=Background+Pattern+Placeholder')",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center relative z-10 w-full">
        {/* Left Content: Title and Challenge Text */}
        <div className="flex flex-col space-y-4 text-center lg:text-left lg:w-3/5">
          <h1 className="text-3xl font-light opacity-80 mb-2">Community</h1>
          <div className="w-12 h-1 bg-white mx-auto lg:mx-0 mb-4"></div>
          <p className="text-2xl sm:text-4xl font-bold leading-tight">
            Bring your idea to life in the
            <br />
            <span className="text-white">
              Specialist Coded Agent UiPath SDK challenge!
            </span>
          </p>
        </div>

        {/* Right Content: Image and Prize */}
        <div className="relative mt-10 lg:mt-0 lg:ml-16 flex flex-col items-center lg:items-end justify-center lg:w-2/5">
          <div className="w-48 h-48 bg-[#048699] rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
            LMS
          </div>

          <div className="text-center lg:text-center items-center mr-10">
            <p className="text-2xl font-extrabold text-yellow-200">$10,000</p>
            <p className="text-xl font-semibold text-gray-400">in Prizes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeBanner;