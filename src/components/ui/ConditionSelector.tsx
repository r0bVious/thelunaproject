"use client";
import React from "react";

interface ConditionSelectorProps {
  name: string;
  value: number | null;
  onChange: (value: number | null) => void;
}

export default function ConditionSelector({
  name,
  value,
  onChange,
}: ConditionSelectorProps) {
  const conditions = [
    { id: 1, label: "Miserable" },
    { id: 2, label: "Bad" },
    { id: 3, label: "Normal" },
    { id: 4, label: "Good" },
    { id: 5, label: "Great!" },
  ];

  return (
    <div className="flex flex-col gap-2 items-center bg-slate-400 w-full">
      <p>Select Condition:</p>
      <div className="flex w-full justify-evenly gap-2">
        <input type="hidden" name={name} value={value?.toString() ?? ""} />
        {conditions.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`rounded h-20 w-full ${
              value === id ? "bg-blue-400 text-white" : "bg-gray-200"
            } hover:bg-gray-300`}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
