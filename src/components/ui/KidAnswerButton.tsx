interface AnswerButtonProps {
  userId: number | null;
  questionId: number;
  answerId: number;
  answerText: string;
  buttonStyles: string;
}

const KidAnswerButton = ({
  userId,
  questionId,
  answerId,
  answerText,
  buttonStyles,
}: AnswerButtonProps) => {
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
    } catch (error) {
      console.log("Failed to POST data:", error);
    }
  };
  return (
    <button onClick={handleClick} className={buttonStyles}>
      {answerText}
    </button>
  );
};

export default KidAnswerButton;
