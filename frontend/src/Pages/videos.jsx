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

  const completedCount = modules.filter((m) => m.completed).length;
  const progress = (completedCount / modules.length) * 100;

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <header className="px-6 py-4 bg-white shadow flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Introduction to Web Development</h1>
          <p className="text-gray-600 text-sm">{modules.length} modules</p>
        </div>
        <div className="w-48">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {completedCount}/{modules.length} Completed
          </p>
        </div>
      </header>

      {/* Main Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-md p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-3">Course Modules</h2>
          <div className="flex flex-col gap-2">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod)}
                className={`flex justify-between items-center px-3 py-2 rounded-md border transition ${
                  activeModule.id === mod.id
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="text-left">
                  <p className="text-sm font-medium">{mod.title}</p>
                  <p className="text-xs opacity-70">{mod.duration}</p>
                </div>
                {mod.completed && <span className="text-green-500 font-bold">✔</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Video + Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Video Player */}
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow">
            <YouTube
              videoId={activeModule.videoId}
              className="w-full h-full"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: { autoplay: 0 },
              }}
            />
          </div>

          {/* Tabs + Content */}
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <div className="flex border-b mb-4">
              <button className="px-4 py-2 text-sm font-medium border-b-2 border-blue-600">
                Content
              </button>
            </div>
            <h2 className="text-lg font-semibold mb-2">{activeModule.title}</h2>
            <p className="text-gray-600">
              Understand variables, functions, and DOM manipulation with examples.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
