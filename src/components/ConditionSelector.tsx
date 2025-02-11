"use client";
import React from "react";
import { Button } from "./ui/button";

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
    { id: 1, label: ">:(" },
    { id: 2, label: ":/" },
    { id: 3, label: ":)" },
    { id: 4, label: ":3" },
    { id: 5, label: ":D" },
  ];

  return (
    <div className="flex flex-col gap-2 items-center bg-slate-400 w-full">
      <p>Select Condition:</p>
      <div className="flex w-full justify-evenly gap-2">
        <input type="hidden" name={name} value={value?.toString() ?? ""} />
        {conditions.map(({ id, label }) => (
          <Button
            key={id}
            type="button"
            className={`rounded h-20 w-1/5 ${
              value === id ? "bg-blue-400 text-white" : "bg-gray-200"
            } hover:bg-gray-300`}
            onClick={() => onChange(id)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
