"use client";

import React, { useState } from "react";

const Hero = () => {
  const [companyName, setCompanyName] = useState("");

  const NavButton = ({ text, href }) => (
    <a
      onClick={() => window.open(href)}
      className="cursor-pointer font-inter text-sm"
    >
      <span className="text_button">
        <span className="span-mother">
          {text.split("").map((char, index) => (
            <span key={index} className="inline-block">
              {char}
            </span>
          ))}
        </span>
        <span className="span-mother2">
          {text.split("").map((char, index) => (
            <span key={index} className="inline-block">
              {char}
            </span>
          ))}
        </span>
      </span>
    </a>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 pt-8">
        <div className="flex items-center gap-2">
          <img
            src="CompetiboardLogo.png"
            alt="Competiboard Logo"
            className="h-8 w-8"
          />
          <span className="font-semibold font-euclid text-xl">
            Competiboard
          </span>
        </div>

        <div className="flex gap-6">
          <NavButton text="Process" href="/how-it-works" />
          <NavButton text="Pricing" href="/pricing" />
          <NavButton text="Features" href="/features" />
        </div>

        <a
          href="/dashboard"
          className="relative font-euclid font-semibold mr-6 inline-flex h-12 overflow-hidden rounded-full p-[4px]"
        >
          <span className="absolute inset-[-100%] animate-[spin_1s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF9B95_0%,#edeceb_50%,#FF9B95_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-white backdrop-blur-3xl">
            Dashboard
          </span>
        </a>
      </nav>

      {/* Main Content */}
      <main className=" flex flex-col mx-auto mt-16 text-center px-4">
        <h1 className="text-7xl font-bold mb-8 font-euclid">
          <span className="text-8xl pr-2">🥇</span>
          <span className="inline-block bg-black text-white pl-3 pr-4 py-2 mr-2">
            Boost
          </span>
          <span>
            {" "}
            your <br /> engagement in seconds
          </span>
          <span className="text-red-500">.</span>
        </h1>

        <p className="text-xl text-gray-800 text-center w-[850px] mb-12 mx-auto font-afc leading-8">
          Competiboard helps you effortlessly launch your{" "}
          <span className="font-bold">Custom Leaderboard</span> based on your
          users to generate{" "}
          <span className="bg-coral/90 text-black px-2 rounded">
            healthy competition.
          </span>{" "}
          Board builder, rewards, backend, db connections, filtering, all done
          for you
        </p>

        <div className="flex justify-center w-fit mx-auto py-1 px-1 rounded-full bg-white border-black border-2 items-center font-inter">
          <div className="flex items-center pl-4 pr-2 py-2">
            <span className="text-black font-semibold">competiboard.com/</span>
            <input
              type="text"
              placeholder="yourcompany"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-transparent border-none outline-none pl-1 w-[150px] font-semibold"
            />
          </div>

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="border border-white relative py-2 px-5 text-white text-base font-bold overflow-hidden bg-black rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-100 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-coral before:to-coral before:transition-all before:duration-300 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
          >
            Get started for free
          </button>
        </div>
      </main>
    </div>
  );
};

export default Hero;
