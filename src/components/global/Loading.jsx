"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Player component with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const Loading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("/animations/CompetiboardLoading.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error loading animation:", error);
      }
    };

    fetchAnimation();
  }, []);

  if (!animationData) {
    return <div></div>; // Fallback loading state
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div style={{ width: 100, height: 100 }}>
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: "100px", width: "100px" }}
        />
      </div>
      <p className="font-dm text-gray-700 text-sm">Please wait a moment</p>
    </div>
  );
};

export default Loading;
