import { ButtonStyleKey, kidsAnsConfig } from "@/data/kidsConfig";

interface AnswerButtonProps {
  userId: number | null;
  questionId: number;
  answerId: number;
  answerText: string;
  buttonType: string;
  buttonStyle: string;
  containerType: string;
  setQuestionStates: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const KidAnswerButton = ({
  userId,
  questionId,
  answerId,
  answerText,
  buttonType,
  buttonStyle,
  containerType,
  setQuestionStates,
}: AnswerButtonProps) => {
  const key = buttonType as ButtonStyleKey;
  const buttonClasses = kidsAnsConfig[key].buttonStyles(buttonStyle);

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
  };

  return (
    <button onClick={handleClick} className={`${buttonClasses}`}>
      {answerText}
    </button>
  );
};

export default KidAnswerButton;
