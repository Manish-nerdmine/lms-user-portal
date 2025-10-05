import React from "react";
import { FiAward, FiDownload } from "react-icons/fi";

const certificates = [
  {
    title: "Advanced JavaScript Programming",
    date: "9/15/2024",
  },
  {
    title: "React Best Practices",
    date: "8/22/2024",
  },
  {
    title: "Leadership and Management",
    date: "7/10/2024",
  },
  {
    title: "Data Analytics Fundamentals",
    date: "6/5/2024",
  },
  {
    title: "Cybersecurity Essentials",
    date: "5/18/2024",
  },
];

const Certificates = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full min-h-screen bg-white shadow-sm rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">My Certificates</h2>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            <FiDownload className="text-lg" />
            Download All
          </button>
        </div>

        {/* Certificates List */}
        <div className="space-y-3">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 border rounded-lg px-4 py-3 transition"
            >
              <div className="flex items-center gap-3">
                <FiAward className="text-blue-600 text-xl" />
                <div>
                  <h3 className="text-gray-900 font-medium">{cert.title}</h3>
                  <p className="text-gray-500 text-sm">
                    Completed on {cert.date}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition">
                <FiDownload />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
