import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const agentExamples = [
  {
    id: 1,
    title: "Coded agents purpose and roadmap",
    description:
      "Learn about the role of UiPath coded agents, how they integrate with frameworks, and the roadmap for secure, governed agentic automation.",
  },
  {
    id: 2,
    title: "Example 1: Autonomous payment agent",
    description:
      "See a demonstration of a payment agent that processes unstructured requests, validates them, generates secure outputs, and runs as a UiPath process.",
  },
  {
    id: 3,
    title: "Example 2: Travel helper agent",
    description:
      "This agent uses LlamaIndex and context grounding to answer trip-related queries. Learn how to package, publish, and run it with complete traceability in UiPath.",
  },
  {
    id: 4,
    title: "Example 3: TypeScript SDK",
    description:
      "Discover how to build, publish, and deploy coded apps that connect directly to UiPath services.",
  },
  {
    id: 5,
    title: "Example 4: Ticket classification",
    description:
      "Learn how coded agents can simplify complex case management by classifying tickets with prompts, business rules, and queues.",
  },
  {
    id: 6,
    title: "Example 5: HR onboarding agent",
    description:
      "See how coded agents can automate HR onboarding, from contracts to equipment allocation, ensuring speed, compliance, and consistency.",
  },
];


    const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || "";
  }; 

const ExampleCard = ({ example }) => (
  
  <div className="flex flex-col items-center p-1">
    {/* Card Content Box */}
    <div className="bg-purple-900 p-6 h-full rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-t-2 border-blue-200">
      <h3 className="font-bold text-lg text-white mb-3">{stripHtml(example.title)}</h3>
      <p className="text-sm text-gray-100 leading-relaxed">
        {stripHtml(example.description)}
      </p>
    </div>
  </div>
);

export { agentExamples, ExampleCard };