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

  // Fetch board details on component mount or when user/id changes
  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/board_details/",
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
        "http://127.0.0.1:8000/api/update_display/",
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
        description: "Your display settings have been saved!",
        action: (
          <ToastAction onClick={() => {}} altText="Close">
            Close
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
            <h3 className="text-2xl font-medium mb-4">Colors</h3>
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
            <h4 className="text-2xl font-medium mt-8 mb-4">Fonts</h4>
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
                />
              </div>
            ))}
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
