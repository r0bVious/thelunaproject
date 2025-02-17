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

  return (
    <div className="w-full min-h-24 flex flex-col items-center">
      <input type="hidden" name={sympName} value={severity} />
      <button
        type="button"
        className="h-full w-full flex flex-col justify-evenly items-center"
        onClick={handleSympClick}
      >
        <p className="h-3/4 break-words text-wrap flex items-center">
          {sympName}
        </p>
        <div className="h-1/4 flex gap-1">
          {Array.from({ length: maxSeverity }).map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded border-2 border-border ${
                severity >= index + 1 ? "bg-green-400" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </button>
    </div>
  );
};

export default SymptomButton;
