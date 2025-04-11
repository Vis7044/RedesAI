import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import Threads from '../components/Thread';

const Home = () => {
  return (
    <div className="h-screen bg-gradient-to-r bg-black bg-cover bg-center flex flex-col justify-between">
      
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <div className="">
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
          className="text-5xl md:text-7xl font-bold text-white text-center"
        >
          Analyzing YouTube <br /> Comments with AI
        </motion.h1>
      </div>
        <Threads amplitude={2.5} distance={0} enableMouseInteraction={true} />
      </div>
    </div>
  );
};

export default Home;
