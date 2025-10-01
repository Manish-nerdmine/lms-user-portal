// Overdue.jsx
import React from "react";

const Overdue = ({ overdueCourses }) => {
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Overdue Training</h2>
          <p className="text-sm text-gray-500">
            {overdueCourses.length} trainings require immediate attention
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Total Overdue</p>
          <h3 className="text-xl font-bold">{overdueCourses.length}</h3>
          <p className="text-xs text-gray-400">
            {overdueCourses.length > 0
              ? `${overdueCourses.length * 2} hours of training`
              : "No overdue trainings"}
          </p>
        </div>
        {overdueCourses.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-400">
            <p className="text-sm text-gray-500">Most Critical</p>
            <h3 className="text-sm font-medium">
              {overdueCourses[0].courseDetails?.title || "N/A"}
            </h3>
            <p className="text-xs text-gray-400">
              Due {new Date(overdueCourses[0].dueDate).toLocaleDateString()}
            </p>
          </div>
        )}
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <p className="text-sm text-gray-500">Average Delay</p>
          <h3 className="text-xl font-bold">
            {overdueCourses.length > 0 ? "5 days" : "0 days"}
          </h3>
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
      </div>

      {/* Overdue Training Cards */}
      {overdueCourses.length === 0 ? (
        <p className="text-center text-gray-500">No overdue trainings 🎉</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {overdueCourses.map((c, index) => {
            const details = c.courseDetails || {};
            return (
              <div
                key={c.courseId || index}
                className="bg-white p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{details.title}</h4>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                    Overdue
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {details.description || "No description"}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `0%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mb-3">Progress: 0%</p>
                <p className="text-xs text-gray-400 mb-3">
                  📅 Due {new Date(c.dueDate).toLocaleDateString()}
                </p>
                <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  Start Now
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Overdue;
