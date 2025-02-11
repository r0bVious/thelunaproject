"use client";

import SymptomButton from "@/components/SymptomButton";
import { Symptom } from "@/types";

interface SymptomSelectorProps {
  symptoms: Symptom[];
  value: Record<number, number>;
  onChange: (symptom_id: number, severity: number) => void;
}

export const SymptomSelector = ({
  symptoms,
  value,
  onChange,
}: SymptomSelectorProps) => {
  return (
    <div className="flex flex-col items-center gap-2 ">
      <p>Optional Symptoms:</p>
      <div className="w-full grid grid-cols-3 gap-2">
        {symptoms.map(({ phys_sym_id, symptom_name }) => (
          <SymptomButton
            key={phys_sym_id}
            sympName={symptom_name}
            severity={value[phys_sym_id] || 0}
            onChange={(newSeverity) => onChange(phys_sym_id, newSeverity)}
          />
        ))}
      </div>
    </div>
  );
};
