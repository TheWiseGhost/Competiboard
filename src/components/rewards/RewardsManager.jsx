"use client";

import { useState, useEffect } from "react";
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
import { useUser } from "@clerk/nextjs";
import { ToastAction } from "../global/Toast";
import { useToast } from "../global/Use-Toast";

const RewardsManager = ({ id }) => {
  const [emailContent, setEmailContent] = useState("");
  const [emailField, setEmailField] = useState("");
  const [timeRange, setTimeRange] = useState("30");
  const [minRank, setMinRank] = useState(1);
  const [maxRank, setMaxRank] = useState(3);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const [userDetails, setUserDetails] = useState({});
  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user_details/",
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

  useEffect(() => {
    const fetchRewardDetails = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/reward_details/",
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
          console.log(result.data);
          setEmailContent(result.data.email_body);
          setEmailField(result.data.email_field);
        }
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    if (id && user?.id) fetchRewardDetails();
  }, [id, user]);

  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/update_reward/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board_id: id,
          clerk_id: user?.id,
          email_body: emailContent,
          email_field: emailField,
        }),
      });
      if (!response.ok) throw new Error("Failed to save rewards");
      toast({
        title: `Rewards Updated`,
        description: "Good Progress =)",
        action: (
          <ToastAction onClick={() => {}} altText="Close">
            Close
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: `Failed to save Rewards`,
        description: "Reload or contact support",
        action: (
          <ToastAction onClick={() => {}} altText="Close">
            Close
          </ToastAction>
        ),
      });
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
      const response = await fetch("http://127.0.0.1:8000/api/send_rewards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          board_id: id,
          clerk_id: user?.id,
          time: timeRange,
          min_rank: minRank,
          max_rank: maxRank,
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
    <div className="bg-white rounded-lg font-dm pt-12 h-screen relative">
      {user && userDetails.plan !== "pro" && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-row justify-center">
          <div className="flex flex-col items-center justify-center gap-3 w-fit">
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
        </div>
      )}
      <h2 className="text-3xl font-medium">Rewards Settings</h2>
      <div className="mt-4 mb-8 bg-light_coral/70 w-96 h-0.5" />

      <div className="space-y-6 mb-8">
        <div className="flex flex-row items-center mb-4">
          <div className="rounded-full size-2 bg-gold" />
          <label className="block text-lg font-medium pl-2 pr-4">
            Email Field:
          </label>
          <input
            type="email"
            value={emailField}
            onChange={(e) => setEmailField(e.target.value)}
            className="w-80 p-3 rounded-md bg-neutral-100 focus:bg-white"
            placeholder="email"
          />
        </div>

        <div>
          <label className="flex flex-row items-center text-lg font-medium text-black mb-2">
            <div className="rounded-full size-2 mr-2 bg-gold" />
            Email Content
          </label>
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            className="w-3/5 p-3 border rounded-lg"
            rows="5"
            placeholder="Enter email content... (like discount codes or nice messages or etc)"
          />
        </div>
      </div>

      <div className="flex gap-12 pt-4">
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-light_coral text-white rounded-md hover:bg-light_coral/80 transition duration-200"
        >
          Save Rewards
        </button>

        <Drawer>
          <DrawerTrigger>
            <span className="px-5 py-2 bg-black text-white rounded-md hover:bg-gold transition duration-300">
              Send Rewards
            </span>
          </DrawerTrigger>
          <DrawerContent>
            <div className="h-fit w-2/5 flex flex-col mx-auto min-h-96 pb-4">
              <div className="mx-auto h-2 rounded-2xl bg-neutral-200 w-1/5"></div>
              <DrawerHeader>
                <DrawerTitle className="font-euclid font-semibold text-5xl text-black">
                  Send Rewards
                  <span className="text-red-500 text-6xl">.</span>
                </DrawerTitle>
              </DrawerHeader>

              <div className="p-4 space-y-6 font-dm">
                <div>
                  <h3 className="text-lg font-medium mb-3">Time Range</h3>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="30"
                        checked={timeRange === "30"}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="w-4 h-4"
                      />
                      Last 30 Days
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="all"
                        checked={timeRange === "all"}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="w-4 h-4"
                      />
                      All Time
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex flex-row items-center">
                    Rank Range{" "}
                    <span className="text-gray-700 text-sm pl-2">
                      (Inclusive)
                    </span>
                    <span className="text-gray-700 text-sm pl-2">
                      (Send to these ranks)
                    </span>
                  </h3>
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
                      I confirm that I want to send these reward emails
                    </span>
                  </label>
                </div>
              </div>

              <DrawerFooter>
                <DrawerClose>
                  <span
                    onClick={handleSend}
                    disabled={!isConfirmed}
                    className="bg-light_coral font-dm w-4/5 mx-auto text-white hover:bg-light_coral/80 transition duration-200 inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Confirm and Send
                  </span>
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
