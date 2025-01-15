import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PacmanLoader from 'react-spinners/PacmanLoader';
import RotateLoader from 'react-spinners/RotateLoader';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';

function YouTubeCommentAnalyzer() {
  const [url, setUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState(null);
  const [color, setColor] = useState('#000000');

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
        localStorage.setItem('sentiment', JSON.stringify(sentimentResponse.data.sentiment_totals));
        localStorage.setItem('comments', JSON.stringify(response.data.comments)); 
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
  useEffect(() => {
    if (sentiment) {
      console.log('Sentiment data:', sentiment);
    }
  }, [sentiment]);

  

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
        {!loading && <button 
          onClick={handleFetchComments}
          className="mt-5 text-lg p-2 bg-black rounded-md ml-6 text-white hover:bg-sky-900"
        >
          Analyze Comments
        </button>}
        {loading && (
          <ClipLoader className='mt-6' color={color} loading={loading} size={40} />
        )}

        {error && <p className="text-red-500">{error}</p>}

        {
          !loading && sentiment && comments && <Link to={'/results'} className='underline text-center hover:text-blue-600 text-xl'>See Result</Link>
        }
      </div>
      <div className="">
        <h1>hkdfjslkj</h1>
      </div>

      
    </div>
  );
}

export default YouTubeCommentAnalyzer;
