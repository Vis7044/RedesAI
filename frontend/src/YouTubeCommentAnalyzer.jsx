import React, { useState } from "react";
import axios from "axios";

function YouTubeCommentAnalyzer() {
  const [url, setUrl] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch and store comments
  const handleFetchComments = async () => {
    if (!url) {
      setError("URL is required.");
      return;
    }
  
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/comments", { url });
      if (response.data.comments) {
        setComments(response.data.comments);
        setError("");
      } else {
        setError("No comments found for this video.");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      if (err.response) {
        setError(err.response.data.error || "Failed to fetch comments from server.");
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div>
      <h2 className="text-3xl text-red-600 font-bold">
        YouTube Comment Analyzer
      </h2>
      <p className="text-gray-500 mt-2">
        Enter a YouTube video URL below to fetch comments.</p>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
        className="mt-5 bborder-none p-2 focus:outline-none rounded-md bg-white shadow w-96"
      />
      <button
        onClick={handleFetchComments}
        className="mt-5 p-2 bg-red-400 rounded-md ml-6 text-white hover:bg-red-800"
      >
        Fetch Comments
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {loading && <p className="text-gray-500">Loading comments...</p>}
      
      {!error && !loading && comments.length > 0 && (
        <div>
          <h3 className="mt-16 text-start text-3xl">
            Comments: {comments && comments.length}
          </h3>
          <div className=" mt-8 flex flex-col gap-2 text-white">
            {comments &&
              comments.map((comment, index) => (
                <div className="bg-slate-500 rounded-md p-3">
                  <p className="text-start ml-3">
                    <span className="text-xl text-bold">Comment:</span>{" "}
                    {comment.textDisplay}
                  </p>
                  <p className="text-start ml-3">
                    <span className="text-xl text-bold">Likes: </span>
                    {comment.likeCount}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default YouTubeCommentAnalyzer;
