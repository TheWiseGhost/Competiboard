"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Loading from "../global/Loading";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../global/Drawer";
import { FileUpload } from "@/components/global/FileUpload";
import { ToastAction } from "../global/Toast";
import { useToast } from "../global/Use-Toast";

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

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (file) => {
    setFile(file);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value.slice(0, 100));
  };

  const handleUpload = async () => {
    if (!file || !title) {
      alert("Please fill all fields and select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("clerk_id", user.id);

      const uploadUrl = "http://127.0.0.1:8000/api/add_board/";

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading file.");
      }
    } catch (error) {
      // console.error("Error uploading file:", error);
      // alert("Error uploading file. Please try again.");
    } finally {
      toast({
        title: `Board Added: ${title}`,
        description: "Start building your board when your ready",
        action: (
          <ToastAction
            onClick={() => {
              window.location.href = "/board/data";
            }}
            altText="Go to Edit Data"
          >
            Edit Data
          </ToastAction>
        ),
      });
      setFile(null);
      setTitle("");
    }
  };

  useEffect(() => {
    if (user) {
      const fetchBoards = async () => {
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/board_options/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" }, // Added header for JSON content
              body: JSON.stringify({ clerk_id: user.id }),
            }
          );

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
      <div className="w-full h-full flex justify-center items-center bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {boards.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-16 gap-y-8 w-full pt-6 ">
          {boards.map((board) => (
            <GridItem
              key={board.id}
              title={board.title}
              thumbnail={board.thumbnail}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-center space-y-4">
          <p className="font-dm text-rubarb">
            Create Your First Board to get started with Competiboard
          </p>
          <Drawer>
            <DrawerTrigger>
              <span className="bg-coral font-dm text-white hover:bg-coral/80 transition duration-200 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none">
                Create Board
              </span>
            </DrawerTrigger>
            <DrawerContent>
              <div className="h-fit w-2/5 flex flex-col mx-auto min-h-96 pb-4">
                <div className="mx-auto h-2 rounded-2xl bg-light_vanilla w-1/5"></div>
                <DrawerHeader>
                  <DrawerTitle className="font-dm text-4xl text-coral pt-6">
                    Create a New Board
                  </DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <div className="pb-2 font-dm">
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitleChange}
                      placeholder="Enter title"
                      className="border w-full border-vanilla rounded-lg p-3 text-gray-700 active:border-coral"
                      maxLength="100"
                    ></input>
                  </div>
                  <div className="pb-4">
                    <FileUpload
                      onChange={handleFileUpload}
                      target={"Board Thumbnail"}
                    />
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose>
                    <button
                      onClick={handleUpload}
                      className="bg-coral font-dm w-4/5 mx-auto text-white hover:bg-coral/80 transition duration-200 inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Create
                    </button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </>
  );
};

const Dashboard = () => (
  <div className="bg-[#FFFFFF] rounded-tl-[18px] w-full h-full">
    <DashboardComponent />
  </div>
);

export default Dashboard;
