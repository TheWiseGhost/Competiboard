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

  const [userDetails, setUserDetails] = useState({});

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
          setUserDetails(result.user_details);
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
      className="w-full px-8 md:px-20 min-h-screen pt-12 pb-20"
      style={{
        backgroundColor: settings.pageBackground,
      }}
    >
      <h2
        className="text-5xl font-bold mb-4 text-left font-euclid"
        style={{
          color: settings.titleColor,
          fontFamily: settings.titleFont,
        }}
      >
        {settings.title}
      </h2>
      <p
        className="text-left text-lg mb-4 font-dm"
        style={{
          color: settings.subtitleColor,
          fontFamily: settings.subtitleFont,
        }}
      >
        {settings.subtitle}
      </p>

      <div className="flex flex-col md:flex-row w-full md:space-x-16">
        <div className="overflow-x-auto w-full md:w-1/2">
          <h2
            className="pb-4 pt-6 text-xl font-mon font-bold text-gray"
            style={{ color: settings.dateRange }}
          >
            All-time
          </h2>
          <div
            className="overflow-x-auto w-full rounded-2xl p-4 relative"
            style={{
              border: `1px solid ${settings.borders}`,
              backgroundColor: settings.boardBackground,
            }}
          >
            {userDetails.plan !== "pro" && (
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-10 flex flex-col md:hidden items-center justify-start pt-12 gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <p
                  href="/checkout"
                  className="px-4 py-2 bg-light_coral text-white rounded-md w-fit font-dm"
                >
                  This board doesn't support mobile
                </p>
              </div>
            )}
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
                    className="py-2 px-4 w-1/2 font-medium text-left text-sm font-dm"
                  >
                    {settings.nameTitle}
                  </th>
                  <th
                    className="py-2 px-4 w-1/3 font-medium text-left text-sm font-dm"
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

        <div className="overflow-x-auto w-full md:w-1/2">
          <h2
            className="pb-4 pt-6 text-xl font-mon font-bold text-gray"
            style={{ color: settings.dateRange }}
          >
            Last 30 Days
          </h2>
          <div
            className="overflow-x-auto w-full rounded-2xl p-4 relative"
            style={{
              border: `1px solid ${settings.borders}`,
              backgroundColor: settings.boardBackground,
            }}
          >
            {userDetails.plan !== "pro" && (
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-10 flex flex-col md:hidden items-center justify-start pt-12 gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <p
                  href="/checkout"
                  className="px-4 py-2 bg-light_coral text-white rounded-md w-fit font-dm"
                >
                  This board doesn't support mobile
                </p>
              </div>
            )}
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
                    className="py-2 px-4 w-1/2 font-medium text-left text-sm font-dm"
                  >
                    {settings.nameTitle}
                  </th>
                  <th
                    className="py-2 px-4 w-1/3 font-medium text-left text-sm font-dm"
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
