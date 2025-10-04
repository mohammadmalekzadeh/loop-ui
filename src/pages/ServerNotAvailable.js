import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";

export default function ServerNotAvailable() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-azul text-eggshell overflow-hidden px-4">

      {/* Particles */}
      <Particles
        className="absolute top-0 left-0 w-full h-full"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: ["#FF9800", "#4CAF50", "#E08800", "#00796B"] }, // loop, pigment_green, fulvous, pine_green
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

      {/* Floating Shapes */}
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
        <span className="shape shape1 bg-loop"></span>
        <span className="shape shape2 bg-pigment_green"></span>
        <span className="shape shape3 bg-fulvous"></span>
        <span className="shape shape4 bg-pine_green"></span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-loop via-pigment_green to-fulvous animate-blinkNeon">
          ۵ ۰ ۳
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 right-farsi">
          سرور در دسترس نیست!
        </h2>
        <p className="mb-8 text-eggshell right-farsi">
          سرور در حال بروزرسانی است، لطفا منتظر بمانید...
        </p>
      </div>
    </div>
  );
}
