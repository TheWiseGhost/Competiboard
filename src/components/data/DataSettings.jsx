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
          setFilterFields(
            result.data.filter_settings || { filterIn: "", filterOut: "" }
          );
          setDateSettings({
            dateFormat: result.data.date_settings?.dateFormat || "",
            tabs: ["Daily", "Monthly", "Yearly", "All-Time"],
            selectedTabs: result.data.date_settings?.selectedTabs || [],
          });
          setSelectedMethod(result.data.method || "Doc Sum");
          setSumFields(
            result.data.method === "Doc Sum"
              ? result.data.expression || {
                  sumField: "",
                  displayField: "",
                }
              : { sumField: "", displayField: "" }
          );
          setClassicFields(
            result.data.method === "Classic"
              ? result.data.expression || {
                  valueField: "",
                  displayField: "",
                }
              : { valueField: "", displayField: "" }
          );
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

  const handleDateChange = (value) => {
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
      <div className="mt-4 mb-8 bg-light_coral/30 w-80 h-0.5" />

      {/* Filter Settings */}
      <div className="grid grid-cols-2 pr-32">
        <div>
          <h3 className="text-2xl font-medium mb-4">Filter Settings</h3>
          <div className="flex flex-row items-center mt-4">
            <div className="rounded-full size-2 bg-coral" />
            <label className="block font-medium pl-2 pr-4">
              Filter In Field:
            </label>
            <input
              className="w-1/2 p-2 rounded-md bg-light_vanilla focus:bg-white"
              type="text"
              value={filterFields.filterIn}
              onChange={(e) => handleFilterChange("filterIn", e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center mt-4">
            <div className="rounded-full size-2 bg-coral" />
            <label className="block font-medium pl-2 pr-4">
              Filter Out Field:
            </label>
            <input
              className="w-1/2 p-2 rounded-md bg-light_vanilla focus:bg-white"
              type="text"
              value={filterFields.filterOut}
              onChange={(e) => handleFilterChange("filterOut", e.target.value)}
            />
          </div>
        </div>

        {/* Date Settings */}
        <div>
          <h3 className="text-2xl font-medium mb-4">Date Settings</h3>
          <div className="flex flex-row items-center mt-4">
            <div className="rounded-full size-2 bg-coral" />
            <label className="block font-medium pl-2 pr-4">Date Format:</label>
            <input
              className="w-1/2 p-2 rounded-md bg-light_vanilla focus:bg-white"
              type="text"
              value={dateSettings.dateFormat}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center mt-4 mb-2">
            <div className="rounded-full size-2 bg-coral" />
            <label className="block font-medium pl-2">Include Tabs:</label>
          </div>

          <div className="flex flex-wrap gap-2">
            {dateSettings.tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1 rounded-md border ${
                  dateSettings.selectedTabs.includes(tab)
                    ? "border-coral"
                    : "bg-light_vanilla border-light_vanilla "
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
      <div className="mt-12">
        <h3 className="text-2xl font-medium mb-2">Method:</h3>
        <div className="flex gap-4">
          {["Doc Sum", "Classic"].map((method) => (
            <button
              key={method}
              className={`px-6 py-2 rounded-md ${
                selectedMethod === method
                  ? "border-coral border-2"
                  : "bg-light_vanilla"
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
          <p className="text-lg font-medium">Grab all documents and sum</p>
          <input
            type="text"
            className="p-3 rounded-md bg-light_vanilla focus:bg-white"
            placeholder="Sum field"
            value={sumFields.sumField}
            onChange={(e) => handleSumFieldChange("sumField", e.target.value)}
          />
          <p className="text-lg font-medium">and store it for:</p>
          <input
            type="text"
            className="p-3 rounded-md bg-light_vanilla focus:bg-white"
            placeholder="Display field"
            value={sumFields.displayField}
            onChange={(e) =>
              handleSumFieldChange("displayField", e.target.value)
            }
          />
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap gap-y-6 gap-x-4 pr-80 items-center">
          <p className="text-lg font-medium">Take value field</p>
          <input
            type="text"
            className="p-3 rounded-md bg-light_vanilla focus:bg-white"
            placeholder="Value field"
            value={classicFields.valueField}
            onChange={(e) =>
              handleClassicFieldChange("valueField", e.target.value)
            }
          />
          <p className="text-lg font-medium">and store it for:</p>
          <input
            type="text"
            className="p-3 rounded-md bg-light_vanilla focus:bg-white"
            placeholder="Display field"
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
          className="mt-8 px-6 py-2 bg-coral text-white rounded-md hover:bg-coral/80 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default DataSettings;
