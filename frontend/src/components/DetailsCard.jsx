import React from "react";

const DetailsCard = ({ videoData }) => {
  const { title, thumbnail, channel, views, likes, comments } = videoData;

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 rounded-3xl shadow-[0_0_30px_rgba(0,255,255,0.1)] p-6 flex flex-col items-center max-w-[600px] w-full mx-auto border border-cyan-500/20 backdrop-blur-sm animate-fadeIn">
      <h1 className="text-2xl font-bold text-cyan-400 mb-4 drop-shadow-[0_0_6px_#22d3ee] animate-glow">
        {channel}
      </h1>

      <img
        src={thumbnail}
        alt={title}
        className="w-full h-64 object-cover rounded-2xl border-2 border-cyan-600/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-transform duration-300 hover:scale-105"
      />

      <p className="text-lg font-semibold text-white mt-5 text-center px-3 tracking-wide animate-fadeIn">
        {title}
      </p>

      <div className="mt-6 w-full text-sm text-gray-300 space-y-2 px-3">
        <p className="flex justify-between">
          <span className="text-cyan-400 font-semibold drop-shadow-[0_0_3px_#22d3ee]">👁️ Views:</span>
          <span>{views}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-cyan-400 font-semibold drop-shadow-[0_0_3px_#22d3ee]">👍 Likes:</span>
          <span>{likes}</span>
        </p>
        <p className="flex justify-between">
          <span className="text-cyan-400 font-semibold drop-shadow-[0_0_3px_#22d3ee]">💬 Comments:</span>
          <span>{comments}</span>
        </p>
      </div>
    </div>
  );
};

export default DetailsCard;
