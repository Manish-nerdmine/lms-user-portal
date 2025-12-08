import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { FaSmile, FaCheckCircle, FaBoxOpen, FaCogs } from "react-icons/fa";
import StepCard, { productionSteps } from "./StepCard";

const ProductionJourneySection = ({videoData}) => {
  return (
    <div className="py-12 px-4 bg-gray-50 font-sans">
      <hr className="h-0.5 bg-gray-300 w-full max-w-5xl items-center text-center ml-60 mb-6" />
      {/* --- Header Section --- */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          The journey to production
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You've already seen coded agents in action with the{" "}
          <span className="font-bold text-black">autonomous payment agent</span>{" "}
          example; this reference diagram distills those steps into a clear
          visual flow to help you recall, connect, and apply the process when
          building your own.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {productionSteps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>

      <hr className="h-0.5 bg-gray-300 w-full max-w-5xl items-center text-center ml-60 mb-6 mt-20" />
    </div>
  );
};
export default ProductionJourneySection;
