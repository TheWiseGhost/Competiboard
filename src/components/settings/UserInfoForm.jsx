import React from "react";

const UserInfoForm = ({ email, name, plan }) => {
  return (
    <div className="font-dm space-y-4 max-w-md bg-white">
      {/* Email Field */}
      <div className="">
        <div className="text-lg font-medium text-gray-800 mb-2">Email</div>
        <div className="border border-vanilla rounded-lg p-3 text-gray-700">
          {email}
        </div>
      </div>

      {/* Name Field */}
      <div className="">
        <div className="text-lg font-medium text-gray-800 mb-2">Name</div>
        <div className="border border-vanilla rounded-lg p-3 text-gray-700">
          {name}
        </div>
      </div>

      {/* Plan Field */}
      <div className="pb-4">
        <div className="text-lg font-medium text-gray-800 mb-2">Plan</div>
        <div className="border border-vanilla rounded-lg p-3 text-gray-700">
          <div className="flex flex-row items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-coral"></div>
            <span>{plan}</span>
          </div>
        </div>
      </div>

      {/* Upgrade Button */}
      <button
        onClick={() => {
          window.open("/checkout");
        }}
        className="w-1/3 bg-coral text-white hover:bg-coral/80 py-3 text-base rounded-lg transition duration-300 font-semibold"
      >
        Upgrade
      </button>
    </div>
  );
};

export default UserInfoForm;
