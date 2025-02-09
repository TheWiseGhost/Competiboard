import React from "react";

const Pricing = () => {
  return (
    <div className="min-h-screen pt-40 pb-8 px-4 md:px-24">
      <h1 className="text-7xl font-euclid font-semibold mb-12">
        Pricing<span className="text-red-500">.</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-inter">
        {/* Basic Plan */}
        <div className="rounded-3xl bg-coral/60 px-10 h-96 pt-20 pb-8 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">Basic</h2>
            <p className="text-gray-800 text-base mb-6">
              Start today with zero risk and build your own Competiboard
            </p>
          </div>
          <div className="text-4xl font-bold mb-6">Free</div>
          <button className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-15 mx-auto hover:bg-white transition-colors">
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-3xl bg-[#FF6C63] px-10 h-96 pt-20 pb-8 flex flex-col relative">
          <div className="absolute top-6 right-6 bg-black text-[#FF6C63] text-xs px-4 py-2 font-euclid font-medium rounded-full">
            Most Popular
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">Pro</h2>
            <p className="text-gray-900 text-base mb-6">
              Use Competiboard with no paywalls and all its features
            </p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold">$9</span>
            <span className="text-gray-800 text-sm">/month</span>
          </div>
          <button className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 hover:bg-opacity-15 mx-auto hover:bg-white transition-colors">
            Get Started
          </button>
        </div>

        {/* Custom Plan */}
        <div className="rounded-3xl bg-white border-2 border-black px-10 h-96 pt-20 pb-8 flex flex-col">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">Custom</h2>
            <p className="text-gray-800 text-base mb-6">
              Need more? Get a custom coded board to host on your site
            </p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold">$??</span>
            <span className="text-gray-800 text-sm">/once</span>
          </div>
          <button className="w-full text-black border-2 font-semibold border-black rounded-full py-2 px-4 mx-auto hover:bg-slate-100 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
