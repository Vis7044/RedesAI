import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Github, Linkedin } from "lucide-react";


export const DivOrigami = ({creatorDetails}) => {
  return (
    <section className="flex flex-col items-center justify-center gap-12 md:flex-row">
      <LogoRolodex
        items={[
          <LogoItem key={1} className="bg-gradient-to-r from-gray-900 via-black to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img
              src={creatorDetails.img}
              alt="Team Member"
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-purple-500"
            />
            <h3 className="text-xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:scale-105 transition-all duration-500">
              {creatorDetails.name}
            </h3>
            <p className="text-white text-lg tracking-wide text-shadow-md">
              {creatorDetails.role}
            </p>
          </LogoItem>,

          <LogoItem key={2} className="bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-950 text-white p-6 rounded-xl shadow-xl border border-neutral-700 hover:shadow-2xl transition-all duration-300">
            <h5 className="text-2xl mb-3 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 underline underline-offset-4 animate__animated animate__fadeIn">
              About {creatorDetails.name}
            </h5>

            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              {creatorDetails.desc}
            </p>

            <div className="flex justify-end items-center gap-4 mt-6">
              <Github className="w-6 h-6 text-gray-400 hover:text-purple-500 transition-colors duration-300 cursor-pointer" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-purple-500 transition-colors duration-300 cursor-pointer" />
            </div>
          </LogoItem>

        ]}
      />
    </section>
  );
};

const DELAY_IN_MS = 4000;
const TRANSITION_DURATION_IN_SECS = 2;

const LogoRolodex = ({ items }) => {
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((pv) => pv + 1);
    }, DELAY_IN_MS);

    return () => {
      clearInterval(intervalRef.current || undefined);
    };
  }, []);

  return (
    <div
      style={{
        transform: "rotateY(-20deg)",
        transformStyle: "preserve-3d",
      }}
      className="relative z-0 h-80 w-80 shrink-0 rounded-xl border border-neutral-700 bg-neutral-800 transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_#7f5af0]"
    >
      <AnimatePresence mode="sync">
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            zIndex: -index,
            backfaceVisibility: "hidden",
          }}
          key={index}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          initial={{ rotateX: "0deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "-180deg" }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
        <motion.div
          style={{
            y: "-50%",
            x: "-50%",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            zIndex: index,
            backfaceVisibility: "hidden",
          }}
          key={(index + 1) * 2}
          initial={{ rotateX: "180deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "0deg" }}
          transition={{
            duration: TRANSITION_DURATION_IN_SECS,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
      </AnimatePresence>

      
    </div>
  );
};

const LogoItem = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "grid h-72 w-72 place-content-center rounded-lg text-6xl text-neutral-50",
        className
      )}
    >
      {children}
    </div>
  );
};