import React from "react";
const resources = [
  {
    id: 1,
    title: "UiPath coded agents - Official documentation",
    description: "Learn more about coded agents and their capabilities.",
    link: "#",
  },
  {
    id: 2,
    title: "Build and deploy coded agents",
    description: "Learn more about building and deploying coded agents.",
    link: "#",
  },
  {
    id: 3,
    title: "UiPath SDK",
    description: "Learn more about the UiPath SDK.",
    link: "#",
  },
];

const ResourceItem = ({ resource }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 py-6 border-b border-gray-200 last:border-b-0">
    <div className="mb-4 sm:mb-0 sm:mr-4 flex-grow">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        {resource.title}
      </h3>
      <p className="text-gray-600 text-sm">{resource.description}</p>
    </div>
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#048699] hover:bg-teal-600 text-white font-bold py-2 px-5 rounded-md text-sm transition-colors duration-200 flex-shrink-0"
    >
      GO TO DOCS
    </a>
  </div>
);

export default ResourceItem;
export { resources };