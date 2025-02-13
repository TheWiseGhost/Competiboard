import React, { useEffect, useState } from "react";
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
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const fecthUserDetails = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ clerk_id: user?.id }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch user details");

        const result = await response.json();
        if (result.data) {
          setUserDetails(result.data);
        }
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    if (user?.id) fecthUserDetails();
  }, [user]);

  return (
    <div className="w-full justify-start pt-12">
      <UserInfoForm
        email={user?.emailAddresses[0].emailAddress}
        name={user?.fullName}
        plan={
          userDetails?.plan?.charAt(0).toUpperCase() +
            userDetails?.plan?.slice(1) || ""
        }
      />
    </div>
  );
};

const Settings = () => {
  return (
    <div className="bg-[#FFFFFF] rounded-tl-[20px] border-l-[3px] border-black w-full h-full pl-12 pt-8">
      <Header title={"Your Settings and Plan"} subtitle={"Settings"} />
      <SettingsComponent />
    </div>
  );
};

export default Settings;
