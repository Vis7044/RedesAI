"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function TwitterInputSection() {
  const [query, setQuery] = useState("");

  return (
    <motion.div
      className="p-6 rounded-2xl shadow-lg bg-zinc-900 text-white space-y-6 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-2xl font-bold" variants={itemVariants}>
        Twitter Sentiment Analysis
      </motion.h2>

      <motion.p className="text-sm text-zinc-400" variants={itemVariants}>
        Enter a keyword, hashtag, or @handle to analyze sentiment from tweets.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Input field */}
        <motion.div variants={itemVariants}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. #AI, @elonmusk, climate change"
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>

        {/* Number of tweets */}
        <motion.div variants={itemVariants}>
          <select
            defaultValue="100"
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="50">50 Tweets</option>
            <option value="100">100 Tweets</option>
            <option value="500">500 Tweets</option>
          </select>
        </motion.div>

      </div>

      {/* Analyze button */}
      <motion.div variants={itemVariants}>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg text-white font-medium"
        >
          Analyze
        </button>
      </motion.div>
    </motion.div>
  );
}
