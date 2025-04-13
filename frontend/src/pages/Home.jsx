import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import Threads from '../components/Thread';
import GradientText from '../components/GradientText';
import Particles from '../components/Particles';
import { IoHomeOutline } from 'react-icons/io5';
import SpotlightCard from '../components/SpotlightCard';

const featureList = [
  {
    title: 'Sentiment Detection',
    description: 'Analyze the sentiment of comments.',
    icon: <IoHomeOutline size={38} />,
  },
  {
    title: 'Real-Time Analysis',
    description: 'Get real-time sentiment analysis and trend insights.',
    icon: <IoHomeOutline size={38} />,
  },
  {
    title: 'Multi-Language Support',
    description:
      'Support for multiple languages to analyze global social media platforms.',
    icon: <IoHomeOutline size={38} />,
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className=""
      style={{
        backgroundImage:
          'radial-gradient(circle at center, #091D0E 0%,#0c0c0b 40%,  #0f0f0f 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{ width: '100%', height: '500px', position: 'relative' }}
        className="mt-40"
      >
        <div className="flex flex-col items-center justify-center ">
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
            className="text-3xl md:text-5xl font-semibold md:font-bold text-white text-center "
            // style={{
            //   backgroundImage: 'linear-gradient(to right, #FF0080, #FF8C00)',
            //   backgroundClip: 'text',
            //   WebkitBackgroundClip: 'text',
            //   color: 'transparent',
            // }}
          >
            <GradientText
              colors={['#ffffff', '#40ffaa', '#4073ff', '#40ffaa', '#4073ff']}
              animationSpeed={3}
              showBorder={false}
            >
              Analyzing YouTube Comments with AI
            </GradientText>
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
            // style={{
            //   backgroundImage: 'linear-gradient(to right, #FF8C00, #FF0080)',
            //   backgroundClip: 'text',
            //   WebkitBackgroundClip: 'text',
            //   color: 'transparent',
            // }}
          >
            <GradientText
              colors={['#8bfa8b', '#6aebfc', '#4073ff', '#60d6f3', '#40ffaa']}
              animationSpeed={3}
              showBorder={false}
            >
              Know what people are saying about your favorite videos and
              channels.
            </GradientText>
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
            
            onClick={() => navigate('/analyse')}
          >
            <GradientText
              colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
              animationSpeed={3}
              showBorder={true}
              className="px-3 py-1 mt-2 text-lg"
            >
              Analyze
            </GradientText>
          </motion.div>
        </div>

        <Threads amplitude={2} distance={0} enableMouseInteraction={true} />
      </div>
      {/* cards */}
      <div className="size-18 mt-16 rounded-full bg-radial from-pink-400 from-40% to-fuchsia-700">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center">
          Why Choose Us?
        </h1>
        <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center">
          We provide the best YouTube comment analysis service using AI.
        </p>
      </div>
    
      <div className="grid grid-cols-1 text-white md:grid-cols-3 gap-6 mt-10 mb-10 w-full max-w-6xl mx-auto px-4">
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <h1 className='text-xl uppercase font-bold'>Sentiment Detection</h1>
          <p className='text-sm'>
            Accurately detect the sentiment behind social media comments using
            state-of-the-art NLP techniques.
          </p>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
           <h1 className='text-xl uppercase font-bold'>Real-Time Analysis</h1>
          <p className='text-sm'>
          Get real-time sentiment analysis and trend insights from recent comments on social media platforms.
          </p>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight-card"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
           <h1 className='text-xl uppercase font-bold'>Multi-Language Support</h1>
          <p className='text-sm'>
          Support for multiple languages to analyze global social media platforms and provide sentiment analysis in various languages.
          </p>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Home;
