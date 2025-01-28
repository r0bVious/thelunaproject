import { kidsAnsConfig } from "@/data/kidsConfig";

interface AnswerButtonProps {
  userId: number | null;
  questionId: number;
  answerId: number;
  answerText: string;
  buttonType: string;
  buttonStyle: string;
}

const KidAnswerButton = ({
  userId,
  questionId,
  answerId,
  answerText,
  buttonType,
  buttonStyle,
}: AnswerButtonProps) => {
  const buttonClasses = kidsAnsConfig[buttonType].buttonStyles(buttonStyle);
  const successClick = kidsAnsConfig[buttonType].buttonOnClick;

  const handleClick = async () => {
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
      await successClick();
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
