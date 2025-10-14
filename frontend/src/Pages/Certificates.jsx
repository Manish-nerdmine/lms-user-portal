// Certificates.jsx

import React, { useState, useRef } from "react";
import { FiAward, FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Certificate from "../Components/Certificate";

const Certificates = ({ overdueCourses }) => {
  const [activeCourse, setActiveCourse] = useState(null);
  const certificateRefs = useRef([]);

  // Single certificate download
  const handleDownload = async (course) => {
    setActiveCourse(course);

    // wait for React to render the temporary certificate
    setTimeout(async () => {
      const input = document.getElementById("active-certificate");
      if (!input) return;

      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${course.courseDetails.title}-Certificate.pdf`);

      setActiveCourse(null);
    }, 200);
  };

  // Download all certificates
  const downloadAllCertificates = async () => {
    for (let i = 0; i < overdueCourses.length; i++) {
      const element = certificateRefs.current[i];
      if (!element) continue;

      // wait a bit to ensure element is rendered
      await new Promise((resolve) => setTimeout(resolve, 200));

      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificate_${overdueCourses[i]?.studentName || i + 1}.pdf`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full bg-white shadow-sm rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">My Certificates</h2>

          <button
            onClick={downloadAllCertificates}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition"
          >
            <FiDownload />
            Download All
          </button>
        </div>

        {/* Certificate List */}
        <div className="space-y-3">
          {overdueCourses?.length === 0 ? (
            <p className="text-gray-500 text-center">No certificates available yet.</p>
          ) : (
            overdueCourses.map((course) => (
              <div
                key={course.courseId}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 border rounded-lg px-4 py-3 transition"
              >
                <div className="flex items-center gap-3">
                  <FiAward className="text-blue-600 text-xl" />
                  <div>
                    <h3 className="text-gray-900 font-medium">{course.courseDetails.title}</h3>
                    <p className="text-gray-500 text-sm">Completed on {course.completedDate}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(course)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition"
                >
                  <FiDownload />
                  Download
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Invisible Certificates for All Download */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        {overdueCourses.map((course, index) => (
          <div key={course.courseId} ref={(el) => (certificateRefs.current[index] = el)}>
            <Certificate course={course} elementId={`cert-${index}`} />
          </div>
        ))}
      </div>

      {/* Temporary active certificate for single download */}
      {activeCourse && (
        <div
          style={{
            position: "fixed",
            top: "50px",
            left: "50px",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <Certificate course={activeCourse} elementId="active-certificate" />
        </div>
      )}
    </div>
  );
};

export default Certificates;
