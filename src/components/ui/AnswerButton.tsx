import { insertKidRes } from "@/app/api/kids/getQs/route";

interface AnswerButtonProps {
  kidUser: boolean;
  questionId: number;
  answerId: number;
  children: React.ReactNode;
}

const AnswerButton = ({
  kidUser,
  questionId,
  answerId,
  children,
}: AnswerButtonProps) => {
  const handleClick = async () => {
    //this should be db posts with chosen data and maybe local effects for engagement
  };
  return (
    <button onClick={handleClick} className="size-52 bg-slate-500">
      {children}
    </button>
  );
};

export default AnswerButton;
