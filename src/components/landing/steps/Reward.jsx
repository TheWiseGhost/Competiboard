const Reward = () => {
  return (
    <div className="bg-coral/70 h-screen">
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
              3. Reward
            </h1>
            <p className="text-gray-900">
              Elevate your Competiboard through higher stakes for your users
            </p>
            <p className="mt-6 text-gray-900">
              Handle rewards through email and your existing DB, making it super
              easy to setup and manage
            </p>
            <p className="mt-6 text-gray-900">
              Give rewards ranging from a congratulatory email to a $$$ gift
              card
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reward;
