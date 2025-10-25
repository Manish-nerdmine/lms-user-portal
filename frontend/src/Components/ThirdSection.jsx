import React from "react";

const ThirdSection = ({ showThird }) => {
  return (
    <section
      id="section2"
      className={`relative bg-white text-black flex flex-col items-center justify-start overflow-y-auto transition-all duration-700 ${
        showThird ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <hr className="w-full h-0.5 bg-gray-400 mt-12 max-w-5xl" />
      <div className="max-w-4xl w-full flex flex-col items-start  p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          What to expect from this Dev Dives session
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg">
          In this session, the UiPath product team demystifies{" "}
          <span className="font-bold text-blue-400 text-lg">coded agents</span>{" "}
          - what they are, why they matter, and how they power agentic
          automation.
        </p>

        <p className="text-gray-700 leading-relaxed text-md mt-8 ">
          At the end of this page, you'll also find the instructions for how to
          put your skills to the test,{" "}
          <span className="text-black font-semibold">
            build a Specialist Coded Agent
          </span>{" "}
          with UiPath SDK & LangChain/LlamaIndex and compete for a share of{" "}
          <span className="text-black font-semibold">$10,000 in prizes</span>
        </p>

        <p className="text-gray-700 leading-relaxed text-md mt-8 ">
          You’ll learn about the{" "}
          <span className="font-semibold text-black">languages</span> and{" "}
          <span className="font-semibold text-black">frameworks</span> currently
          supported by UiPath for development of coded agents, see
          demonstrations of
          <span className="font-semibold text-black">
            autonomous payment
          </span>{" "}
          and{" "}
          <span className="font-semibold text-black">
            travel assistant agents
          </span>{" "}
          , and hear customer success stories showcasing the real-world impact
          of coded agents.
        </p>

        <p className="text-black font-bold text-lg leading-relaxed  mt-8 ">
          Here are the session highlights:
        </p>
      </div>
    </section>
  );
};
export default ThirdSection;