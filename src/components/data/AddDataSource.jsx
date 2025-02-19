"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ToastAction } from "../global/Toast";
import { useToast } from "../global/Use-Toast";

const AddDataSource = ({ id }) => {
  const [selectedSource, setSelectedSource] = useState("MongoDB");
  const [inputValues, setInputValues] = useState({
    MongoDB: { uri: "", database: "", collection: "" },
    Supabase: { url: "", anonKey: "", table: "" },
    Firebase: { apiKey: "", authDomain: "", projectId: "" },
    Sheet: { url: "" },
  });

  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        const response = await fetch(
          "https://competiboardbackend.onrender.com/api/data_details/",
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
          setSelectedSource(result.data.source || "MongoDB");

          // Merge fetched data with defaults for each source
          setInputValues((prev) => ({
            MongoDB: {
              uri: "",
              database: "",
              collection: "",
              ...(result.data.source === "MongoDB" ? result.data.api : {}),
            },
            Supabase: {
              url: "",
              anonKey: "",
              table: "",
              ...(result.data.source === "Supabase" ? result.data.api : {}),
            },
            Firebase: {
              apiKey: "",
              authDomain: "",
              projectId: "",
              ...(result.data.source === "Firebase" ? result.data.api : {}),
            },
            Sheet: {
              url: "",
              ...(result.data.source === "Sheet" ? result.data.api : {}),
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching data details:", error);
      }
    };

    if (id && user?.id) fetchDataDetails();
  }, [id, user]);

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [selectedSource]: {
        ...prev[selectedSource],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const dataToSend = {
      source: selectedSource,
      data: inputValues[selectedSource],
      board_id: id,
      clerk_id: user.id,
    };

    try {
      const response = await fetch(
        "https://competiboardbackend.onrender.com/api/update_data_source/",
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

  const renderAPIInputs = () => {
    return Object.keys(inputValues[selectedSource]).map((field) => (
      <div key={field} className="flex flex-row items-center mt-4">
        <div className="rounded-full size-2 bg-gold" />
        <label className="block font-medium pl-2 pr-4">
          {field.charAt(0).toUpperCase() + field.slice(1)}:
        </label>
        <input
          className="w-1/4 p-2 rounded-md bg-neutral-100 focus:bg-white"
          type="text"
          name={field}
          value={inputValues[selectedSource][field]}
          placeholder="Case Sensitive + No quotation marks"
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg font-dm pt-12">
      <h2 className="text-3xl font-medium">Add Data Source</h2>
      <p className="text-sm text-neutral-700 pt-2">
        Make sure DB network allows access for 76.76.21.21, 3.134.238.10,
        3.129.111.220, 52.15.118.168
      </p>
      <p className="text-sm text-neutral-700">
        Make sure to provide Publicly Viewable Url for sheet, format like
        https://docs.google.com/spreadsheets/d/1tJZXaDv0IZ9A0Tam23IoK3nU3G79gn6t8-bEYtvXQt0/{" "}
        <br />
        (notice how there is no ?edit params)
      </p>
      <div className="mt-4 mb-8 bg-light_coral/70 w-96 h-0.5" />

      <div className="mt-4 flex flex-row items-center space-x-4">
        <p className="font-medium">Source:</p>
        <div className="flex gap-6">
          {["MongoDB", "Supabase", "Firebase", "Sheet"].map((source) => (
            <button
              key={source}
              onClick={() => setSelectedSource(source)}
              className={`px-6 py-2 rounded-md ${
                selectedSource === source
                  ? "border-light_coral border-2"
                  : "bg-neutral-100"
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-12">
        <h3 className="text-2xl font-medium">API Keys and Info</h3>
        {renderAPIInputs()}
      </div>

      <button
        onClick={handleSave}
        className="mt-10 px-6 py-2 bg-light_coral text-white rounded-md hover:bg-light_coral/80 transition duration-200"
      >
        Save Source
      </button>
    </div>
  );
};

export default AddDataSource;
