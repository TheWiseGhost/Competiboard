import React from "react";
import UserInfoForm from "./UserInfoForm";
import { useUser } from "@clerk/nextjs";

const CircleText = ({ text }) => (
  <div className="flex flex-row items-center">
    <div className="bg-gold p-2 rounded-full mr-2"></div>
    <div className="text-amber-950 text-sm">{text}</div>
  </div>
);

const Header = ({ title, subtitle }) => (
  <div className="flex flex-col space-y-3 font-dm -mt-1">
    <div className="flex items-center gap-2">
      <CircleText text="Competiboard" />
      <span>/</span>
      <span className="text-black font-dm text-sm">{subtitle}</span>
    </div>
    <div>
      <h1 className="text-5xl font-semibold font-euclid text-black">
        {title}
        <span className="text-6xl text-red-500">.</span>
      </h1>
    </div>
  </div>
);

const SettingsComponent = () => {
  const { user } = useUser();
  return (
    <div className="w-full justify-start pt-12">
      <UserInfoForm
        email={user?.emailAddresses[0].emailAddress}
        name={user?.fullName}
        // Fix plan stuff later
        plan={"free"}
      />
    </div>
  );
};

const Settings = () => {
  return (
    <div className="bg-[#FFFFFF] rounded-tl-[20px] border-l-[3px] border-black w-full h-full pl-10 pt-8">
      <Header title={"Your Settings and Plan"} subtitle={"Settings"} />
      <SettingsComponent />
    </div>
  );
};

export default Settings;
