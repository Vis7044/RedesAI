import React, { useState } from 'react';
import Chart from '../Chart';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
const sentimentColors = {
  positive: 'bg-green-100 text-green-700',
  negative: 'bg-red-100 text-red-700',
  neutral: 'bg-yellow-100 text-yellow-700',
};

const sentimentEmojis = {
  positive: '😊',
  negative: '😠',
  neutral: '😐',
};

const Results = () => {
  const [activeTab, setActiveTab] = useState('Graphical');

  const sentiment = JSON.parse(localStorage.getItem('sentiment')) || {};
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const translatedCommentsWithSentiment =
    JSON.parse(localStorage.getItem('translatedCommentsWithSentiment')) || [];

  const [visibleCount, setVisibleCount] = useState(5);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const positive = sentiment.positive || 0;
  const negative = sentiment.negative || 0;
  const neutral = 100.0 - (positive + negative);

  const tabs = ['Graphical', 'Comments', 'Suggestions'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Graphical':
        return (
          <motion.div
            key="graph"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col item-start items-center lg:flex-row min-h-[60vh] md:justify-center mt-6 gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="text-2xl md:text-4xl text-green-400">
                Positive: {positive.toFixed(1)}%🙂
              </div>
              <div className="text-2xl md:text-4xl text-red-500">
                Negative: {negative.toFixed(1)}%😠
              </div>
              <div className="text-2xl md:text-4xl text-gray-400">
                Neutral: {neutral.toFixed(1)}%😐
              </div>
            </div>
            <Chart
              positive={positive.toFixed(2)}
              negative={negative.toFixed(2)}
              neutral={neutral.toFixed(2)}
            />
          </motion.div>
        );

      case 'Comments':
        return (
          <motion.div
            key="comments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full mx-auto mt-10 min-h-[100vh] max-w-screen-lg"
          >
            <h3 className="text-start text-white text-3xl font-semibold mb-4">
              Comments: {comments.length}
            </h3>

            {translatedCommentsWithSentiment
              .slice(0, visibleCount)
              .map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-4 mb-4 border border-slate-600 rounded-lg"
                >
                  <p className="text-white text-sm mb-2">
                    <strong className='text-green-600'>Original:</strong> {comments[index].ReviewText}
                  </p>
                  <p className="text-white italic text-sm mb-3">
                    <strong className='text-orange-600'>Translated:</strong> {item.text}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                      sentimentColors[item.sentiment]
                    }`}
                  >
                    {sentimentEmojis[item.sentiment]} {item.sentiment}
                  </span>
                </motion.div>
              ))}

            {visibleCount < translatedCommentsWithSentiment.length && (
              <motion.button
                onClick={handleShowMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className=" text-white rounded-lg"
              >
                Show More <IoIosArrowDown className="inline-block ml-2" />
              </motion.button>
            )}
            {visibleCount > translatedCommentsWithSentiment.length && (
              <motion.button
                onClick={() => setVisibleCount(5)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white rounded-lg "
              >
                Reset <IoIosArrowUp className="inline-block ml-2" />
              </motion.button>
            )}
          </motion.div>
        );

      case 'Suggestions':
        return (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-white text-xl min-h-[70vh] text-center mt-6"
          >
            🚧 Suggestions feature coming soon!
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-28 md:pt-14 px-4 max-w-screen-lg mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl text-white text-center font-semibold"
      >
        Sentiment Analysis Results
      </motion.h1>

      {/* Animated Tab Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mt-8 space-x-4"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg text-white transition-all duration-300 ${
              activeTab === tab
                ? 'bg-green-700 font-bold shadow-lg'
                : 'bg-gray-700 hover:bg-green-500'
            }`}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* Animated Content Switch */}
      <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
    </div>
  );
};

export default Results;
