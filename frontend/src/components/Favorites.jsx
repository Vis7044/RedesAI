import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

const sentimentColors = {
  Positive: "text-green-400 bg-green-800/30",
  Negative: "text-red-400 bg-red-800/30",
  Neutral: "text-yellow-400 bg-yellow-800/30",
};

const Favorites = ({ logs, onStar }) => {
  const favorites = logs.filter((log) => log.favourite);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-3xl shadow-2xl ring-1 ring-purple-700/30 backdrop-blur-md"
    >
      <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
        ⭐ Favorites
      </h2>

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full table-auto text-left border-collapse text-sm sm:text-base">
          <thead className="bg-gradient-to-r from-purple-900/60 to-gray-800 text-purple-300">
            <tr className="text-center no-wrap">
              <th className="p-4">Video Name</th>
              <th className="p-4">👍 Positive</th>
              <th className="p-4">👎 Negative</th>
              <th className="p-4">😐 Neutral</th>
              <th className="p-4">🗑️ Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            <AnimatePresence>
              {favorites.map((log) => (
                <motion.tr
                  key={log._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="p-4 font-medium text-white w-64">
                    {log.videoName}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${sentimentColors.Positive}`}
                    >
                      {log.resultStatus.positive.toFixed(2)}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${sentimentColors.Negative}`}
                    >
                      {log.resultStatus.negative.toFixed(2)}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${sentimentColors.Neutral}`}
                    >
                      {log.resultStatus.neutral.toFixed(2)}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onStar(log._id)}
                      className="text-red-400 hover:text-red-300 hover:scale-110 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Favorites;
