import React from "react";

const Complete = ({ completedTrainings }) => {
  console.log(completedTrainings);
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Completed Training
          </h2>
          <p className="text-sm text-gray-500">
            {completedTrainings.length} trainings completed
          </p>
        </div>
      </header>

      {/* Search & Filter */}
      <div
        className="flex flex-col md:flex-row md:items-center 
md:justify-between mb-6 gap-3"
      >
        <input
          type="text"
          placeholder="Search completed trainings..."
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 
rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Training Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
gap-4"
      >
        {completedTrainings.map((t, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            {t.courseDetails.thumbnail &&
            t.courseDetails.thumbnail !== "null" ? (
              <img
                src={t.courseDetails.thumbnail}
                alt={t.courseDetails.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
            ) : (
              <div
                className="w-full h-40 bg-gray-200 flex items-center 
justify-center rounded mb-3 text-gray-400 text-sm"
              >
                No Image Available
              </div>
            )}
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium">{t.courseDetails.title}</h4>
              <span
                className="text-xs bg-green-100 text-green-600 px-2 
py-1 rounded"
              >
                Completed
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              {t.courseDetails.description}
            </p>
            <div
              className="flex justify-between text-xs text-gray-500 
mb-2"
            ></div>
            <p className="text-xs text-gray-400 mb-3">
              Completed on {t.completedDate}
            </p>
            <button
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 
rounded-md hover:bg-gray-200"
            >
              Review
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Complete;
