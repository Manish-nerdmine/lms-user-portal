import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { agentExamples, ExampleCard } from "./ExampleCard";
const CodedAgentsExamplesSection = ({videoData}) => {


  console.log("Video Data in Examples Section:", videoData);
  const journeySteps=videoData?.journeySteps || [];
  return (
    <div className="py-12 px-4 bg-white font-sans">
      {/* --- Coded Agents Grid --- */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {journeySteps.map((example,index) => (
            <ExampleCard key={index+1} example={example} />
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-4 pt-8">
        <div className="flex items-start bg-white p-4 border border-blue-300 rounded-lg shadow-inner">
          <FaInfoCircle className="text-blue-500 text-xl mr-3 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-bold">Chapters</span> have been enabled for
            this recording. To jump to a specific topic, simply hover over the
            video timeline and select the chapter you want to view.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodedAgentsExamplesSection;