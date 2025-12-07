import React, { useState } from "react";
import YouTube from "react-youtube";
import AccordionItem from "./AccordionItem";
import { useNavigate } from "react-router-dom";

const CodedAgentsYouTubePage = ({ videoData }) => {
  // -------------------------------
  // FUNCTION: Extract YouTube Video ID
  // -------------------------------
  const extractYouTubeID = (url) => {
    if (!url) return null;

    // Case 1: youtube.com/watch?v=xxxxx
    const watchMatch = url.match(/v=([^&]+)/);
    if (watchMatch) return watchMatch[1];

    // Case 2: youtu.be/xxxxx
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return shortMatch[1];

    // Case 3: your streaming backend URL
    const streamMatch = url.match(/stream\/([^?]+)/);
    if (streamMatch) return streamMatch[1];

    return null;
  };

  // final Video ID
  const VIDEO_ID = extractYouTubeID(
    videoData?.videoUrl || videoData?.streamingUrl
  );

  // YouTube Player Options
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  // ---------------------------
  // PREVIEW VIDEO (BEFORE UPLOAD)
  // ---------------------------
  const [previewUrl, setPreviewUrl] = useState(null);

  const handlePreview = () => {
    const id = extractYouTubeID(videoData?.videoUrl);
    if (id) setPreviewUrl(`https://www.youtube.com/embed/${id}`);
  };

  const navigate = useNavigate();
  const courseId = videoData?.courseId || "defaultCourseId";

  return (
    <div className="min-h-screen bg-gray-100 py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        {/* ----------------------- */}
        {/*       VIDEO PLAYER      */}
        {/* ----------------------- */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 p-4">
          <div className="relative pt-[56.25%]">
            <div className="absolute top-0 left-0 w-full h-full">
              {VIDEO_ID ? (
                <YouTube
                  videoId={VIDEO_ID}
                  opts={opts}
                  className="w-full h-full"
                />
              ) : (
                <p className="text-center text-red-500 mt-10">
                  Invalid video URL
                </p>
              )}
            </div>
          </div>

          {previewUrl && (
            <div className="mt-4">
              <iframe
                src={previewUrl}
                className="w-full h-64 rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          )}
        </div>

        {/* --------------------------- */}
        {/*   ACCORDIONS (Dynamic)     */}
        {/* --------------------------- */}
        <div className="mt-8 bg-white shadow-lg rounded-lg border border-gray-200 p-5">
          <h2 className="text-xl font-bold mb-4">Accordions</h2>
          {videoData?.accordions?.map((acc) => (
            <AccordionItem
              key={acc.id}
              title={acc.sectionTitle.replace(/<[^>]+>/g, "")}
              content={
                <ul className="list-disc list-inside space-y-2 pl-4">
                  {acc.items.map((item) => (
                    <li key={item.id}>
                      <strong>{item.title.replace(/<[^>]+>/g, "")}</strong>{" "}
                    </li>
                  ))}
                </ul>
              }
            />
          ))}
        </div>

        {/* --------------------------- */}
        {/*        FAQs Dynamic         */}
        {/* --------------------------- */}
        <div className="mt-8 bg-white p-5 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">FAQs</h2>

          {videoData?.faqs?.map((faq) => (
            <AccordionItem
              key={faq.id}
              title={faq.question.replace(/<[^>]+>/g, "")}
              content={<p>{faq.answer.replace(/<[^>]+>/g, "")}</p>}
            />
          ))}
        </div>
      </div>

      <div className=" bg-gray-100/50 flex gap-5 items-center justify-center pb-16 mt-10">

        <button className="bg-green-600 hover:bg-green-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 uppercase tracking-wider text-sm">Complete Module</button>

        {/* Close Session Button */}
        <button
          className="bg-red-600 hover:bg-red-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 uppercase tracking-wider text-sm"
          onClick={() => navigate(`/videos/${courseId}`)}
        >
          Close This Module
        </button>
      </div>


    </div>
  );
};

export default CodedAgentsYouTubePage;
