import React from "react";
import Card from "./Card";

const SecondSection = ({ showSecond }) => {
  return (
    <section
      id="section2"
      className={`relative bg-[#DDF1F4] text-black flex flex-col items-center justify-start overflow-y-auto transition-all duration-700 ${
        showSecond ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="relative w-full h-[20rem] bg-purple-900 text-white flex flex-col justify-center items-center px-10">
        <div className="absolute top-20 left-0 grid grid-cols-3 gap-1 opacity-30">
          <div className="w-24 h-16 bg-[#031b1f]" />
          <div className="w-16 h-24 bg-[#031b1f]" />
          <div className="w-20 h-20 bg-[#031b1f]" />
          <div className="w-20 h-20 bg-[#031b1f]" />
          <div className="w-20 h-20 bg-[#031b1f]" />
        </div>
        <div className="absolute top-20 right-0 grid grid-cols-3 gap-1 opacity-30">
          <div className="w-20 h-20 bg-[#031b1f]" />
          <div className="w-16 h-24 bg-[#031b1f]" />
          <div className="w-20 h-20 bg-[#031b1f]" />
          <div className="w-16 h-24 bg-[#031b1f]" />
          <div className="w-20 h-20 bg-[#031b1f]" />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-10 p-6 sm:p-10 w-full h-auto">
        <Card title="What are coded agents?" borderColor="border-blue-500">
          <p className="mb-4">
            <span className="font-bold text-blue-600">UiPath coded agents</span>{" "}
            can be built directly in your preferred IDE using frameworks like{" "}
            <span className="font-semibold">LangGraph, LlamaIndex</span>, and
            are integrated via the{" "}
            <span className="font-semibold text-red-600">UiPath SDK</span> to
            access platform services (assets, storage buckets, content
            grounding, LLM gateway), thereby giving you full control over their
            logic, behavior, and system integrations.
          </p>
          <p>
            With the{" "}
            <span className="font-semibold text-orange-600">CLI SDK</span>, you
            can package and publish them as{" "}
            <span className="font-semibold text-red-600">
              native UiPath packages
            </span>
            , which can then be deployed as a process — fully governed and
            secured under the UiPath Platform.
          </p>
        </Card>
      </div>
    </section>
  );
};
export default SecondSection;
