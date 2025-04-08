"use client";
import { useState } from "react";
import ConditionSelector from "@/components/ConditionSelector";
import { PhysResProps, Symptom } from "@/types";
import { SymptomSelector } from "./SymptomSelector";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ParentsSelection = ({ symptoms }: { symptoms: Symptom[] }) => {
  const { data: session } = useSession();
  const childName = session?.user?.childname ?? null;
  const userId = session?.user?.userId ?? null;
  const [dataSent, setDataSent] = useState<boolean>(false);

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
      setError("No User ID Found - Please log in again.");
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

      setFormData({
        userId: null,
        height: null,
        weight: null,
        hoursSlept: null,
        condition: null,
        symptoms: {},
      });
      setError(null);
      setDataSent(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const inputClasses =
    "text-center w-full py-6 bg-white rounded-lg border-1 border-black";

  return (
    <div className="relative h-full w-full font-bold font-mono md:text-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-2 items-center justify-evenly h-full"
      >
        <div className="w-full min-h-1/4 flex flex-col justify-evenly">
          <div className="w-full flex-col flex justify-evenly">
            <h1 className="px-4 bg-parent-bg rounded-t-2xl w-fit">
              Daily Measurements:
            </h1>
            <div className="bg-parent-bg rounded-b-xl rounded-tr-xl pb-1 p-2 shadow-[2px_2px_1px_rgba(0,0,0,5)]">
              <div className="w-full flex gap-2">
                <div className="flex flex-col text-center flex-1">
                  <input
                    className={inputClasses}
                    name="height"
                    placeholder="Height (cm)"
                    type="text"
                    value={formData.height ?? ""}
                    onChange={handleInputChange}
                  />
                  <p>cm</p>
                </div>
                <div className="flex flex-col text-center flex-1">
                  <input
                    className={inputClasses}
                    name="weight"
                    placeholder="Weight (kg)"
                    type="text"
                    value={formData.weight ?? ""}
                    onChange={handleInputChange}
                  />
                  <p>kg</p>
                </div>
                <div className="flex flex-col text-center flex-1">
                  <input
                    className={inputClasses}
                    name="hoursSlept"
                    placeholder="Hours Slept"
                    type="text"
                    value={formData.hoursSlept ?? ""}
                    onChange={handleInputChange}
                  />
                  <p>hours</p>
                </div>
              </div>
            </div>
          </div>
          <ConditionSelector
            name="condition"
            value={formData.condition ?? null}
            onChange={handleConditionChange}
            childName={childName}
          />
        </div>
        <SymptomSelector
          symptoms={symptoms}
          value={formData.symptoms ?? {}}
          onChange={handleSymptomChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="w-full md:h-24 h-18 text-white text-2xl mt-2 flex gap-5">
          <Link
            href="./"
            className="rounded-2xl bg-red-500 shadow-[4px_4px_0px_rgba(0,0,0,5)] w-1/4 flex justify-center items-center"
          >
            Back
          </Link>
          <button
            type="submit"
            className="rounded-2xl bg-blue-400 shadow-[4px_4px_0px_rgba(0,0,0,5)] flex-1"
          >
            Submit
          </button>
        </div>
      </form>
      {dataSent && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-[100] text-lg">
          <div className="bg-white p-8 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,5)] relative max-w-md w-full mx-4 flex flex-col items-center justify-center">
            <h2 className="font-bold mb-4 text-center">Done!</h2>
            <p className="text-center mb-6">Data sent successfully.</p>
            <Link
              href="./"
              className="w-full py-3 bg-blue-400 text-white rounded-xl hover:bg-blue-500 transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export { ParentsSelection };
