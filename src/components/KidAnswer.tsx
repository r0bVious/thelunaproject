import { AnswerButton } from "./KidAnswerButtons";

interface AnswerButtonProps {
  userId: number | null;
  questionId: number;
  answerId: number;
  buttonType: string;
  buttonStyle: string;
  containerType: string;
  setQuestionStates: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<number>>;
}

const KidAnswer = ({
  userId,
  questionId,
  answerId,
  buttonType,
  buttonStyle,
  containerType,
  setQuestionStates,
  setCurrentQuestionId,
}: AnswerButtonProps) => {
  const handleClick = async () => {
    setQuestionStates((prevStates) => ({
      ...prevStates,
      [containerType]: buttonStyle,
    }));

    try {
      const response = await fetch("/api/kids/sendAs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          questionId,
          answerId,
        }),
      });

      if (!response.status) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Post successful:", data);
    } catch (error) {
      console.log("Failed to POST data:", error);
    }
    setCurrentQuestionId(questionId + 1);
  };

  return (
    <AnswerButton onClick={handleClick} type={buttonType} style={buttonStyle} />
  );
};

export default KidAnswer;
