import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import Analyzer from './assets/analyzer.json';
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
  const URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;

  const extractVideoId = async (url) => {
    setVideoData({title: '', thumbnail: '', channel: '', views: '', likes: '', comments: ''});
    try {
      const id = url.split("v=")[1]?.split("&")[0]; // Safely split and extract
      setVideoId(id || 'Invalid URL');
    } catch (error) {
      console.error("Error extracting video ID:", error);
      setVideoId('Invalid URL');
    }
  };

  

  const fetchVideoData = async () => {
    if (!url) {
      setError('URL is required.');
      return;
    }
    
    await extractVideoId(url);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.items.length > 0) {
          const video = data.items[0];
          console.log(video)
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
        }
      })
      .catch((error) => console.error('Error fetching video details:', error));
  };

  // Fetch and store comments
  const handleFetchComments = async () => {
    if (!url) {
      setError('URL is required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch comments from Flask backend

      fetchVideoData();
      const response = await axios.post('http://localhost:5000/comments', {
        url,
      });
      if (response.data.comments) {
        setComments(response.data.comments);

        // Fetch sentiment analysis data
        const sentimentResponse = await axios.post(
          'http://localhost:5000/analyze'
        );
        setSentiment(sentimentResponse.data.sentiment_totals); // Assuming this is the structure returned
        localStorage.setItem(
          'sentiment',
          JSON.stringify(sentimentResponse.data.sentiment_totals)
        );
        localStorage.setItem(
          'comments',
          JSON.stringify(response.data.comments)
        );
      } else {
        setError('No comments found for this video.');
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      if (err.response) {
        setError(
          err.response.data.error || 'Failed to fetch comments from server.'
        );
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Log sentiment when it changes
  

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Analyzer, // Loaded Lottie data
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
      <div className="">
        {
          videoData.title && (
            <DetailsCard videoData={videoData}/>
          )
        }
      </div>
    </div>
  );
}

export default YouTubeCommentAnalyzer;
