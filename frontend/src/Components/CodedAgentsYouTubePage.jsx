import React from "react";
import YouTube from "react-youtube";
import AccordionItem from "./AccordionItem";
const CodedAgentsYouTubePage = () => {
  // Note: 'dQw4w9WgXcQ' is a placeholder ID.
const VIDEO_ID = "dQw4w9WgXcQ";

const opts = {
  width: "100%",
  height: "100%",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0, // 0 = Do not autoplay
    controls: 1, // Show player controls
    modestbranding: 1, // Hide YouTube logo on controls
    rel: 0, // Do not show related videos
  },
};
  return (
    <div className="min-h-screen bg-gray-100 py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        {/* --- Video Player Section --- */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200 p-4">
          {/* YouTube Player Container (16:9 Aspect Ratio) */}
          <div className="relative pt-[56.25%]">
            <div className="absolute top-0 left-0 w-full h-full">
              <YouTube
                videoId={VIDEO_ID}
                opts={opts}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="h-10 bg-gray-200 mt-4 rounded-md flex items-center px-3 text-sm text-gray-500">
            <span className="mr-4">45:48</span>
            <div className="flex-grow h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-lg border border-gray-200">
          <AccordionItem
            title="Key takeaways"
            content={
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  Coded agents offer full control over logic and system
                  integrations.
                </li>
                <li>
                  They can be packaged and deployed as native UiPath processes.
                </li>
                <li>
                  The session highlights autonomous payment and travel assistant
                  agents.
                </li>
                <li>
                  Instructions for the $10,000 prize contest are available.
                </li>
              </ul>
            }
          />

          <AccordionItem
            title="Frequently asked questions"
            content={
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  **Q: Which frameworks are supported?** A: LangGraph,
                  LlamaIndex, and others via the UiPath SDK.
                </li>
                <li>
                  **Q: How are coded agents governed?** A: They are fully
                  governed and secured under the UiPath Platform.
                </li>
                <li>
                  **Q: Can I use TypeScript?** A: Yes, the TypeScript SDK is
                  covered for building coded apps.
                </li>
              </ul>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CodedAgentsYouTubePage;