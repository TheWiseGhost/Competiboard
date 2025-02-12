"use client";

import React, { useEffect, useState } from "react";

const medals = ["🥇", "🥈", "🥉"];

const PublicBoard = ({ board }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [last30DaysLeaderboard, setLast30DaysLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/public_board_details/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board: board }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch board details");

        const result = await response.json();
        if (result.data) {
          setSettings((prev) => ({ ...prev, ...result.data.display }));
          console.log("All settings:", result.data.display);
          console.log("Font family value:", result.data.display.boardNameFont);
        }
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/public_generate_leaderboard/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board: board }),
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

    const fetchLast30DaysLeaderboard = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/public_generate_30_days_leaderboard/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ board: board }),
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(
            data.error || "Failed to fetch last 30 days leaderboard"
          );

        setLast30DaysLeaderboard(data.leaderboard || []);
      } catch (err) {
        console.error("Error fetching last 30 days leaderboard:", err);
      }
    };

    fetchBoardDetails();
    fetchLeaderboard();
    fetchLast30DaysLeaderboard();
  }, []);

  if (loading)
    return (
      <div className="text-center text-gray-500">Loading leaderboard...</div>
    );
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div
      className="w-full px-20 min-h-screen pt-12 pb-20"
      style={{
        backgroundColor: settings.pageBackground,
      }}
    >
      <h2
        className="text-5xl font-bold mb-4 text-left"
        style={{
          color: settings.titleColor,
          fontFamily: settings.titleFont,
        }}
      >
        {settings.title}
      </h2>
      <p
        className="text-left text-lg mb-4"
        style={{
          color: settings.subtitleColor,
          fontFamily: settings.subtitleFont,
        }}
      >
        {settings.subtitle}
      </p>

      <div className="flex flex-row w-full space-x-12">
        <div className="overflow-x-auto w-1/2">
          <h2
            className="pb-4 pt-6 text-xl font-mon font-bold text-gray"
            style={{ color: settings.dateRange }}
          >
            All-time
          </h2>
          <div
            className="overflow-x-auto w-full rounded-2xl p-4"
            style={{
              border: `1px solid ${settings.borders}`,
              backgroundColor: settings.boardBackground,
            }}
          >
            <table className="w-full border-none">
              <thead>
                <tr
                  className="border-none uppercase"
                  style={{ color: settings.tableHeaders }}
                >
                  <th className="py-2 px-4 w-1/6 font-medium text-sm text-center font-dm">
                    Rank
                  </th>
                  <th
                    style={{
                      fontFamily: settings.boardNameTitleFont,
                    }}
                    className="py-2 px-4 w-1/2 font-medium text-left text-sm"
                  >
                    {settings.nameTitle}
                  </th>
                  <th
                    className="py-2 px-4 w-1/3 font-medium text-left text-sm"
                    style={{
                      fontFamily: settings.boardRankTitleFont,
                    }}
                  >
                    {settings.rankingTitle}
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {leaderboard.map(([name, score], index) => (
                  <tr key={index} className="border-none">
                    <td className="py-4 px-4 w-1/6 text-center">
                      {index < 3 ? (
                        <p className="text-3xl">{medals[index]}</p>
                      ) : (
                        <p
                          className="text-xl text-center font-afc"
                          style={{ color: settings.ranks }}
                        >
                          {index + 1}
                        </p>
                      )}
                    </td>
                    <td
                      className="py-4 px-4 w-1/2 text-xl font-afc font-semibold"
                      style={{
                        color: settings.nameField,
                        fontFamily: settings.boardNameFont,
                      }}
                    >
                      {name}
                    </td>
                    <td
                      className="py-4 px-4 w-1/3 text-left text-xl font-afc font-semibold"
                      style={{
                        color: settings.rankingField,
                        fontFamily: settings.boardRankFont,
                      }}
                    >
                      {score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-x-auto w-1/2">
          <h2
            className="pb-4 pt-6 text-xl font-mon font-bold text-gray"
            style={{ color: settings.dateRange }}
          >
            Last 30 Days
          </h2>
          <div
            className="overflow-x-auto w-full rounded-2xl p-4"
            style={{
              border: `1px solid ${settings.borders}`,
              backgroundColor: settings.boardBackground,
            }}
          >
            <table className="w-full border-none">
              <thead>
                <tr
                  className="border-none uppercase"
                  style={{ color: settings.tableHeaders }}
                >
                  <th className="py-2 px-4 w-1/6 font-medium text-sm text-center font-dm">
                    Rank
                  </th>
                  <th
                    style={{
                      fontFamily: settings.boardNameTitleFont,
                    }}
                    className="py-2 px-4 w-1/2 font-medium text-left text-sm"
                  >
                    {settings.nameTitle}
                  </th>
                  <th
                    className="py-2 px-4 w-1/3 font-medium text-left text-sm"
                    style={{
                      fontFamily: settings.boardRankTitleFont,
                    }}
                  >
                    {settings.rankingTitle}
                  </th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {last30DaysLeaderboard.map(([name, score], index) => (
                  <tr key={index} className="border-none">
                    <td className="py-4 px-4 w-1/6 text-center">
                      {index < 3 ? (
                        <p className="text-3xl">{medals[index]}</p>
                      ) : (
                        <p
                          className="text-xl text-center font-afc"
                          style={{ color: settings.ranks }}
                        >
                          {index + 1}
                        </p>
                      )}
                    </td>
                    <td
                      className="py-4 px-4 w-1/2 text-xl font-afc font-semibold"
                      style={{
                        color: settings.nameField,
                        fontFamily: settings.boardNameFont,
                      }}
                    >
                      {name}
                    </td>
                    <td
                      className="py-4 px-4 w-1/3 text-left text-xl font-afc font-semibold"
                      style={{
                        color: settings.rankingField,
                        fontFamily: settings.boardRankFont,
                      }}
                    >
                      {score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicBoard;
