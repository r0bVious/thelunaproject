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
    <div className="mt-2 flex flex-col w-full flex-1 min-h-1/2">
      <p className="px-4 bg-parent-bg rounded-t-2xl w-fit">
        Optional Symptoms:
      </p>
      <div className="bg-parent-bg w-full rounded-tr-2xl rounded-b-2xl p-2 flex-1 grid md:grid-cols-3 grid-cols-2 gap-2 shadow-[2px_2px_1px_rgba(0,0,0,5)]">
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
