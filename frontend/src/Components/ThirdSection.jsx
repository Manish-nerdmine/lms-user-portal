import React from "react";

const ThirdSection = ({ showThird, videoData }) => {
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || "";
  };

  const info = videoData?.infoSections || [];

  return (
    <section
      id="section2"
      className={`relative bg-white text-black flex flex-col items-center justify-start overflow-y-auto transition-all duration-700 ${
        showThird ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-5xl w-full p-6 sm:p-10">
        {/* ------ Only Info Section Dynamic Title & Description ------ */}
        {info.length > 0 && (
          <div className="flex flex-col gap-6">
            {/* Section Title */}
            <h2 className="text-2xl font-bold text-gray-900">
              {stripHtml(info[0]?.sectionName || "What to expect from this Dev  session")}
            </h2>

            {/* Section Description List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {info.map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-gray-300 shadow-md bg-white"
                >
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">
                    {stripHtml(item.title)}
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    {stripHtml(item.content)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThirdSection;
