import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import Analyzer from "./assets/analyzer.json";
import Bot from "./assets/bot.json";
import DetailsCard from "./components/DetailsCard";


import { toast } from "react-toastify";

function YouTubeCommentAnalyzer() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [url, setUrl] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [color, setColor] = useState("#000000");
  const [videoId, setVideoId] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null); // Store previous URL to avoid re-fetching
  const [videoData, setVideoData] = useState({
    title: "",
    thumbnail: "",
    channel: "",
    views: "",
    likes: "",
    comments: "",
  });
  const [size, setSize] = useState({ width: 550, height: 400 });

  //Function for changing size of bot
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setSize({ width: 300, height: 400 });
    } else if (window.innerWidth < 768) {
      setSize({ width: 500, height: 500 });
    } else if (window.innerWidth < 1024) {
      setSize({ width: 400, height: 450 });
    } else {
      setSize({ width: 500, height: 500 });
    }
  };



  const API_KEY = import.meta.env.VITE_API_KEY;

  // Function to extract video ID from the URL
  const extractVideoId = async (url) => {
    try {
      const id = url.split("v=")[1]?.split("&")[0];
      setVideoId(id || "Invalid URL");
    } catch (error) {
      console.error("Error extracting video ID:", error);
      setVideoId("Invalid URL");
    }
  };

  // Function to fetch video data
  const fetchVideoData = async () => {
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

  // Effect to fetch video data when the videoId is updated
  useEffect(() => {
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]); // Only trigger when videoId changes

  //Use effect for bot size changing
  useEffect(() => {
    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch and store comments
  const handleFetchComments = async () => {
    if (!url) {
      setError("URL is required.");
      return;
    }

    setLoading(true);

    try {
      await extractVideoId(url); // Set videoId from URL
      const response = await axios.post(`${apiUrl}/comments`, {
        url,
      });

      if (response.data.comments) {
        setComments(response.data.comments);

        const sentimentResponse = await axios.post(
          `${apiUrl}/analyze`
        );
        setSentiment(sentimentResponse.data.sentiment_totals);

        localStorage.setItem(
          "sentiment",
          JSON.stringify(sentimentResponse.data.sentiment_totals)
        );
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const youtubeUrl = params.get("youtubeUrl");
    if (youtubeUrl) {
      setUrl(decodeURIComponent(youtubeUrl));
    }
  }, [location]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Analyzer,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptionsbot = {
    loop: true,
    autoplay: true,
    animationData: Bot,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log(sentiment)
  return (
    <div className="flex flex-col md:flex-row">
      {/*Player input section*/}
      <div className="flex col-span-2 w-full  flex-col items-center gap-4 bg-[#F8F8F8] pb-3 flex-grow">
        <h2 className="text-center md:text-left text-5xl text-slate-800 font-bold mt-24">
          Start Analyzing YouTube Comments
        </h2>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          className="mt-5  p-3 focus:outline-none rounded-md bg-white shadow max-w-lg w-full"
        />
        {!loading && (
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleFetchComments}
              disabled={url === prevUrl}
              className="mt-5 text-lg p-2 bg-black disabled:bg-slate-600 disabled:hover:cursor-not-allowed rounded-md text-white hover:bg-sky-900 "
            >
              Analyze Comments
            </button>
            <a href="https://www.youtube.com/" target="_blank">
              <button className="mt-5 text-lg p-2 bg-red-600 disabled:bg-slate-600 rounded-md text-white hover:bg-red-700">
                Open YouTube
              </button>
            </a>
          </div>
        )}
        {loading && (
          <div className="">
            <Lottie options={defaultOptions} height={100} width={140} />
            <p className="text-center font-semibold text-gray-800 mt-4 text-xl">
              Analyzing....
            </p>
          </div>
        )}

        {!loading && sentiment &&  (
          <Link
            to={"/results"}
            className="underline text-center hover:text-blue-600 text-xl"
          >
            See Result
          </Link>
        )}
      </div>

      {/*Lottie section*/}
      <div className="bg-[#eeebeb] p-6">
        {videoData.title === "" && (
          <Lottie
            options={defaultOptionsbot}
            height={size.height}
            width={size.width}
          />
        )}

        {videoData.title && <DetailsCard videoData={videoData} />}
      </div>
    </div>
  );
}

export default YouTubeCommentAnalyzer;
