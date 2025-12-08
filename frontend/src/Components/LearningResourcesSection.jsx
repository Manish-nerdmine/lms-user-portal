import React from "react";
import ResourceItem, { resources } from "./ResourceItem";

const LearningResourcesSection = () => {
  return (
    <div className="py-2 px-4  bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 pl-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Want to learn more about{" "}
            <span className="text-orange-600">UiPath</span>{" "}
            <span className="text-[#048699]"> coded agents</span>
            <span className="text-orange-600">?</span>
          </h2>
          <p className="text-gray-600">Here is a list of helpful resources:</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg border border-gray-200 divide-y divide-gray-200">
          {resources.map((resource) => (
            <ResourceItem key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      <hr className="h-0.5 bg-gray-300 w-full max-w-5xl items-center text-center ml-60 mb-6 mt-20" />
    </div>
  );
};
export default LearningResourcesSection;