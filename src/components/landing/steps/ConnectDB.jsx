const ConnectDB = () => {
  return (
    <div className="bg-[#FFC7C3] h-screen" id="process">
      <div className="h-1 bg-black w-full mb-10"></div>
      <div className="flex flex-row gap-12 px-6 md:px-0">
        {/* Left Side */}
        <div className="w-1/2 h-full hidden md:flex flex-row items-center justify-center">
          <div className="w-0 md:w-[480px] h-[420px] mt-12 bg-white border-4 border-black rounded-2xl"></div>
        </div>

        {/* Right Side */}
        <div className="flex font-dm font-medium text-lg md:text-xl flex-col mt-20 w-full md:w-1/2">
          <div className="w-full md:w-[500px] mr-auto">
            <h1 className="text-5xl md:text-7xl font-euclid font-semibold pb-12">
              1. Connect DB
            </h1>
            <p className="text-gray-900">
              Connect to your existing database, just plug in your API keys and
              you're done in seconds.
            </p>
            <p className="mt-6 text-gray-900">
              Current DB options are MongoDB, Supabase, Firebase, and Google
              Sheets.
            </p>
            <p className="mt-6 text-gray-900">
              Our database is encrypted and secured so you don’t have to worry
              about your database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectDB;
