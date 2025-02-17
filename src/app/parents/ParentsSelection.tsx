"use client";
import { useState } from "react";
import ConditionSelector from "@/components/ConditionSelector";
import { PhysResProps, Symptom } from "@/types";
import { SymptomSelector } from "./SymptomSelector";
import { useUserContext } from "@/contexts/UserContext";

const DailyPhysSelection = ({ symptoms }: { symptoms: Symptom[] }) => {
  const { userId } = useUserContext();
  console.log("userid in parents' selection", userId);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PhysResProps>({
    userId: userId,
    height: null,
    weight: null,
    hoursSlept: null,
    condition: null,
    symptoms: {},
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (condition: number | null) => {
    setFormData((prev) => ({ ...prev, condition }));
  };

  const handleSymptomChange = (symptom_id: number, severity: number) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [symptom_id]: severity,
      },
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.userId === null ||
      formData.userId === 0 ||
      isNaN(formData.userId)
    ) {
      setError("User ID is required and must be a valid number.");
      return;
    }

    try {
      console.log(formData);
      await fetch("/api/parents/sendphys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
        }),
      });

      // resets form - good spot for user feedback here
      setFormData({
        userId: null,
        height: null,
        weight: null,
        hoursSlept: null,
        condition: null,
        symptoms: {},
      });
      setError(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-full w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-500 p-2 rounded-xl items-center justify-evenly h-full"
      >
        <div className="w-full flex flex-col gap-2 items-center">
          <p className="m-0 p-0">Daily Measurements:</p>
          <input
            name="height"
            placeholder="Height in cm"
            type="text"
            value={formData.height ?? ""}
            onChange={handleInputChange}
          />
          <input
            name="weight"
            placeholder="Weight in kg"
            type="text"
            value={formData.weight ?? ""}
            onChange={handleInputChange}
          />
          <input
            name="hoursSlept"
            placeholder="Hours Slept"
            type="text"
            value={formData.hoursSlept ?? ""}
            onChange={handleInputChange}
          />
        </div>
        <ConditionSelector
          name="condition"
          value={formData.condition ?? null}
          onChange={handleConditionChange}
        />
        <SymptomSelector
          symptoms={symptoms}
          value={formData.symptoms ?? {}}
          onChange={handleSymptomChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="mt-2 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export { DailyPhysSelection };
