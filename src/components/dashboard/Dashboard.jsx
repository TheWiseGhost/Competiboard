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

const CircleText = ({ text }) => (
  <div className="flex flex-row items-center">
    <div className="bg-neutral-300 p-2 rounded-full mr-2"></div>
    <div className="text-neutral-400 text-sm">{text}</div>
  </div>
);

const Header = ({ title, subtitle }) => (
  <div className="flex flex-col space-y-3 font-dm -mt-1">
    <div className="flex items-center gap-2">
      <CircleText text="Competiboard" />
      <span>/</span>
      <span className="text-black text-sm">{subtitle}</span>
    </div>
    <div>
      <h1 className="text-5xl font-semibold font-euclid text-black">
        {title}
        <span className="text-6xl text-red-500">.</span>
      </h1>
    </div>
  </div>
);

const GridItem = ({ title, thumbnail }) => (
  <div className="flex flex-col space-y-2 px-4 items-start">
    <div className="rounded-lg overflow-hidden flex flex-col justify-center items-center h-64 w-fit">
      {thumbnail ? (
        <img
          src={thumbnail}
          className="w-full h-3/4 object-contain px-4"
          alt="thumbnail"
        />
      ) : null}
      <div className="text-xl font-dm font-medium text-black w-full text-center pr-2 pt-2">
        {title}
      </div>
    </div>
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
        description: "Refresh the page to see it",
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
        <div className="grid grid-cols-3 gap-x-16 gap-y-8 w-full pt-6 items-start pb-8">
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
          <p className="font-dm text-gray-700">
            Create Your First Board to get started with Competiboard
          </p>
        </div>
      )}
      <Drawer>
        <DrawerTrigger>
          <span className="bg-light_coral font-dm text-white hover:bg-light_coral/80 transition duration-200 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none">
            Create Board
          </span>
        </DrawerTrigger>
        <DrawerContent>
          <div className="h-fit w-2/5 flex flex-col mx-auto min-h-96 pb-4">
            <div className="mx-auto h-2 rounded-2xl bg-gray-200 w-1/5"></div>
            <DrawerHeader>
              <DrawerTitle className="font-euclid font-semibold text-4xl text-black pt-6">
                Create a New Board
                <span className="text-red-500 text-5xl">.</span>
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <div className="pb-2 font-dm">
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter title"
                  className="border w-full border-gray-400 rounded-lg p-3 text-gray-700 active:border-light_coral"
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
                <span
                  onClick={handleUpload}
                  className="bg-light_coral font-dm w-4/5 mx-auto text-white hover:bg-light_coral/80 transition duration-200 inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none"
                >
                  Create
                </span>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Dashboard = () => (
  <div className="bg-[#FFFFFF] rounded-tl-[20px] border-l-[3px] border-black w-full h-full pl-10 pt-8">
    <Header title={"Your Competiboards"} subtitle={"Dashboard"} />
    <DashboardComponent />
  </div>
);

export default Dashboard;
