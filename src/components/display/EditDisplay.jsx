import React from "react";
import DisplaySettings from "./DisplaySettings";

const CircleText = ({ text }) => (
  <div className="flex flex-row items-center">
    <div className="bg-light_vanilla p-2 rounded-full mr-2"></div>
    <div className="text-vanilla text-sm">{text}</div>
  </div>
);

const Header = ({ title, subtitle }) => (
  <div className="flex flex-col space-y-3 font-dm">
    <div className="flex items-center gap-2">
      <CircleText text="Competiboard" />
      <span>/</span>
      <span className="text-black text-sm">{subtitle}</span>
    </div>
    <div>
      <h1 className="text-4xl font-medium text-black">{title}</h1>
    </div>
  </div>
);

const EditDisplay = ({ id }) => {
  return (
    <div className="flex flex-grow flex-col w-full min-h-screen pb-20 bg-[#FFFFFF] rounded-tl-[20px] border-l-[3px] border-black h-full pl-10 pt-8 overflow-y-auto">
      <Header title={"Edit Your Board's Display"} subtitle={"Display"} />
      <DisplaySettings id={id} />
    </div>
  );
};

export default EditDisplay;
