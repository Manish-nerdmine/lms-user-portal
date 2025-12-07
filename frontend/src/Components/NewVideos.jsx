import React, { useEffect, useState } from "react";
import FixedHeader from "./FixedHeader";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import CodedAgentsExamplesSection from "./CodedAgentsExamplesSection";
import CodedAgentsYouTubePage from "./CodedAgentsYouTubePage";
import ProductionJourneySection from "./ProductionJourneySection";
import UiPathExitScreen from "./UiPathExitScreen";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function NewVideos() {
  const [unlocked, setUnlocked] = useState(false); //  Initially locked
  const [videoData, setVideoData] = useState(null); // API data
  const { courseId, videoId } = useParams();

  console.log("Course:", courseId, "Video:", videoId);

  const handleScroll = () => {
    setUnlocked(true); //  Unlock next sections
    setTimeout(() => {
      const nextSection = document.getElementById("section2");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

   useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(
          `http://195.35.21.108:3002/auth/api/v1/courses/${courseId}/videos/${videoId}`
        );

        console.log("API Response:", res.data);

        setVideoData(res.data); // assuming response has { data: {...} }
      } catch (error) {
        console.error("Video API Error:", error);
      }
    };

    fetchVideo();
  }, [courseId, videoId]);

  console.log("Video Data:", videoData);


  return (
    <div className="w-full relative overflow-hidden">
      <FixedHeader />
      {/* First Section always visible */}
      <FirstSection handleScroll={handleScroll} videoData={videoData} />

      {/*  Only show these after arrow click */}
      {unlocked && (
        <>
          <SecondSection showSecond={true} videoData={videoData} />
          <ThirdSection showThird={true} videoData={videoData} />
          <CodedAgentsExamplesSection videoData={videoData} />
          <CodedAgentsYouTubePage videoData={videoData} />
          
        </>
      )}
    </div>
  );
}
