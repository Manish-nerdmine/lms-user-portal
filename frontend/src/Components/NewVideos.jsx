import React, { useState } from "react";
import FixedHeader from "./FixedHeader";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import CodedAgentsExamplesSection from "./CodedAgentsExamplesSection";
import CodedAgentsYouTubePage from "./CodedAgentsYouTubePage";
import ProductionJourneySection from "./ProductionJourneySection";
import LearningResourcesSection from "./LearningResourcesSection";
import ChallengeBanner from "./ChallengeBanner";
import SpecialistAgentChallenge from "./SpecialistAgentChallenge";
import UiPathExitScreen from "./UiPathExitScreen";
import RefreshIconDisplay from "./RefreshIconDisplay";

//  Main App Component
export default function NewVideos() {
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  const handleScroll = () => {
    setShowSecond(true);
    setShowThird(true);
    setTimeout(() => {
      document
        .getElementById("section2")
        .scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <div className="w-full relative">
      <FixedHeader />
      <FirstSection handleScroll={handleScroll} />
      <SecondSection showSecond={showSecond} />
      <ThirdSection showThird={showThird} />
      <CodedAgentsExamplesSection />
      <CodedAgentsYouTubePage />
      <ProductionJourneySection />
      <LearningResourcesSection />
      <ChallengeBanner />
      <SpecialistAgentChallenge />
      <UiPathExitScreen />
      <RefreshIconDisplay />
    </div>
  );
}
