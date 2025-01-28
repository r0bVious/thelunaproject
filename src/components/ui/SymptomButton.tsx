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
    <div className="w-full min-h-24 flex flex-col items-center bg-white">
      <input type="hidden" name={sympName} value={severity} />
      <button
        type="button"
        className="h-full w-full flex flex-col justify-center items-center rounded border bg-white hover:bg-gray-200"
        onClick={handleSympClick}
      >
        {sympName}
        <div className="flex gap-1">
          {Array.from({ length: maxSeverity }).map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded ${
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
