// OverdueTraining.jsx
import React from "react";

const overdueTrainings = [
  {
    title: "Data Security Fundamentals",
    desc: "Essential security practices for handling sensitive data...",
    progress: 0,
    author: "Michael Chen",
    duration: "2 hours",
    due: "Dec 10, 2024",
  },
  {
    title: "GDPR Compliance Training",
    desc: "Understanding GDPR requirements and data protection laws...",
    progress: 25,
    author: "Sarah Wilson",
    duration: "1.5 hours",
    due: "Dec 6, 2024",
  },
  {
    title: "Workplace Safety Standards",
    desc: "Essential workplace safety protocols and emergency guidelines...",
    progress: 0,
    author: "Robert Davis",
    duration: "1 hour",
    due: "Dec 5, 2024",
  },
  {
    title: "Code Review Best Practices",
    desc: "Learn effective code review techniques to improve code quality...",
    progress: 60,
    author: "Emily Rodriguez",
    duration: "2.5 hours",
    due: "Dec 7, 2024",
  },
];

const Overdue = () => {
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Overdue Training</h2>
          <p className="text-sm text-gray-500">
            {overdueTrainings.length} trainings require immediate attention
          </p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
          Contact Support
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Total Overdue</p>
          <h3 className="text-xl font-bold">4</h3>
          <p className="text-xs text-gray-400">7 hours of training</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-400">
          <p className="text-sm text-gray-500">Most Critical</p>
          <h3 className="text-sm font-medium">
            Workplace Safety Standards
          </h3>
          <p className="text-xs text-gray-400">Due Dec 5, 2024</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Average Delay</p>
          <h3 className="text-xl font-bold">5 days</h3>
          <p className="text-xs text-gray-400">Since due date</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search overdue trainings..."
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <select className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
          <option>All Categories</option>
          <option>Security</option>
          <option>Compliance</option>
          <option>Safety</option>
          <option>Development</option>
        </select>
      </div>

      {/* Overdue Training Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {overdueTrainings.map((t, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium">{t.title}</h4>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                Overdue
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
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Start Now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Overdue;
