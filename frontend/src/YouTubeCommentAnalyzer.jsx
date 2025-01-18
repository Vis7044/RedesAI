import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import Analyzer from './assets/analyzer.json';
import Bot from './assets/bot.json';
import DetailsCard from './components/DetailsCard';

function YouTubeCommentAnalyzer() {
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [color, setColor] = useState('#000000');
  const [videoId, setVideoId] = useState(null);
  const [videoData, setVideoData] = useState({
    title: '',
    thumbnail: '',
    channel: '',
    views: '',
    likes: '',
    comments: '',
  });

  const API_KEY = import.meta.env.VITE_API_KEY;
  
  // Function to extract video ID from the URL
  const extractVideoId = async (url) => {
    try {
      const id = url.split("v=")[1]?.split("&")[0];
      setVideoId(id || 'Invalid URL');
    } catch (error) {
      console.error("Error extracting video ID:", error);
      setVideoId('Invalid URL');
    }
  };

  // Function to fetch video data
  const fetchVideoData = async () => {
    if (!videoId) {
      setError('Video ID is required.');
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
          comments: video.statistics.commentCount
        });
      } else {
        console.log('No video found with the given ID.');
        setError('No video found with the given ID.');
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
      setError('Failed to fetch video data.');
    }
  };

  // Effect to fetch video data when the videoId is updated
  useEffect(() => {
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]); // Only trigger when videoId changes

  // Fetch and store comments
  const handleFetchComments = async () => {
    if (!url) {
      setError('URL is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await extractVideoId(url); // Set videoId from URL
      const response = await axios.post('http://localhost:5000/comments', { url });
      
      if (response.data.comments) {
        setComments(response.data.comments);
        
        const sentimentResponse = await axios.post('http://localhost:5000/analyze');
        setSentiment(sentimentResponse.data.sentiment_totals); 
        
        localStorage.setItem('sentiment', JSON.stringify(sentimentResponse.data.sentiment_totals));
        localStorage.setItem('comments', JSON.stringify(response.data.comments));
      } else {
        setError('No comments found for this video.');
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      if (err.response) {
        setError(err.response.data.error || 'Failed to fetch comments from server.');
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Analyzer,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsbot = {
    loop: true,
    autoplay: true,
    animationData: Bot,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="grid grid-cols-3 h-[calc(100vh-375px)]">
      <div className="flex col-span-2 w-full  flex-col items-center gap-4 bg-[#F8F8F8]">
        <h2 className="text-5xl text-slate-800 font-bold mt-24">
          Start Analyzing YouTube Comments
        </h2>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          className="mt-5  p-2 focus:outline-none rounded-md bg-white shadow w-[700px]"
        />
        {!loading && (
          <button
            onClick={handleFetchComments}
            className="mt-5 text-lg p-2 bg-black rounded-md ml-6 text-white hover:bg-sky-900"
          >
            Analyze Comments
          </button>
        )}
        {loading && (
          <div>
            <Lottie options={defaultOptions} height={100} width={140} />
            <p className="text-center font-semibold text-gray-800 mt-4 text-xl">
              Analyzing....
            </p>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && sentiment && comments && (
          <Link
            to={'/results'}
            className="underline text-center hover:text-blue-600 text-xl"
          >
            See Result
          </Link>
        )}
      </div>
      <div className="bg-[#eeebeb] pt-6">
        {videoData.title==='' && <Lottie options={defaultOptionsbot} height={500} width={440} />}
        {videoData.title && <DetailsCard videoData={videoData} />}
        </div>
    </div>
  );
}

export default YouTubeCommentAnalyzer;
