import React from 'react';
import Chart from '../Chart';

const Results = () => {
  // Retrieve sentiment and comments from localStorage
  const sentiment = JSON.parse(localStorage.getItem('sentiment')) || {};
  const comments = JSON.parse(localStorage.getItem('comments')) || [];

  // If sentiment or comments are missing, return a loading or error message
  if (!sentiment || !comments) {
    return <div>Loading or No data available</div>;
  }

  // Ensure the sentiment data exists and default to zero if not
  const positive = sentiment.positive || 0;
  const negative = sentiment.negative || 0;
  const neutral = 100.0 - (positive + negative);

  return (
    <>
      <h1 className="text-6xl text-center font-semibold">Sentiment Analysis Results</h1>
      <div className="grid grid-cols-3 p-3 mt-4">
        <div className="flex gap-6 justify-center items-end font-semibold flex-col pr-20 pb-16">
          <div className="text-4xl text-green-400">
            Positive: {positive.toFixed(1)}
          </div>
          <div className="text-4xl text-red-500">
            Negative: {negative.toFixed(1)}
          </div>
          <div className="text-4xl text-gray-600">
            Neutral: {neutral.toFixed(1)}
          </div>
        </div>
        <div className="mt-8 ml-12">
          <Chart
            positive={positive.toFixed(2)}
            negative={negative.toFixed(2)}
            neutral={neutral.toFixed(2)}
          />
        </div>
        <div className=''>
          <h3 className="mt-8 text-start text-3xl">
            Comments: {comments.length}
          </h3>
          <div className="mt-8 overflow-y-auto h-[370px] flex flex-col gap-2 text-white">
            {comments.map((comment, index) => (
              <div key={index} className="bg-black rounded-md p-3">
                <p className="text-start ml-3">
                  <span className="text-xl font-bold">Comment:</span> {comment.ReviewText}
                </p>
                <p className="text-start ml-3">
                  <span className="text-xl font-bold">Likes:</span> {comment.Likes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
