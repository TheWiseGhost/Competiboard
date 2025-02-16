"use client";

import React from "react";
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

const RewardsManager = ({ id }) => {
  const [emailContent, setEmailContent] = React.useState("");
  const [emailField, setEmailField] = React.useState("");
  const [timeRange, setTimeRange] = React.useState("30");
  const [minRank, setMinRank] = React.useState(1);
  const [maxRank, setMaxRank] = React.useState(3);
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/save_rewards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          emailContent,
          emailField,
        }),
      });
      if (!response.ok) throw new Error("Failed to save rewards");
      alert("Rewards saved successfully!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save rewards");
    }
  };

  const handleSend = async () => {
    if (!isConfirmed) {
      alert("Please confirm before sending");
      return;
    }
    if (minRank > maxRank) {
      alert("Invalid rank range");
      return;
    }

    try {
      const response = await fetch("/api/send_rewards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          timeRange,
          minRank,
          maxRank,
        }),
      });
      if (!response.ok) throw new Error("Failed to send rewards");
      alert("Rewards sent successfully!");
    } catch (error) {
      console.error("Send error:", error);
      alert("Failed to send rewards");
    }
  };

  return (
    <div className="bg-white rounded-lg font-dm pt-12 h-screen">
      <h2 className="text-3xl font-medium">Rewards Settings</h2>
      <div className="mt-4 mb-8 bg-light_coral/70 w-96 h-0.5" />

      <div className="space-y-6 mb-8">
        <div>
          <label className="flex flex-row items-center text-base font-medium text-black mb-2">
            <div className="rounded-full size-2 mr-2 bg-gold" />
            Email Content
          </label>
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="w-3/5 p-3 border rounded-lg"
            rows="5"
            placeholder="Enter email content..."
          />
        </div>

        <div className="flex flex-row items-center mt-4">
          <div className="rounded-full size-2 bg-gold" />
          <label className="block font-medium pl-2 pr-4">Email Field:</label>
          <input
            type="email"
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
            className="w-80 p-3 rounded-md bg-neutral-100 focus:bg-white"
            placeholder="email"
          />
        </div>
      </div>

      <div className="flex gap-20">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-light_coral text-white rounded-md hover:bg-light_coral/80 transition duration-200"
        >
          Save Rewards
        </button>

        <Drawer>
          <DrawerTrigger>
            <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gold transition duration-200">
              Send Rewards
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="h-fit w-2/5 flex flex-col mx-auto min-h-96 pb-4">
              <div className="mx-auto h-2 rounded-2xl bg-neutral-200 w-1/5"></div>
              <DrawerHeader>
                <DrawerTitle className="font-euclid font-semibold text-4xl text-black pt-4">
                  Send Rewards
                  <span className="text-red-500 text-5xl">.</span>
                </DrawerTitle>
              </DrawerHeader>

              <div className="p-4 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Time Range</h3>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="30"
                        checked={timeRange === "30"}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="w-4 h-4 text-light_coral"
                      />
                      Last 30 Days
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="all"
                        checked={timeRange === "all"}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="w-4 h-4 text-light_coral"
                      />
                      All Time
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Rank Range</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={minRank}
                      onChange={(e) => setMinRank(Number(e.target.value))}
                      className="w-20 p-2 border rounded-lg"
                      min="1"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={maxRank}
                      onChange={(e) => setMaxRank(Number(e.target.value))}
                      className="w-20 p-2 border rounded-lg"
                      min={minRank}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                      className="w-4 h-4 text-light_coral rounded"
                    />
                    <span className="text-sm text-gray-700">
                      I confirm that I want to send these rewards
                    </span>
                  </label>
                </div>
              </div>

              <DrawerFooter>
                <DrawerClose>
                  <button
                    onClick={handleSend}
                    disabled={!isConfirmed}
                    className="bg-light_coral font-dm w-4/5 mx-auto text-white hover:bg-light_coral/80 transition duration-200 inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Confirm and Send
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default RewardsManager;
