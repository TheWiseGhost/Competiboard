"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ToastAction } from "../global/Toast";
import { useToast } from "../global/Use-Toast";

const DisplaySettings = ({ id }) => {
  const [settings, setSettings] = useState({
    borders: "",
    background: "",
    primaryText: "",
    secondaryText: "",
    boardTitles: "",
    rankingField: "",
    nameField: "",
    title: "",
    subtitle: "",
    rankingTitle: "",
    nameText: "",
  });

  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDataDetails = async () => {
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

        if (!response.ok) throw new Error("Failed to fetch data details");

        const result = await response.json();
        console.log(result.data);

        if (result.data) {
          setSettings((prev) => ({
            ...prev,
            ...result.data.display, // Only update fields that exist in response
          }));
        }
      } catch (error) {
        console.error("Error fetching data details:", error);
      }
    };

    if (id && user?.id) fetchDataDetails();
  }, [id, user]);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

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

      if (!response.ok) throw new Error("Network response was not ok");

      toast({
        title: `Board Updated`,
        description: "Good Progress =)",
        action: (
          <ToastAction onClick={() => {}} altText="Close">
            Close
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg pt-12 font-dm w-4/5">
      <div>
        <h2 className="text-3xl font-medium mb-4">Display Settings</h2>
        <div className="mb-6 bg-light_coral/30 w-80 h-0.5" />

        <div className="grid grid-cols-2">
          {/* Colors Section */}
          <div>
            <h3 className="text-2xl font-medium mb-4">Colors:</h3>
            {[
              "borders",
              "background",
              "primaryText",
              "secondaryText",
              "boardTitles",
              "rankingField",
              "nameField",
            ].map((field) => (
              <div key={field} className="flex items-center mt-4">
                <div className="rounded-full size-2 bg-coral" />
                <label className="block font-medium pl-2 pr-4 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  className="w-1/3 p-2 rounded-md bg-light_vanilla focus:bg-white"
                  type="text"
                  value={settings[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Text Section */}
          <div>
            <h3 className="text-2xl font-medium mb-4">Text:</h3>
            {["title", "subtitle", "rankingTitle", "nameText"].map((field) => (
              <div key={field} className="flex items-center mt-4">
                <div className="rounded-full size-2 bg-coral" />
                <label className="block font-medium pl-2 pr-4 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                <input
                  className="w-1/2 p-2 rounded-md bg-light_vanilla focus:bg-white"
                  type="text"
                  value={settings[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-10 px-6 py-2 bg-coral text-white rounded-md hover:bg-coral/80 transition-colors"
      >
        Save Display
      </button>
    </div>
  );
};

export default DisplaySettings;
