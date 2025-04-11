import React from "react";
import Chart from "../Chart";

const Results = () => {
  // Retrieve sentiment and comments from localStorage
  const sentiment = JSON.parse(localStorage.getItem("sentiment")) || {};
  const comments = JSON.parse(localStorage.getItem("comments")) || [];

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
      <h1 className="text-4xl md:text-6xl text-center md:h-[90px] font-semibold">
        Sentiment Analysis Results
      </h1>
      <hr className="w-4/5 mx-auto shadow-xl"></hr>
      <div className="p-3 mt-4">
        {/*Whole chart section*/}
        <div className="flex flex-col gap-2 md:flex-row md:justify-center w-full max-w-screen-lg mx-auto">
          {/*pnn section*/}
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-5 justify-center md:font-semibold md:flex-col">
              <div className="text-2xl md:text-4xl text-green-400 w-40 flex-grow md:flex-grow-0 lg:w-fit">
                Positive: {positive.toFixed(1)}
              </div>
              <div className="text-2xl md:text-4xl text-red-500 w-40 flex-grow md:flex-grow-0 lg:w-fit">
                Negative: {negative.toFixed(1)}
              </div>
              <div className="text-2xl md:text-4xl text-gray-600 w-40 flex-grow md:flex-grow-0 lg:w-fit">
                Neutral: {neutral.toFixed(1)}
              </div>
            </div>
          </div>
          {/*PNN chart*/}
          <div className="">
            <Chart
              positive={positive.toFixed(2)}
              negative={negative.toFixed(2)}
              neutral={neutral.toFixed(2)}
            />
          </div>
        </div>

        {/*comment section*/}
        <div className="w-full mx-auto max-w-screen-lg">
          <h3 className="mt-8 text-start text-3xl">
            Comments: {comments.length}
          </h3>
          {/* Listing of comment */}
          <div className="mt-8 overflow-y-auto overflow-x-hidden h-[370px] flex flex-col gap-2 text-white">
            {comments.map((comment, index) => (
              <div key={index} className="bg-black rounded-md p-3">
                <p className="text-start ml-3">
                  <span className="text-xl font-bold">Comment:</span>{" "}
                  {comment.ReviewText}
                </p>
                <p className="text-start ml-3">
                  <span className="text-xl font-bold">Likes:</span>{" "}
                  {comment.Likes}
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
