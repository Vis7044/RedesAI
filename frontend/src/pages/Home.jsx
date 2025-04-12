import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import Threads from '../components/Thread';

const Home = () => {
  return (
    <div className="" style={{
      backgroundImage: 'radial-gradient(circle at center, #091D0E 0%,#0c0c0b 40%,  #0f0f0f 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      
      <div style={{ width: '100%', height: '500px', position: 'relative' }} className="mt-20" >
        <div>
          <motion.h1
            initial={{
              filter: 'blur(10px)',
              clipPath: 'inset(0 50% 0 50%)', // Only center part visible
            }}
            animate={{
              filter: 'blur(0px)',
              clipPath: 'inset(0% 0% 0% 0%)', // Reveal entire text
            }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.7 }}
            className="text-3xl  md:text-5xl font-semibold md:font-bold text-white text-center "
            style={{
              backgroundImage: 'linear-gradient(to right, #FF0080, #FF8C00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Analyzing YouTube Comments with AI
          </motion.h1>
          <motion.p
            initial={{
              filter: 'blur(10px)',
              clipPath: 'inset(0 50% 0 50%)', // Only center part visible
            }}
            animate={{
              filter: 'blur(0px)',
              clipPath: 'inset(0% 0% 0% 0%)', // Reveal entire text
            }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 1.2 }}
            className="text-md md:text-lg font-normal text-white text-center"
            style={{
              backgroundImage: 'linear-gradient(to right, #FF8C00, #FF0080)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Know what people are saying about your favorite videos and channels.
          </motion.p>
        </div>

        <Threads amplitude={2} distance={0} enableMouseInteraction={true} />
      </div>
      {/* cards */}
      <div className="size-18 rounded-full bg-radial from-pink-400 from-40% to-fuchsia-700">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center">
          Why Choose Us?
        </h1>
        <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center">
          We provide the best YouTube comment analysis service using AI.
        </p>
      </div>
      <div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-white">Feature 1</h2>
              <p className="text-gray-400 mt-2">Description of feature 1.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-white">Feature 2</h2>
              <p className="text-gray-400 mt-2">Description of feature 2.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-white">Feature 3</h2>
              <p className="text-gray-400 mt-2">Description of feature 3.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
