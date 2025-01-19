import React from "react";
import CallToAction from "../components/CallToAction";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import HomeLottie from "../assets/home_lottie1.json";

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: HomeLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="">
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Unlock Insights from Social Media Comments
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Harness the power of AI to analyze, understand, and act on social
              media engagement.
            </p>
            <Link
              to={"/analyse"}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 font-semibold"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 w-full flex justify-center items-center">
            <div className="w-40 h-40 sm:w-60 sm:h-72 md:w-80 md:h-80">
              <Lottie options={defaultOptions} />
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </div>
  );
};

export default Home;
