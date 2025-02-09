import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black font-dm text-white pt-2 pb-3 rounded-t-2xl text-center">
      <p>
        <span className="text-coral text-lg">&copy; </span>
        {new Date().getFullYear()} Competiboard
        <span className="text-coral text-3xl">.</span> All rights reserved
        <span className="text-coral text-3xl">.</span>
      </p>
    </footer>
  );
};

export default Footer;
