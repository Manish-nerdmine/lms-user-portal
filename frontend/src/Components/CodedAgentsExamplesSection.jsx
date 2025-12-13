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
        
      </div>
    </div>
  );
};

export default CodedAgentsExamplesSection;