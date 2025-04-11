import React, { useState, useEffect } from 'react';
import ActivityLog from '../components/ActivityLog';
import Favorites from '../components/Favorites';
import UserProfile from '../components/UserProfile';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('log');
  const [loading, setLoading] = useState(false);

  const [logs, setLogs] = useState([
    { id: 'v1', name: 'Intro to React', Positive: 70, Negative: 20, Neutral: 10, starred: true },
    { id: 'v2', name: 'Advanced JavaScript', Positive: 55, Negative: 25, Neutral: 20, starred: false },
    { id: 'v3', name: 'Tailwind Basics', Positive: 60, Negative: 30, Neutral: 10, starred: true },
    { id: 'v4', name: 'Node.js Crash Course', Positive: 50, Negative: 40, Neutral: 10, starred: false },
    { id: 'v5', name: 'CSS Grid & Flexbox', Positive: 80, Negative: 10, Neutral: 10, starred: true },
    { id: 'v6', name: 'Git & GitHub Essentials', Positive: 65, Negative: 20, Neutral: 15, starred: true },
    { id: 'v7', name: 'Redux Simplified', Positive: 45, Negative: 35, Neutral: 20, starred: false },
    { id: 'v8', name: 'REST APIs with Express', Positive: 58, Negative: 32, Neutral: 10, starred: true },
    { id: 'v9', name: 'React Hooks Deep Dive', Positive: 75, Negative: 15, Neutral: 10, starred: true },
    { id: 'v10', name: 'TypeScript Basics', Positive: 68, Negative: 22, Neutral: 10, starred: false },
  ]);

  const user = {
    username: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
  };

  const removeLog = (id) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  const unstarVideo = (id) => {
    setLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, starred: false } : log))
    );
  };

  const starVideo = (id) => {
    setLogs((prev) =>
      prev.map((log) => (log.id === id ? { ...log, starred: true } : log))
    );
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Profile */}
        <UserProfile user={user} />

        {/* Tab Buttons */}
        <div className="flex mt-16 gap-1">
          <button
            onClick={() => switchTab('log')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-md ${
              activeTab === 'log'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white ring-1 ring-indigo-400 shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/5 ring-1 ring-gray-700'
            }`}
          >
            📋 Activity Log
          </button>
          <button
            onClick={() => switchTab('favorites')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-md ${
              activeTab === 'favorites'
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white ring-1 ring-pink-400 shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/5 ring-1 ring-gray-700'
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
            ) : activeTab === 'log' ? (
              <ActivityLog
                logs={logs}
                onRemove={removeLog}
                onStar={starVideo}
                onUnstar={unstarVideo}
              />
            ) : (
              <Favorites logs={logs} onUnstar={unstarVideo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
