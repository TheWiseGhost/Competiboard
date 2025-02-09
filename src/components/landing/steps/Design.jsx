const Design = () => {
  return (
    <div className="bg-[#FFEEED] h-screen">
      <div className="h-1 bg-black w-full mb-10"></div>
      <div className="flex flex-row gap-12">
        {/* Left Side */}
        <div className="w-1/2 h-full flex flex-row items-center justify-center">
          <div className="w-[480px] h-[420px] mt-12 bg-white border-4 border-black rounded-2xl"></div>
        </div>

        {/* Right Side */}
        <div className="flex font-dm font-medium text-xl flex-col mt-20 w-1/2">
          <div className="w-[500px] mr-auto">
            <h1 className="text-7xl font-euclid font-semibold pb-12">
              2. Design
            </h1>
            <p className="text-gray-800">
              Fully customize almost every aspect of your board with color,
              text, and font
            </p>
            <p className="mt-6 text-gray-800">
              All you have to do is put in a few hex codes and your board is now
              yours
            </p>
            <p className="mt-6 text-gray-800">
              We’ve already handled the structuring and layout, saving you hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
