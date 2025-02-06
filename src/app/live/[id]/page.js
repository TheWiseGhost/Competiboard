"use client";

import React from "react";

import LiveBoard from "@/components/live/LiveBoard";

const page = ({ params }) => {
  const unwrappedParams = React.use(params);

  // Access the page property from the unwrapped params
  const id = unwrappedParams.id;
  return (
    <div>
      <LiveBoard id={id} />
    </div>
  );
};

export default page;
