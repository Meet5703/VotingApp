import { useEffect, useState } from "react";
import { AcmeLogo } from "../components/svg/Menu"; // Update the path to your SVG file

const Home = () => {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrolling(scrollTop > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="w-full h-full flex flex-col items-center justify-center flex-grow relative">
        <div className="hero h-screen flex flex-col justify-center items-center text-center py-16 relative w-full">
          <div className={`parallax-bg ${scrolling ? "scrolled" : "parallax"}`}>
            <AnimatedBackground />
          </div>
          <AcmeLogo className="h-16 w-auto mb-6 animate-fade-in relative z-10" />
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-shadow-md animate-fade-in relative z-10">
            Make Your Voice Heard
          </h1>
          <p className="text-lg mb-8 max-w-3xl mx-auto animate-fade-in delay-150 font-light text-gray-300">
            Create and participate in polls effortlessly. Engage in
            conversations that matter to you and influence decisions.
          </p>
          <div className="space-x-4 animate-fade-in delay-300 relative z-10">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
              onClick={() => (window.location.href = "/participate")}
            >
              Participate Now
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
              onClick={() => (window.location.href = "/create-poll")}
            >
              Create Poll Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
const AnimatedBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-50 animate-slow-float"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: "#00BFFF", stopOpacity: 0.9 }} />{" "}
        {/* Brighter blue */}
        <stop
          offset="100%"
          style={{ stopColor: "transparent", stopOpacity: 0 }}
        />
      </radialGradient>
    </defs>

    {/* Larger circles for visibility */}
    <circle cx="20%" cy="30%" r="300" fill="url(#circleGradient)" />
    <circle cx="80%" cy="50%" r="350" fill="url(#circleGradient)" />
    <circle cx="50%" cy="70%" r="250" fill="url(#circleGradient)" />

    {/* Animated Particles */}
    <rect x="40%" y="20%" width="15" height="15" fill="#FF6B6B" opacity="0.8">
      <animate
        attributeName="y"
        values="20%;80%;20%"
        dur="10s"
        repeatCount="indefinite"
      />
    </rect>
    <circle cx="70%" cy="60%" r="12" fill="#4FD1C5" opacity="0.8">
      <animate
        attributeName="cx"
        values="70%;30%;70%"
        dur="15s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="15%" cy="85%" r="14" fill="#ECC94B" opacity="0.8">
      <animate
        attributeName="cy"
        values="85%;15%;85%"
        dur="12s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default Home;
