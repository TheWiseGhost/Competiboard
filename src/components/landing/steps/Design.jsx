const Design = () => {
  return (
    <div className="bg-[#FFEEED] min-h-screen md:h-screen">
      <div className="h-1 bg-black w-full mb-10"></div>
      <div className="flex flex-col md:flex-row gap-12 px-6 md:px-0">
        {/* Left Side */}
        <div className="w-full md:w-1/2 md:h-full flex flex-row items-center justify-center">
          <div className="md:w-[480px] md:h-[420px] md:mt-12 flex items-center justify-center bg-white border-4 border-black rounded-2xl">
            <img src="/AddDisplay.png" className="w-4/5 md:w-full p-10" />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex font-dm font-medium text-lg md:text-xl flex-col md:mt-20 mb-16 md:mb-0 w-full px-4 md:px-0 md:w-1/2">
          <div className="w-full md:w-[500px] mr-auto">
            <h1 className="text-5xl md:text-7xl font-euclid font-semibold pb-12">
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
