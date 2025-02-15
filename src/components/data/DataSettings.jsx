"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ToastAction } from "../global/Toast";
import { useToast } from "../global/Use-Toast";

const DataSettings = ({ id }) => {
  const [filterFields, setFilterFields] = useState({
    filterIn: "",
    filterOut: "",
  });

  const [dateSettings, setDateSettings] = useState({
    dateField: "",
    dateFormat: "",
    tabs: ["Daily", "Monthly", "Yearly", "All-Time"],
    selectedTabs: [],
  });

  const [selectedMethod, setSelectedMethod] = useState("Doc Sum");

  const [sumFields, setSumFields] = useState({
    sumField: "",
    displayField: "",
  });

  const [classicFields, setClassicFields] = useState({
    valueField: "",
    displayField: "",
  });

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
    const fetchDataDetails = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/data_details/",
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

        if (result.data) {
          // Merge filter settings with defaults
          setFilterFields({
            filterIn: "",
            filterOut: "",
            ...(result.data.filter_settings || {}),
          });

          // Set date settings with individual field checks
          setDateSettings({
            dateField: result.data.date_settings?.dateField || "",
            dateFormat: result.data.date_settings?.dateFormat || "",
            tabs: ["Daily", "Monthly", "Yearly", "All-Time"],
            selectedTabs: result.data.date_settings?.selectedTabs || [],
          });

          setSelectedMethod(result.data.method || "Doc Sum");

          // Merge sum fields with defaults if method is Doc Sum
          setSumFields({
            sumField: "",
            displayField: "",
            ...(result.data.method === "Doc Sum" ? result.data.expression : {}),
          });

          // Merge classic fields with defaults if method is Classic
          setClassicFields({
            valueField: "",
            displayField: "",
            ...(result.data.method === "Classic" ? result.data.expression : {}),
          });
        }
      } catch (error) {
        console.error("Error fetching data details:", error);
      }
    };

    if (id && user?.id) fetchDataDetails();
  }, [id, user]);

  const handleFilterChange = (field, value) => {
    setFilterFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateFieldChange = (value) => {
    setDateSettings((prev) => ({ ...prev, dateField: value }));
  };

  const handleDateFormatChange = (value) => {
    setDateSettings((prev) => ({ ...prev, dateFormat: value }));
  };

  const toggleTab = (tab) => {
    setDateSettings((prev) => ({
      ...prev,
      selectedTabs: prev.selectedTabs.includes(tab)
        ? prev.selectedTabs.filter((t) => t !== tab)
        : [...prev.selectedTabs, tab],
    }));
  };

  const handleSumFieldChange = (field, value) => {
    setSumFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleClassicFieldChange = (field, value) => {
    setClassicFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const dataToSend = {
      filter_settings: filterFields,
      date_settings: dateSettings,
      method: selectedMethod,
      expression: selectedMethod === "Doc Sum" ? sumFields : classicFields,
      clerk_id: user.id,
      board_id: id,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/update_data_settings/",
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
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg pt-16 font-dm">
      <h2 className="text-3xl font-medium">Board Data Settings</h2>
      <div className="mt-4 mb-8 bg-light_coral/70 w-96 h-0.5" />

      {/* Filter Settings */}
      <div className="grid grid-cols-2 pr-32">
        <div>
          <h3 className="text-2xl font-medium mb-4">Filter Settings</h3>
          <div className="relative">
            {userDetails.plan !== "pro" && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-row items-center justify-start">
                <div className="flex flex-col items-center justify-center gap-3 w-fit pt-10">
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
            {
              <>
                <div className="flex flex-row items-center mt-4">
                  <div className="rounded-full size-2 bg-gold" />
                  <label className="block font-medium pl-2 pr-4">
                    Filter In Field:
                  </label>
                  <input
                    className="w-1/2 p-2 rounded-md bg-neutral-100 focus:bg-white"
                    type="text"
                    value={filterFields.filterIn}
                    onChange={(e) =>
                      handleFilterChange("filterIn", e.target.value)
                    }
                    placeholder="'username'=='Aditya Byju'"
                  />
                </div>
                <div className="flex flex-row items-center mt-4">
                  <div className="rounded-full size-2 bg-gold" />
                  <label className="block font-medium pl-2 pr-4">
                    Filter Out Field:
                  </label>
                  <input
                    className="w-1/2 p-2 rounded-md bg-neutral-100 focus:bg-white"
                    type="text"
                    value={filterFields.filterOut}
                    onChange={(e) =>
                      handleFilterChange("filterOut", e.target.value)
                    }
                    placeholder="'username'=='Aditya Byju'"
                  />
                </div>
              </>
            }
          </div>
        </div>

        {/* Date Settings */}
        <div>
          <h3 className="text-2xl items-center flex font-medium mb-4">
            Date Settings
          </h3>
          <div className="flex flex-row items-center mt-4">
            <div className="rounded-full size-2 bg-gold" />
            <label className="block font-medium pl-2 pr-4">Date Field:</label>
            <input
              className="w-1/2 p-2 rounded-md bg-neutral-100 focus:bg-white"
              type="text"
              value={dateSettings.dateField}
              onChange={(e) => handleDateFieldChange(e.target.value)}
              placeholder="created_at"
            />
          </div>
          <div className="flex flex-row items-center mt-4">
            <div className="rounded-full size-2 bg-gold" />
            <label className="block font-medium pl-2 pr-4">Date Format:</label>
            <input
              className="w-1/2 p-2 rounded-md bg-neutral-100 focus:bg-white"
              type="text"
              value={dateSettings.dateFormat}
              onChange={(e) => handleDateFormatChange(e.target.value)}
              placeholder="MM/DD/YY"
            />
          </div>
          <div className="flex flex-row items-center mt-4 mb-2">
            <div className="rounded-full size-2 bg-gold" />
            <label className="block font-medium pl-2">
              Include Tabs:
              <span className="text-base text-neutral-700 ml-4">
                (Under development)
              </span>
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {dateSettings.tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1 rounded-md border ${
                  dateSettings.selectedTabs.includes(tab)
                    ? "border-light_coral"
                    : "bg-neutral-100 border-neutral-100 "
                }`}
                onClick={() => toggleTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Method Selection */}
      <div className="">
        <h3 className="text-2xl font-medium mb-2">Method:</h3>
        <div className="flex gap-4">
          {["Doc Sum", "Classic"].map((method) => (
            <button
              key={method}
              className={`px-6 py-2 rounded-md ${
                selectedMethod === method
                  ? "border-light_coral border-2"
                  : "bg-neutral-100"
              }`}
              onClick={() => setSelectedMethod(method)}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Field Sum Inputs */}
      {selectedMethod === "Doc Sum" ? (
        <div className="mt-10 flex flex-wrap gap-y-6 gap-x-4 pr-80 items-center">
          <p className="text-base font-medium">
            Grab all filtered documents/rows and sum field:
          </p>
          <input
            type="text"
            className="p-3 rounded-md bg-neutral-100 focus:bg-white"
            placeholder="views"
            value={sumFields.sumField}
            onChange={(e) => handleSumFieldChange("sumField", e.target.value)}
          />
          <p className="text-base font-medium">
            and use it to sort rows. For each row, make the display field:
          </p>
          <input
            type="text"
            className="p-3 rounded-md bg-neutral-100 focus:bg-white"
            placeholder="username"
            value={sumFields.displayField}
            onChange={(e) =>
              handleSumFieldChange("displayField", e.target.value)
            }
          />
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap gap-y-6 gap-x-4 pr-80 items-center">
          <p className="text-base font-medium">
            Grab all filtered documents and take value field:
          </p>
          <input
            type="text"
            className="p-3 rounded-md bg-neutral-100 focus:bg-white"
            placeholder="views"
            value={classicFields.valueField}
            onChange={(e) =>
              handleClassicFieldChange("valueField", e.target.value)
            }
          />
          <p className="text-base font-medium">
            and use it to sort rows. For each row, make the display field:
          </p>
          <input
            type="text"
            className="p-3 rounded-md bg-neutral-100 focus:bg-white"
            placeholder="username"
            value={classicFields.displayField}
            onChange={(e) =>
              handleClassicFieldChange("displayField", e.target.value)
            }
          />
        </div>
      )}
      <div>
        <button
          onClick={handleSubmit}
          className="mt-8 px-6 py-2 bg-light_coral text-white rounded-md hover:bg-light_coral/80 transition duration-200"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default DataSettings;
