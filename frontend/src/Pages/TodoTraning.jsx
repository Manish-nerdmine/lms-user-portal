// ToDoTraining.jsx
import React from "react";

const trainings = [
  {
    title: "React Advanced Patterns",
    desc: "Learn advanced React patterns including render props, higher-order components, and compound components.",
    progress: 75,
    author: "Sarah Johnson",
    duration: "4 hours",
    due: "Dec 15, 2024",
  },
  {
    title: "TypeScript Fundamentals",
    desc: "Master TypeScript basics and learn how to write type-safe applications.",
    progress: 30,
    author: "David Wilson",
    duration: "3 hours",
    due: "Dec 16, 2024",
  },
  {
    title: "API Design Best Practices",
    desc: "Learn how to design scalable and maintainable REST APIs.",
    progress: 0,
    author: "Emma Thompson",
    duration: "2.5 hours",
    due: "Dec 20, 2024",
  },
  {
    title: "UX Research Methods",
    desc: "Explore various user research methods and learn how to apply them.",
    progress: 15,
    author: "Alex Parker",
    duration: "3.5 hours",
    due: "Dec 22, 2024",
  },
  {
    title: "Cloud Infrastructure Basics",
    desc: "Introduction to cloud computing concepts and AWS fundamentals.",
    progress: 0,
    author: "Rachel Green",
    duration: "5 hours",
    due: "Dec 25, 2024",
  },
  {
    title: "Project Management Essentials",
    desc: "Learn fundamental project management principles and frameworks.",
    progress: 45,
    author: "Tom Anderson",
    duration: "4 hours",
    due: "Dec 28, 2024",
  },
];

const TodoTraning = () => {
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">To-Do Training</h2>
          <p className="text-sm text-gray-500">
            {trainings.length} trainings to complete
          </p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
          Browse More
        </button>
      </header>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search trainings..."
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <select className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option>All Categories</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Design</option>
          <option>Management</option>
        </select>
      </div>

      {/* Training Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainings.map((t, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium">{t.title}</h4>
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                To Do
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">{t.desc}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${t.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mb-3">Progress: {t.progress}%</p>
            <div className="flex justify-between text-xs text-gray-500 mb-3">
              <span>👤 {t.author}</span>
              <span>⏱ {t.duration}</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">📅 Due {t.due}</p>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Start Training
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TodoTraning;
