"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ToastAction } from "../global/Toast";
import { useToast } from "../global/Use-Toast";

const DisplaySettings = ({ id }) => {
  // State for all settings, including fonts
  const [settings, setSettings] = useState({
    borders: "",
    boardBackground: "",
    pageBackground: "",
    titleColor: "",
    subtitleColor: "",
    dateRange: "",
    tableHeaders: "",
    ranks: "",
    rankingField: "",
    nameField: "",
    title: "",
    subtitle: "",
    rankingTitle: "",
    nameTitle: "",
    titleFont: "",
    subtitleFont: "",
    boardRankTitleFont: "",
    boardRankFont: "",
    boardNameTitleFont: "",
    boardNameFont: "",
  });

  const { user } = useUser();
  const { toast } = useToast();
  const [userDetails, setUserDetails] = useState({});

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "https://competiboardbackend.onrender.com/api/user_details/",
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
        console.error("Error fetching user details:", error);
      }
    };

    if (user?.id) fetchUserDetails();
  }, [user]);

  // Fetch board details on component mount or when user/id changes
  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(
          "https://competiboardbackend.onrender.com/api/board_details/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ board_id: id, clerk_id: user?.id }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch board details");

        const result = await response.json();
        if (result.data) {
          setSettings((prev) => ({
            ...prev,
            ...result.data.display, // Update fields from the response
          }));
        }
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    if (id && user?.id) fetchBoardDetails();
  }, [id, user]);

  // Handle input changes
  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  // Save settings to the backend
  const handleSave = async () => {
    const dataToSend = {
      settings: settings,
      board_id: id,
      clerk_id: user.id,
    };

    try {
      const response = await fetch(
        "https://competiboardbackend.onrender.com/api/update_display/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) throw new Error("Failed to save settings");

      toast({
        title: "Board Updated",
        description: "Good Progress!",
        action: (
          <ToastAction
            onClick={() => window.open(`/live/${id}/`, "_blank")}
            altText="Close"
          >
            View Board
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg pt-12 font-dm w-4/5">
      <div>
        <h2 className="text-3xl font-medium mb-4">Display Settings</h2>
        <div className="mb-6 bg-light_coral/70 w-96 h-0.5" />

        <div className="grid grid-cols-2 gap-8">
          {/* Colors Section */}
          <div>
            <h3 className="text-2xl font-medium mb-4 flex items-center">
              Colors
              <span className="text-base text-neutral-700 ml-4">
                (Hex Codes - #000000)
              </span>
            </h3>
            {[
              "borders",
              "boardBackground",
              "pageBackground",
              "titleColor",
              "subtitleColor",
              "dateRange",
              "tableHeaders",
              "ranks",
              "rankingField",
              "nameField",
            ].map((field) => (
              <div key={field} className="flex items-center mt-4">
                <div className="rounded-full size-2 bg-gold" />
                <label className="block font-medium pl-2 pr-4 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  className="w-1/3 p-2 rounded-md bg-neutral-100 focus:bg-white"
                  type="text"
                  value={settings[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Text and Fonts Section */}
          <div>
            <h3 className="text-2xl font-medium mb-4">Text</h3>
            {["title", "subtitle", "rankingTitle", "nameTitle"].map((field) => (
              <div key={field} className="flex items-center mt-4">
                <div className="rounded-full size-2 bg-gold" />
                <label className="block font-medium pl-2 pr-4 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  className="w-1/2 p-2 rounded-md bg-neutral-100 focus:bg-white"
                  type="text"
                  value={settings[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            ))}

            {/* Fonts Section */}
            <h4 className="text-2xl font-medium mt-12 mb-4 flex items-center">
              Fonts
              <span className="text-base text-neutral-700 ml-4">
                (Leave blank for default)
              </span>
            </h4>
            <div className="relative">
              {userDetails.plan !== "pro" && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <a
                    href="/checkout"
                    className="px-4 py-2 bg-light_coral text-white rounded-md hover:bg-light_coral/80 transition duration-200"
                  >
                    Upgrade to Pro
                  </a>
                </div>
              )}
              {[
                "titleFont",
                "subtitleFont",
                "boardRankTitleFont",
                "boardRankFont",
                "boardNameTitleFont",
                "boardNameFont",
              ].map((field) => (
                <div key={field} className="flex items-center mt-4">
                  <div className="rounded-full size-2 bg-gold" />
                  <label className="block font-medium pl-2 pr-4 capitalize">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace("board ", "")
                      .trim()}
                    :
                  </label>
                  <input
                    className="w-1/2 p-2 rounded-md bg-neutral-100 focus:bg-white"
                    type="text"
                    placeholder="e.g., 'Roboto', sans-serif"
                    value={settings[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    disabled={userDetails.plan !== "pro"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-10 px-6 py-2 bg-light_coral text-white rounded-md hover:bg-light_coral/80 transition duration-200"
        >
          Save Display
        </button>
      </div>
    </div>
  );
};

export default DisplaySettings;
