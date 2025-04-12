import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import Threads from '../components/Thread';
import GradientText from '../components/GradientText';
import Particles from '../components/Particles';
import { IoHomeOutline } from 'react-icons/io5';
import { icons } from 'lucide-react';

const featureList = [
  {title: 'Sentiment Detection', description: 'Analyze the sentiment of comments.', icon: <IoHomeOutline size={38} />},
  {title: 'Real-Time Analysis', description: 'Get real-time sentiment analysis and trend insights.', icon: <IoHomeOutline size={38} />},
  {title: 'Multi-Language Support', description: 'Support for multiple languages to analyze global social media platforms.', icon: <IoHomeOutline size={38} />},
]

const Home = () => {
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
        className="mt-20"
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
          <GradientText
            colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
            animationSpeed={3}
            showBorder={true}
            className="px-3 py-1 mt-2 text-lg"
          >
            Analyze
          </GradientText>
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
      <div className="mt-10 mb-10 w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureList.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1,y: 0   }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: 'easeOut' }}
              className="border border-white rounded-xl p-6 z-50"
            >
                
              <div
                style={{ width: '100%', height: '200px', position: 'relative' }}
              >
                <div className="text-white absolute top-0 left-0  z-10">
                  {feature.icon}
                </div>
                <Particles
                  particleColors={['#ffffff', '#ffffff']}
                  particleCount={200}
                  particleSpread={10}
                  speed={0.1}
                  
                  particleBaseSize={100}
                  moveParticlesOnHover={true}
                  alphaParticles={false}
                  disableRotation={false}
                />
              </div>
              
              <h2 className="text-xl font-semibold text-white relative z-10">
              {feature.title}
              </h2>
              <p className="text-gray-300 mt-2 relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
