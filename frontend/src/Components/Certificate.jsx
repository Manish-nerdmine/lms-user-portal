// Certificate.jsx
import React from "react";

const Certificate = ({ course, elementId }) => {
  const formattedDate = new Date(course?.completedDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const userId=localStorage.getItem("userId");

  
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-purple-700 to-pink-600 p-6"
      id={elementId}
    >
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg overflow-hidden relative ">
        {/* Top gradient header */}
        <div className="h-44 bg-gradient-to-r from-purple-800 via-indigo-600 to-pink-500 p-8 flex flex-col justify-center">
          <div className="text-center text-white/90 uppercase tracking-widest text-sm">
            Click Shield
          </div>
          <h1 className="text-5xl font-light text-white text-center">
            CERTIFICATE
          </h1>
          <div className="text-white/80 mt-6 text-md text-center">
            OF TRAINING COMPLETION
          </div>
        </div>

        {/* Main body */}
        <div className="p-10 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-10 h-0.5 bg-gradient-to-r from-pink-500 to-indigo-600 mx-auto mb-6" />

              <p className="uppercase tracking-widest text-gray-400 text-xs">
                This certificate is proudly awarded to
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold mt-6 text-red-600">
                {localStorage.getItem(`fullName_${userId}`)}
              </h2>

              <div className="w-1/3 h-0.5 bg-indigo-200 mx-auto mt-4 mb-6" />

              <p className="text-center text-gray-600 leading-relaxed">
                For successfully completing the comprehensive training program
              </p>
            </div>

            {/* Course box */}
            <div className="mt-8">
              <div className="border-l-4 border-purple-600 bg-gray-50 rounded p-6">
                <h3 className="text-center text-xl md:text-2xl font-medium text-pink-600">
                  {course?.courseDetails?.title}
                </h3>
              </div>
            </div>

            <p className="text-center text-gray-500 mt-8 leading-relaxed">
              In recognition of exceptional dedication, professional growth, and
              mastery of essential competencies in this specialized field
            </p>

            {/* Divider */}
            <div className="mt-10 border-t border-gray-200 pt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">
                  Completion Date
                </div>
                <div className="mt-2 text-sm font-medium text-indigo-700">
                  {course.completedDate}
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-400 uppercase tracking-widest">
                  Authorized By
                </div>
                <div className="mt-2 font-semibold text-indigo-700">
                  Udit Agarwal
                </div>
              </div>
            </div>

            <div className="mt-10 text-center text-xs text-gray-400">
              <div className="uppercase tracking-widest">Certificate ID</div>
              <div className="mt-2 text-sm text-purple-600">
                KD-2025-TC-847392
              </div>
            </div>
          </div>
        </div>

        {/* subtle corner gradient overlay to match image style */}
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-10" />
      </div>
    </div>
  );
};

export default Certificate;
