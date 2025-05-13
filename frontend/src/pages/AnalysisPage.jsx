import React, { useState } from "react";
import YoutubeSection from "../components/YoutubeSection";
import TwitterSection from "../components/TwitterSection";
import WhatsappSection from "../components/WhatsappSection";

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState("youtube");

  const renderContent = () => {
    switch (activeTab) {
      case "youtube":
        return <YoutubeSection />;
      case "twitter":
        return <TwitterSection />;
      case "whatsapp":
        return <WhatsappSection />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl px-4 mx-auto"
    >
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6 pt-[80px]">
        <button
          onClick={() => setActiveTab("youtube")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border duration-300 ${
            activeTab === "youtube"
              ? "bg-cyan-500 text-black border-cyan-400 shadow-md"
              : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
          }`}
        >
          YouTube
        </button>
        
        <button
          onClick={() => setActiveTab("whatsapp")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
            activeTab === "whatsapp"
              ? "bg-cyan-500 text-black border-cyan-400 shadow-md"
              : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
          }`}
        >
          WhatsApp
        </button>

        <button
          onClick={() => setActiveTab("twitter")}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
            activeTab === "twitter"
              ? "bg-cyan-500 text-black border-cyan-400 shadow-md"
              : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
          }`}
        >
          Twitter
        </button>
      </div>

      {/* Tab Content */}
      <div className="text-white rounded-xl shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default AnalysisPage;
