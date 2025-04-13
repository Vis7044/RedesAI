import React from 'react';
import { Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import DetailsCard from './DetailsCard';

const YouTubeCard = () => {
  
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [videoData, setVideoData] = useState({
      title: "",
      thumbnail: "",
      channel: "",
      views: "",
      likes: "",
      comments: "",
    });
    const API_KEY = import.meta.env.VITE_API_KEY;

    const extractVideoId = async (url) => {
      try {
        const id = url.split("v=")[1]?.split("&")[0];
        setVideoId(id || "Invalid URL");
      } catch (error) {
        console.error("Error extracting video ID:", error);
        setVideoId("Invalid URL");
      }
    };
    const fetchVideoData = async () => {
      extractVideoId(url); // Set videoId from URL
      if (!videoId) {
        setError("Video ID is required.");
        return;
      }
  
      const URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
  
      try {
        const response = await fetch(URL);
        const data = await response.json();
  
        if (data.items.length > 0) {
          const video = data.items[0];
          setVideoData({
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
            channel: video.snippet.channelTitle,
            views: video.statistics.viewCount,
            likes: video.statistics.likeCount,
            comments: video.statistics.commentCount,
          });
        } else {
          console.log("No video found with the given ID.");
          setError("No video found with the given ID.");
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
        setError("Failed to fetch video data.");
      }
    };

    useEffect(() => {
        if (videoId) {
          fetchVideoData();
        }
      }, [videoId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4"
    style={{
      backgroundImage:
        'radial-gradient(circle at center, #091D0E 0%,#0c0c0b 40%,  #0f0f0f 100%)',
    }}
    >
      <motion.div
        className="w-full max-w-4xl flex flex-col md:flex-row rounded-3xl overflow-hidden border-4 border-cyan-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left: Form Card */}
        <div className="w-full md:w-1/2 border-r text-white p-8 flex flex-col justify-center space-y-6">

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Youtube size={36} stroke='red' /> YouTube Analyzer
          </h2>

          {/* Instructions */}
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>Copy the full YouTube video URL</li>
            <li>Paste it in the box below</li>
            <li>Click <strong>Analyze Now</strong> to begin</li>
          </ul>

          {/* Form */}
          <form className="space-y-4 backdrop-blur-md bg-white/10 p-4 rounded-2xl shadow-inner"
            onSubmit={(e) => {
              e.preventDefault();
              fetchVideoData();
            }}
          >
            <div>
              <label className="block text-sm mb-1">Paste the YouTube video URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white py-2 rounded-md mt-2"
            >
              Analyze Now
            </button>
          </form>
        </div>

        {/* Right: Image / Detail Card */}
        <motion.div
          className="w-full md:w-1/2 p-6 flex items-center justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {videoData.title === "" ? (
            <img
            src="/youtubeicon.png"
            alt="YouTube Illustration"
            className="max-w-full h-auto rounded-xl shadow-lg"
            />
          ) : (
            <DetailsCard videoData={videoData} />
          )}
          
        </motion.div>
      </motion.div>
    </div>
  );
};

export default YouTubeCard;
