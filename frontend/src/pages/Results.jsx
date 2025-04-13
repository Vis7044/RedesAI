import React from 'react';
import Chart from '../Chart';
import { motion } from 'framer-motion';
import AnimatedList from '../components/AnimatedList';
const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
];

const Results = () => {
  const sentiment = JSON.parse(localStorage.getItem('sentiment')) || {};
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  const translatedCommentsWithSentiment =
    JSON.parse(localStorage.getItem('translatedCommentsWithSentiment')) || [];

  console.log(comments, translatedCommentsWithSentiment, sentiment);

  if (!sentiment || !comments) {
    return <div>Loading or No data available</div>;
  }

  const positive = sentiment.positive || 0;
  const negative = sentiment.negative || 0;
  const neutral = 100.0 - (positive + negative);

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl text-white  text-center font-semibold pt-28 md:pt-14"
      >
        Sentiment Analysis Results
      </motion.h1>

      <motion.hr
        initial={{ width: 0 }}
        animate={{ width: '80%' }}
        transition={{ duration: 0.8 }}
        className="mx-auto border-t-4 mt-4"
      />

      {/* Chart + Stats */}
      <div className="p-3 mt-6 flex flex-col gap-4 md:flex-row md:justify-center max-w-screen-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center gap-3 text-center"
        >
          <div className="text-2xl md:text-4xl text-green-400">
            Positive: {positive.toFixed(1)}%
          </div>
          <div className="text-2xl md:text-4xl text-red-500">
            Negative: {negative.toFixed(1)}%
          </div>
          <div className="text-2xl md:text-4xl text-gray-600">
            Neutral: {neutral.toFixed(1)}%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Chart
            positive={positive.toFixed(2)}
            negative={negative.toFixed(2)}
            neutral={neutral.toFixed(2)}
          />
        </motion.div>
      </div>

      {/* Comments Section */}
      <div className="w-full mx-auto mt-10 max-w-screen-lg">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-start text-white text-3xl font-semibold"
        >
          Comments: {comments.length}
        </motion.h3>

        <AnimatedList
          items={comments}
          translations={translatedCommentsWithSentiment}
          showGradients={true}
          
          displayScrollbar={true}
        />

       
      </div>
    </>
  );
};

export default Results;
