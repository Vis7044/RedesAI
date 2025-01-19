import React from "react";

const DetailsCard = ({ videoData }) => {
  const { title, thumbnail, channel, views, likes, comments } = videoData;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center  max-w-[500px] w-full mx-auto mb-3 ">
      <h1 className="text-xl font-semibold text-gray-800">{channel}</h1>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <p className="text-lg font-semibold text-gray-900 mt-2">{title}</p>
      <div className="flex flex-col space-y-2 text-gray-600">
        <p>
          <strong>Views:</strong> {views}
        </p>
        <p>
          <strong>Total Likes:</strong> {likes}
        </p>
        <p>
          <strong>Total Comments:</strong> {comments}
        </p>
      </div>
    </div>
  );
};

export default DetailsCard;
