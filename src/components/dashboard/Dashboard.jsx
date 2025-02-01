"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Loading from "../global/Loading";

const GridItem = ({ title, thumbnail }) => (
  <div className="flex flex-col space-y-2 px-4">
    <div className="bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center h-52 w-full">
      {thumbnail ? (
        <img
          src={thumbnail}
          className="w-full self-center rounded-2xl"
          alt="thumbnail"
        />
      ) : null}
    </div>
    <div className="text-xl text-center pr-2">{title}</div>
  </div>
);

const DashboardComponent = () => {
  const [boards, setBoards] = useState(null); // Initialize as null to check loading state
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const fetchBoards = async () => {
        try {
          const response = await fetch("http://127.0.0.1/api/board_options/", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Added header for JSON content
            body: JSON.stringify({ clerk_id: user.id }),
          });

          if (response.ok) {
            const data = await response.json();
            setBoards(data.boards);
          } else {
            console.error("Failed to fetch boards");
          }
        } catch (error) {
          console.error("Error fetching boards:", error);
        }
      };

      fetchBoards();
    }
  }, [user]);

  if (boards === null) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {boards.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-16 gap-y-8 w-full pt-6">
          {boards.map((board) => (
            <GridItem
              key={board.id}
              title={board.title}
              thumbnail={board.thumbnail}
            />
          ))}
        </div>
      ) : (
        <div className="w-full justify-center items-center text-center">
          <p className="font-dm pt-40">
            Create Your First Board Instance to get started with Competiboard
          </p>
        </div>
      )}
    </>
  );
};

const Dashboard = () => (
  <>
    <DashboardComponent />
  </>
);

export default Dashboard;
