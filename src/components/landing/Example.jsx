import React from "react";

const Example = () => {
  return (
    <div className="hidden md:flex w-full min-h-screen pb-24 pr-12">
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

      {/* Right side gray section with Supademo */}
      <div className="w-[1200px] h-[600px] bg-white relative">
        <div className="absolute inset-0">
          <div className="w-full h-full relative">
            <iframe
              src="https://app.supademo.com/embed/cm79ruqgz0nhq11on0cy6tpph?embed_v=2"
              title="Supademo Demo"
              allow="clipboard-write"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
