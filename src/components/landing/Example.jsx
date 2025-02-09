import React from "react";

const Example = () => {
  return (
    <div className="flex w-full min-h-screen pb-24 pr-12">
      {/* Left side with text */}
      <div className="w-1/5 flex">
        <div className="flex flex-col space-y-4 text-left font-euclid -rotate-90 pt-44">
          <div className="flex flex-row items-start">
            <span className="text-6xl font-semibold transform">
              It could be
            </span>
          </div>
          <div className="flex flex-row gap-2 transform">
            <span className="text-6xl font-semibold">your</span>
            <div className="bg-black text-white text-6xl font-semibold px-4 py-1">
              board
            </div>
          </div>
        </div>
      </div>

      {/* Right side gray section */}
      <div className="w-[1200px] h-[600px] bg-gray-200">
        {/* Content for gray section can go here */}
      </div>
    </div>
  );
};

export default Example;
