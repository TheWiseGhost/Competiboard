"use client";

import React from "react";

import PublicBoard from "@/components/live/PublicBoard";

const page = ({ params }) => {
  const unwrappedParams = React.use(params);

  // Access the page property from the unwrapped params
  const board = unwrappedParams.board;
  return (
    <div>
      <PublicBoard board={board} />
    </div>
  );
};

export default page;
