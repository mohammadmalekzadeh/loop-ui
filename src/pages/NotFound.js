import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 text-white overflow-hidden px-4">

      {/* Particles */}
      <Particles
        className="absolute top-0 left-0 w-full h-full"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: ["#00ffff", "#ff00ff", "#00ff00"] },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: "none", random: true, outModes: "out" },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: false } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          detectRetina: true,
        }}
      />

      {/* Floating Neon Shapes */}
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
        <span className="shape shape1 bg-blue-500"></span>
        <span className="shape shape2 bg-pink-500"></span>
        <span className="shape shape3 bg-green-500"></span>
        <span className="shape shape4 bg-purple-500"></span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-9xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-green-400 animate-blinkNeon">
        ۴ ۰ ۴
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 right-farsi">صفحه مورد نظر یافت نشد!</h2>
        <p className="mb-8 text-gray-300 right-farsi">
        متاسفیم، صفحه مورد نظر شما وجود ندارد یا منتقل شده است.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition  right-farsi"
        >
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
