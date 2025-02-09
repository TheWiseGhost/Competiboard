import React from "react";

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-1 bg-black w-full mb-24"></div>
      <div className="flex flex-col space-y-4 text-left font-euclid items-center">
        <div className="flex flex-row items-start">
          <span className="text-7xl font-semibold transform">Plus Tons of</span>
        </div>
        <div className="flex flex-row gap-2 transform items-center">
          <span className="text-7xl font-semibold">Extra Little</span>
          <div className="bg-black text-white text-7xl font-semibold px-4 py-2 ml-1">
            Features
          </div>
        </div>
      </div>
      <div>
        <p className="font-inter pt-10 text-center text-xl font-medium text-gray-800">
          So Your Board can Made Perfectly and Handle Every Case
        </p>
      </div>
      <div className="pt-12">
        <img src="FeaturesBento.png" className="w-2/3 mx-auto h-full" />
      </div>
    </div>
  );
};

export default Features;
