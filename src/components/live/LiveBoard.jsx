"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const medals = ["🥇", "🥈", "🥉"];

const LiveBoard = ({ id }) => {
  const { user } = useUser();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    borders: "#d1d1d1",
    background: "#f9f9f9",
    primaryText: "#333333",
    secondaryText: "#555555",
    boardTitles: "#4a90e2",
    rankingField: "#e94e77",
    nameField: "#f39c12",
    title: "NoteSlide Views",
    subtitle: "Who has the most views?",
    rankingTitle: "Views",
    nameText: "Username",
  });

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/board_details/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board_id: id, clerk_id: user?.id }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch board details");

        const result = await response.json();
        if (result.data) {
          setSettings((prev) => ({ ...prev, ...result.data.display }));
        }
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    const fetchLeaderboard = async () => {
      if (!user || !id) return;
      setLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/generate_leaderboard/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board_id: id, clerk_id: user.id }),
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch leaderboard");

        setLeaderboard(data.leaderboard || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.id) {
      fetchBoardDetails();
      fetchLeaderboard();
    }
  }, [id, user]);

  if (loading)
    return (
      <div className="text-center text-gray-500">Loading leaderboard...</div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div
      className="p-4 shadow-lg rounded-xl w-1/2"
      style={{
        backgroundColor: settings.background,
        border: `1px solid ${settings.borders}`,
      }}
    >
      <h2
        className="text-xl font-bold text-center mb-2"
        style={{ color: settings.boardTitles }}
      >
        {settings.title}
      </h2>
      <p className="text-center mb-4" style={{ color: settings.secondaryText }}>
        {settings.subtitle}
      </p>

      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse"
          style={{ border: `1px solid ${settings.borders}` }}
        >
          <thead>
            <tr
              style={{ backgroundColor: settings.primaryText, color: "#fff" }}
            >
              <th
                className="p-2 text-left"
                style={{ borderBottom: `1px solid ${settings.borders}` }}
              >
                {settings.nameText}
              </th>
              <th
                className="p-2 text-right"
                style={{ borderBottom: `1px solid ${settings.borders}` }}
              >
                {settings.rankingTitle}
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(([name, score], index) => (
              <tr
                key={index}
                style={{ borderBottom: `1px solid ${settings.borders}` }}
              >
                <td
                  className="p-2 flex items-center"
                  style={{ color: settings.nameField }}
                >
                  {index < 3 ? (
                    <span className="mr-2">{medals[index]}</span>
                  ) : null}
                  {name}
                </td>
                <td
                  className="p-2 text-right"
                  style={{ color: settings.rankingField }}
                >
                  {score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveBoard;
