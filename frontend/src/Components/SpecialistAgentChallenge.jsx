import React from "react";
import { FaRegSmileBeam } from "react-icons/fa";

const SpecialistAgentChallenge = () => {
  return (
    <div className="min-h-screen bg-white p-4 md:p-12 lg:p-20 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Top Text Section */}
        <p className="text-lg mb-4 text-gray-700">
          Put your skills to the test,{" "}
          <span className="font-bold text-black">
            build a Specialist Coded Agent
          </span>{" "}
          with UiPath SDK & LangChain/LlamaIndex and compete for a share of{" "}
          <span className="font-bold  text-black">$10,000 in prizes!</span>
        </p>
        <p className="text-lg mb-12 text-gray-700">
          Plus, showcase your innovation to the entire global UiPath community!
        </p>

        {/* What's the challenge? */}
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          What's the challenge?
        </h2>

        {/* Mission Card Section */}
        <div className="flex flex-col md:flex-row items-start md:space-x-8 mb-16">
          {/* Icon */}
          <div className="flex-shrink-0 mb-6 md:mb-0 mt-2">
            <FaRegSmileBeam className="w-20 h-20 text-blue-500" />
          </div>

          {/* Mission Text Box */}
          <div className="p-4 md:p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg flex-grow">
            <p className="text-gray-800">
              <span className="font-bold">Your mission:</span> design and
              implement a{" "}
              <span className="font-bold">Specialist Coded Agent</span>—an
              autonomous agent that takes on core decision-making within a
              specific domain or use case.
            </p>
          </div>
        </div>

        {/* Agent Should & Key Dates Section */}
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          {/* The agent should */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              The agent should
            </h3>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>Act autonomously within its defined responsibilities.</li>
              <li>Escalate responsibly when out of scope or uncertain.</li>
              <li>
                Deliver outputs that are clear, reusable, and trustworthy.
              </li>
            </ul>
          </div>

          {/* Key dates */}
          <div className="lg:w-1/2">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Key dates</h3>
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>
                <span className="font-bold">October 24</span> – Registration &
                demo submission deadline
              </li>
              <li>
                <span className="font-bold">October 31</span> – Jury evaluation
                period
              </li>
              <li>
                <span className="font-bold">November 5</span> – Winners
                announced
              </li>
            </ul>
          </div>
        </div>

        {/* Spacer for button positioning */}
        <div className="h-20"></div>
      </div>

      {/* Join Challenge Button (Fixed to bottom for a similar feel) */}
      <div className=" bottom-0 left-0 right-0">
        <div className="max-w-xl mx-auto">
          <button className="w-full py-3 px-4 bg-[#048699] text-white font-bold rounded-full shadow-md hover:bg-teal-600 transition duration-300">
            JOIN THE CHALLENGE HERE!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialistAgentChallenge;