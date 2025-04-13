import React from "react";

const DetailsCard = ({ videoData }) => {
  const { title, thumbnail, channel, views, likes, comments } = videoData;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-6 flex flex-col items-center max-w-[550px] w-full mx-auto mb-6 border border-cyan-500/30 backdrop-blur-sm">
      <h1 className="text-xl font-semibold text-cyan-400 mb-3">{channel}</h1>

      <img
        src={thumbnail}
        alt={title}
        className="w-full h-64 object-cover rounded-xl border-2 border-cyan-600/30 shadow-lg"
      />

      <p className="text-lg font-semibold text-white mt-4 text-center px-2">{title}</p>

      <div className="mt-4 w-full text-sm text-gray-300 space-y-1 px-2">
        <p>
          <span className="text-cyan-400 font-semibold">👁️ Views:</span> {views}
        </p>
        <p>
          <span className="text-cyan-400 font-semibold">👍 Likes:</span> {likes}
        </p>
        <p>
          <span className="text-cyan-400 font-semibold">💬 Comments:</span> {comments}
        </p>
      </div>
    </div>
  );
};

export default DetailsCard;
