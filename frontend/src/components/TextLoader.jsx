import { useEffect, useState } from "react";

const TextLoader = ({ loading }) => {
  const messages = [
    "Analyzing",
    "Please wait while we process your data.",
    "Thank you for your patience — we appreciate your time!",
    "Still working... magic takes a moment ✨",
    "Almost there — just a few more seconds!",
    "Turning data into insights...",
    "Running sentiment analysis — emotions are tricky!",
    "Deep diving into the comment ocean",
  ];
  

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!loading) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 3000); // increased a bit for smoother pacing

    return () => clearInterval(interval);
  }, [loading]);

  return (
    loading && (
      <div className="text-center mt-6 min-h-[3rem]">
        <p
          className={`text-lg md:text-lg text-white transition-opacity duration-500 font-medium tracking-wide ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-slate-100 drop-shadow-[0_0_0.5rem_#6EE7B7]">
            {messages[currentIndex]}
          </span>
          <span className="animate-pulse text-emerald-400 ml-1">...</span>
        </p>
      </div>
    )
  );
};

export default TextLoader;
