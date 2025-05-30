import React, { useContext } from "react";
import { Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DetailsCard from "./DetailsCard";
import axios from "axios";
import TextLoader from "./TextLoader";
import HashLoader from "react-spinners/HashLoader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { UserContext } from "../context/UserContextProvider";

const YoutubeSection = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const {user} = useContext(UserContext); 

 
  const [url, setUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState({
    title: "",
    thumbnail: "",
    channel: "",
    views: "",
    likes: "",
    comments: "",
  });
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchVideoData = async () => {
    setLoading(true)
    if (!url) {
      setError("Youtube URL is required.");
      setLoading(false)
      return;
    }
    console.log("this url", url);
    const id = url.split("v=")[1]?.split("&")[0];
    if (!id) {
      console.log("inside");
      setError("Video ID is required.");
      setLoading(false);
      return;
    }

    const URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);

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
        handleFetchComments(video.snippet.title);
        setError(null);
      } else {
        setLoading(false)
        console.log("No video found with the given ID.");
        setError("No video found with the given ID.");
      }
    } catch (error) {
      setLoading(false)
      console.error("Error fetching video details:", error);
      setError("Failed to fetch video data.");
    }
  };

  const handleFetchComments = async (videoName) => {
    if (!url) {
      setError("URL is required.");
      return;
    }


    try {
      const response = await axios.post(`${apiUrl}/comments`, {
        url,
      });

      if (response.data.comments) {
        setComments(response.data.comments);

        const sentimentResponse = await axios.post(`${apiUrl}/analyze`);
        setSentiment(sentimentResponse.data.sentiment_totals);

        //adding or updating video sentiment details to databasex
        localStorage.setItem(
          "sentiment",
          JSON.stringify(sentimentResponse.data.sentiment_totals)
        );
        console.log(videoData);
        if(user) {
          const checkRes = await axiosInstance.post("/video/addResult", {
            videoId: url,
            videoName,
            resultStatus: sentimentResponse.data.sentiment_totals,
          });
        }

        localStorage.setItem(
          "translatedCommentsWithSentiment",
          JSON.stringify(sentimentResponse.data.results)
        );
        
        localStorage.setItem(
          "comments",
          JSON.stringify(response.data.comments)
        );
        toast.success("Comments fetched successfully!");
        setPrevUrl(url);
      } else {
        toast.error("No comments found for this video.");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      if (err.response) {
        toast.error("Failed to fetch comments from server.");
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (videoId) {
  //     fetchVideoData();
  //   }
  // }, [videoId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const youtubeUrl = params.get("youtubeUrl");
    if (youtubeUrl) {
      setUrl(decodeURIComponent(youtubeUrl));
    }
  }, [location]);

  console.log(url);
  console.log(prevUrl);

  return (
    <div className="min-h-screen mt-4 p-4">
      <motion.div
        className="w-full mx-auto max-w-4xl flex flex-col md:flex-row rounded-3xl overflow-hidden border-4 border-cyan-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left: Form Card */}
        <div className="w-full md:w-1/2 border-r text-white p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Youtube size={36} stroke="red" /> YouTube Analyzer
          </h2>

          {/* Instructions */}
          <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
            <li>Copy the full YouTube video URL</li>
            <li>Paste it in the box below</li>
            <li>
              Click <strong>Analyze Now</strong> to begin
            </li>
          </ul>

          {/* Form */}
          <div className="space-y-4 backdrop-blur-md bg-white/10 p-4 rounded-2xl shadow-inner flex flex-col">
            <div className="items-start">
              <label className="block text-sm mb-1">
                Paste the YouTube video URL
              </label>
              {error && (
                <p className="text-red-500 text-sm mb-2"> {error} </p>
              )}
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="flex justify-center">
              {!loading && (
                <button
                  type="submit"
                  onClick={fetchVideoData}
                  disabled={url === prevUrl}
                  className={`px-2 py-2 rounded-xl text-white transition-all duration-300 ${
                    url === prevUrl ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-red-600'
                  }`}
                >
                  Analyze Now
                </button>
              )}
              {loading && !error && (
                <HashLoader size={30} color="#fff" loading={loading} />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            {!loading && sentiment && (
              <Link
                to="/results"
                className="mt-4 block text-center text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-yellow-300 to-green-500 animate-pulse"
              >
                See Results →
              </Link>
            )}           

            {!error && (
              <TextLoader loading={loading} />
            )}
            
          </div>
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

export default YoutubeSection;
