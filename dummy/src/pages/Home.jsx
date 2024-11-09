import { useEffect, useState } from "react";
import { AcmeLogo } from "../components/svg/Menu";
import Img1 from "../assets/poll.png";
import Img2 from "../assets/create.png";
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
              onClick={() => (window.location.href = "/polls")}
            >
              Create Poll Now
            </button>
          </div>
        </div>

        {/* New "How It Works" Section */}
        <section className="w-full py-16 bg-gradient-to-b from-gray-800 to-gray-700 text-gray-200">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-center text-yellow-400">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:space-x-6 items-start md:items-center">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    Participate in a Poll
                  </h3>
                  <p className="leading-relaxed">
                    To participate, simply go to the{" "}
                    <strong>Participate</strong> tab, find a relevant poll that
                    interests you, and submit your response. However, if a
                    poll’s result has been declared, participation is no longer
                    allowed.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img
                    src={Img1}
                    alt="Participate illustration"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse md:space-x-6 items-start md:items-center">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    Create Your Own Poll
                  </h3>
                  <p className="leading-relaxed">
                    Head over to the <strong>Make Polls</strong> tab to create a
                    poll. Add your question and options to collect public
                    opinions. You can even create multiple questions at once.
                    After creating, access your polls through the bottom of the
                    form or the
                    <strong> Participate</strong> page, where a chart for each
                    question will show real-time voting data.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img
                    src={Img2}
                    alt="Create Poll illustration"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
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
        <stop offset="0%" style={{ stopColor: "#00BFFF", stopOpacity: 0.9 }} />
        <stop
          offset="100%"
          style={{ stopColor: "transparent", stopOpacity: 0 }}
        />
      </radialGradient>
    </defs>

    <circle cx="20%" cy="30%" r="300" fill="url(#circleGradient)" />
    <circle cx="80%" cy="50%" r="350" fill="url(#circleGradient)" />
    <circle cx="50%" cy="70%" r="250" fill="url(#circleGradient)" />

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
