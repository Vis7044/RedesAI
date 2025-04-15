import React, { useState, useEffect } from "react";
import ActivityLog from "../components/ActivityLog";
import Favorites from "../components/Favorites";
import UserProfile from "../components/UserProfile";
import { Loader2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("log");
  const [loading, setLoading] = useState(false);

  const [logs, setLogs] = useState([]);

  const removeLog = async (id) => {
    try {
      console.log(id);
      const res = await axiosInstance.delete("/video/deleteResult", {
        data: { vidId: id },
      });
      if (res.data.success) {
        getLogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const unstarVideo = (id) => {
  //   setLogs((prev) =>
  //     prev.map((log) => (log.id === id ? { ...log, starred: false } : log))
  //   );
  // };

  const starVideo = async (id) => {
    try {
      const res = await axiosInstance.put("/video/addfav", { vidId: id });
      if (res.data.success) {
        getLogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const switchTab = (tab) => {
    if (tab !== activeTab) {
      setLoading(true);
      setTimeout(() => {
        setActiveTab(tab);
        setLoading(false);
      }, 200); // simulate load delay
    }
  };

  //Get all videos related to user
  const getLogs = async () => {
    try {
      const res = await axiosInstance.get("/auth/getAllResults");
      if (res.data.success) {
        setLogs(res.data.data);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLogs();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Profile */}
        <UserProfile />

        {/* Tab Buttons */}
        <div className="flex mt-16 gap-1">
          <button
            onClick={() => switchTab("log")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-md ${
              activeTab === "log"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white ring-1 ring-indigo-400 shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/5 ring-1 ring-gray-700"
            }`}
          >
            📋 Activity Log
          </button>
          <button
            onClick={() => switchTab("favorites")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-md ${
              activeTab === "favorites"
                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white ring-1 ring-pink-400 shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/5 ring-1 ring-gray-700"
            }`}
          >
            ⭐ Favorites
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          <div className="rounded-2xl p-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 ring-1 ring-gray-700 shadow-xl min-h-[200px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              </div>
            ) : activeTab === "log" ? (
              <ActivityLog
                logs={logs}
                onRemove={removeLog}
                onStar={starVideo}
              />
            ) : (
              <Favorites logs={logs} onStar={starVideo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
