"use client";
import React from "react";

interface ConditionSelectorProps {
  name: string;
  value: number | null;
  onChange: (value: number | null) => void;
  childName: string | null;
}

export default function ConditionSelector({
  name,
  value,
  onChange,
  childName,
}: ConditionSelectorProps) {
  const conditions = [
    { id: 1, label: "Bad", color: "bg-red-400" },
    { id: 2, label: "Not Good", color: "bg-orange-300" },
    { id: 3, label: "Normal", color: "bg-yellow-300" },
    { id: 4, label: "Good", color: "bg-green-300" },
    { id: 5, label: "Great", color: "bg-green-500" },
  ];

  const handleClick = () => {
    const nextCondition =
      value === null || value >= conditions.length ? 1 : value + 1;
    onChange(nextCondition);
  };

  const activeColor =
    value !== null
      ? conditions.find((c) => c.id === value)?.color
      : "bg-slate-200";

  return (
    <div className="mt-2 w-full flex flex-col flex-1 max-h-24 min-h-18 justify-center">
      <p className="px-4 bg-parent-bg rounded-t-2xl w-fit">
        How is {childName}'s mood?
      </p>
      <input type="hidden" name={name} value={value?.toString() ?? ""} />
      <div className="h-full w-full flex flex-col justify-evenly items-center gap-2 rounded-b-lg rounded-tr-lg bg-parent-bg shadow-[2px_2px_1px_rgba(0,0,0,5)]">
        <div className="flex justify-evenly w-full items-center h-full">
          <div className="flex w-3/4 justify-evenly">
            {conditions.map((condition) => (
              <div
                key={condition.id}
                className={`h-4 w-4 rounded border-2 border-border ${
                  value && value >= condition.id ? activeColor : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="w-1/4 h-full rounded-lg bg-blue-400 text-white font-semibold shadow-[-3px_0px_0px_rgba(255,255,255,5)]"
          >
            <h1 className="h-full w-full flex justify-center items-center text-xl">
              {conditions.find((c) => c.id === value)?.label || "Set Mood"}
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}
