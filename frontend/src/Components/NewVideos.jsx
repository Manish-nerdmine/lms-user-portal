import React, { useState } from "react";
import FixedHeader from "./FixedHeader";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import CodedAgentsExamplesSection from "./CodedAgentsExamplesSection";
import CodedAgentsYouTubePage from "./CodedAgentsYouTubePage";
import ProductionJourneySection from "./ProductionJourneySection";
import UiPathExitScreen from "./UiPathExitScreen";

export default function NewVideos() {
  const [unlocked, setUnlocked] = useState(false); //  Initially locked

  const handleScroll = () => {
    setUnlocked(true); //  Unlock next sections
    setTimeout(() => {
      const nextSection = document.getElementById("section2");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className="w-full relative overflow-hidden">
      <FixedHeader />
      {/* First Section always visible */}
      <FirstSection handleScroll={handleScroll} />

      {/*  Only show these after arrow click */}
      {unlocked && (
        <>
          <SecondSection showSecond={true} />
          <ThirdSection showThird={true} />
          <CodedAgentsExamplesSection />
          <CodedAgentsYouTubePage />
          <ProductionJourneySection />
          <UiPathExitScreen />
        </>
      )}
    </div>
  );
}
