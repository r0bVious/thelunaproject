"use client";

interface SymptomButtonProps {
  sympName: string;
  severity: number;
  maxSeverity?: number;
  onChange: (newSeverity: number) => void;
}

const SymptomButton = ({
  sympName,
  severity,
  maxSeverity = 3,
  onChange,
}: SymptomButtonProps) => {
  const handleSympClick = () => {
    const newSeverity = severity >= maxSeverity ? 0 : severity + 1;
    onChange(newSeverity);
  };

  const severityColors = ["bg-yellow-300", "bg-orange-300", "bg-red-400"];
  const activeColor =
    severity > 0 ? severityColors[severity - 1] : "bg-slate-200";

  return (
    <div className="border-1 border-black w-full flex h-full flex-col items-center bg-slate-100 rounded-2xl">
      <input type="hidden" name={sympName} value={severity} />
      <button
        type="button"
        className="rounded-2xl h-full w-full flex flex-col justify-evenly items-center"
        onClick={handleSympClick}
      >
        <p className="md:text-2xl">{sympName}</p>
        <div className="flex gap-2">
          {Array.from({ length: maxSeverity }).map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded border-2 border-border ${
                severity >= index + 1 ? activeColor : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </button>
    </div>
  );
};

export default SymptomButton;
