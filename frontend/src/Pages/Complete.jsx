// CompletedTraining.jsx
import React from "react";

const completedTrainings = [
  {
    title: "Team Leadership Skills",
    desc: "Develop essential leadership skills for effective team management.",
    author: "Amanda Rodriguez",
    duration: "3 hours",
    completed: "Nov 28, 2024",
  },
  {
    title: "JavaScript ES6 Features",
    desc: "Master modern JavaScript features including arrow functions, classes, and modules.",
    author: "Mark Stevens",
    duration: "2.5 hours",
    completed: "Nov 25, 2024",
  },
  {
    title: "Agile Development Practices",
    desc: "Learn agile methodologies and best practices for software development.",
    author: "Lisa Chen",
    duration: "4 hours",
    completed: "Nov 20, 2024",
  },
  {
    title: "Git Version Control",
    desc: "Master Git workflows, branching strategies, and collaboration techniques.",
    author: "John Martinez",
    duration: "3 hours",
    completed: "Nov 15, 2024",
  },
  {
    title: "Web Accessibility Standards",
    desc: "Learn WCAG guidelines and implement accessibility best practices.",
    author: "Sophie Turner",
    duration: "2 hours",
    completed: "Nov 10, 2024",
  },
  {
    title: "Database Design Principles",
    desc: "Understand relational database design and normalization techniques.",
    author: "Robert Kim",
    duration: "4.5 hours",
    completed: "Nov 5, 2024",
  },
  {
    title: "Customer Communication Skills",
    desc: "Improve your ability to communicate effectively with clients and colleagues.",
    author: "Jennifer White",
    duration: "2.5 hours",
    completed: "Oct 30, 2024",
  },
  {
    title: "CSS Grid and Flexbox",
    desc: "Master modern CSS layout techniques for responsive design.",
    author: "Alex Morgan",
    duration: "3.5 hours",
    completed: "Oct 25, 2024",
  },
];

const Complete = () => {
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Completed Training</h2>
          <p className="text-sm text-gray-500">
            {completedTrainings.length} trainings completed
          </p>
        </div>
        <button className="bg-green-100 text-green-600 px-4 py-2 rounded-md border border-green-300 hover:bg-green-200">
          Export Certificates
        </button>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search completed trainings..."
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>All Categories</option>
          <option>Leadership</option>
          <option>Development</option>
          <option>Design</option>
          <option>Compliance</option>
        </select>
      </div>

      {/* Training Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {completedTrainings.map((t, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium">{t.title}</h4>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                Completed
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{t.desc}</p>
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>👤 {t.author}</span>
              <span>⏱ {t.duration}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              📅 Completed on {t.completed}
            </p>
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
              Review
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Complete;
