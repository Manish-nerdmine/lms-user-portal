import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { FaSmile, FaCheckCircle, FaBoxOpen, FaCogs } from "react-icons/fa";

const productionSteps = [
  {
    id: 1,
    icon: FaLaptopCode,
    title: "Get started\nStart in IDE",
    description:
      "Learn about the role of UiPath coded agents, how they integrate with frameworks, and the roadmap for secure, governed agentic automation.",
    iconColor: "text-blue-200",
  },
  {
    id: 2,
    icon: FaSmile,
    title: "Tailor it\nCustomize agent behavior",
    description:
      "See a demonstration of a payment agent that processes unstructured requests, validates them, generates secure outputs, and runs as a UiPath process.",
    iconColor: "text-blue-200",
  },
  {
    id: 3,
    icon: FaCheckCircle,
    title: "Gain trust\nTest & evaluate",
    description:
      "This agent uses LlamaIndex and context grounding to answer trip-related queries. Learn how to package, publish, and run it with complete traceability in UiPath.",
    iconColor: "text-blue-200",
  },
  {
    id: 4,
    icon: FaBoxOpen,
    title: "Make it UiPath native\nPack and publish to UiPath",
    description:
      "Discover how to build, publish, and deploy coded apps that connect directly to UiPath services.",
    iconColor: "text-blue-200",
  },
  {
    id: 5,
    icon: FaCogs,
    title: "Run, Integrate, monitor\nOrchestrate in UiPath Platform",
    description:
      "Learn how coded agents can simplify complex case management by classifying tickets with prompts, business rules, and queues.",
    iconColor: "text-blue-200",
  },
];

const StepCard = ({ step }) => {
  const Icon = step.icon;

  return (
    <div className="flex flex-col items-center p-2">
      {/* Card Content Box (Top Blue Section) */}
      <div className="bg- p-6 h-full rounded-lg shadow-xl text-white flex flex-col justify-start w-full transition duration-300 bg-[#048699] text-center">
        <div className="flex flex-col items-center mb-3 ">
          {/* Icon */}
          <Icon className={`text-4xl ${step.iconColor}`} />
          <div className="ml-4">
            <h3 className="font-semibold text-xl leading-snug">
              {step.title.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < step.title.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </h3>
          </div>
        </div>

        {/* Description (Bottom White Section within the card for contrast) */}
        <div className="bg-white text-gray-700 p-2 mt-3 rounded-md flex-grow">
          <p className="text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>

      {/* Number Marker */}
      <div className="mt-1 w-10 h-10 flex items-center justify-center bg-white text-gray-600 font-bold text-xl rounded-full border-2 border-gray-300 shadow-md">
        {step.id}
      </div>
    </div>
  );
};

export default StepCard;
export {productionSteps};