"use client";

import SymptomButton from "@/components/ui/SymptomButton";
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
  );
};
