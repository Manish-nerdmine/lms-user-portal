import React, { useState } from "react";
import YouTube from "react-youtube";

const modules = [
  { id: 1, title: "HTML Basics", duration: "45 min", completed: true, videoId: "pQN-pnXPaVg" },
  { id: 2, title: "CSS Styling", duration: "50 min", completed: true, videoId: "1Rs2ND1ryYc" },
  { id: 3, title: "JavaScript Fundamentals", duration: "60 min", completed: false, videoId: "W6NZfCO5SIk" },
  { id: 4, title: "Course Quiz", duration: "30 min", completed: false, videoId: "dQw4w9WgXcQ" },
];

export default function CoursePlayer() {
  const [activeModule, setActiveModule] = useState(modules[2]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <h1 className="text-2xl font-bold">Introduction to Web Development</h1>
      <p className="text-gray-600">4 modules | Instructor: Sarah Johnson</p>

      <div className="flex mt-6 gap-4">
        {/* Sidebar */}
        <div className="w-1/3">
          <p className="text-sm font-semibold mb-2">Course Modules</p>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded mb-4">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: "66%" }}
            ></div>
          </div>

          <div className="flex flex-col gap-2">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`flex justify-between items-center px-3 py-2 rounded-md border ${
                  activeModule.id === mod.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-medium">{mod.title}</p>
                  <p className="text-xs text-gray-500">{mod.duration}</p>
                </div>
                {mod.completed && <span className="text-green-500">✔</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Main Video + Content */}
        <div className="w-2/3">
          {/* Video Player */}
          <YouTube
            videoId={activeModule.videoId}
            className="w-full rounded-lg overflow-hidden"
            opts={{
              width: "100%",
              height: "300",
              playerVars: { autoplay: 0 },
            }}
          />

          {/* Tabs */}
          <div className="mt-4">
            <div className="flex border-b">
              <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-600">
                Content
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{activeModule.title}</h2>
              <p className="text-gray-600">
                Understand variables, functions, and DOM manipulation.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Mark as Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
