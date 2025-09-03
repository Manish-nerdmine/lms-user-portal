import React from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Circle,
} from "lucide-react";

const Dashboard = () => {
  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Browse Catalog
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-purple-600">
            <BookOpen className="w-5 h-5" />
            <p className="text-sm text-gray-500">Total Trainings</p>
          </div>
          <h3 className="text-2xl font-bold">24</h3>
          <p className="text-green-600 text-xs">+12% from last month</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm text-gray-500">Completed</p>
          </div>
          <h3 className="text-2xl font-bold text-green-600">18</h3>
          <p className="text-green-600 text-xs">+86% completion rate</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-yellow-500">
            <Clock className="w-5 h-5" />
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          <h3 className="text-2xl font-bold text-yellow-600">4</h3>
          <p className="text-gray-500 text-xs">2 due this week</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm text-gray-500">Overdue</p>
          </div>
          <h3 className="text-2xl font-bold text-red-600">2</h3>
          <p className="text-red-500 text-xs">Requires attention</p>
        </div>
      </div>

      {/* Recent Activity */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>

        {/* Card 1 */}
        <div className="bg-white p-4 rounded-lg shadow mb-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">React Advanced Patterns</h4>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" /> To Do
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Learn advanced React patterns including render props, higher-order
            components...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 my-3">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Start Training
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-lg shadow mb-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Data Security Fundamentals</h4>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Overdue
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Essential security practices for handling sensitive data...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 my-3">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
          <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Start Now
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Team Leadership Skills</h4>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Completed
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Develop essential leadership skills for managing and motivating
            teams...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 my-3">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
          <button className="mt-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
            Review
          </button>
        </div>
      </section>

      {/* Upcoming Deadlines */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Upcoming Deadlines</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-red-500 fill-red-500" />
                <span>Data Security Fundamentals</span>
              </div>
              <span className="text-red-500">Overdue Dec 10, 2024</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span>React Advanced Patterns</span>
              </div>
              <span className="text-gray-500">Due Dec 15, 2024</span>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span>API Design Best Practices</span>
              </div>
              <span className="text-gray-500">Due Dec 20, 2024</span>
            </li>
          </ul>
          <button className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200">
            View All Deadlines
          </button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
