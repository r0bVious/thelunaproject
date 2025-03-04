import { AnswerButton } from "./KidAnswerButtons";

interface AnswerButtonProps {
  index: number;
  userId: number | null;
  questionId: number;
  answerId: number;
  buttonType: string;
  buttonStyle: string;
  containerType: string;
  questionStates: Record<string, string | null>;
  setQuestionStates: React.Dispatch<
    React.SetStateAction<Record<string, string | null>>
  >;
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<number>>;
}

const KidAnswer = ({
  index,
  userId,
  questionId,
  answerId,
  containerType,
  buttonType,
  buttonStyle,
  questionStates,
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

    //LOOP FOR TESTING - FIX IN PROD
    setCurrentQuestionId(3);
    // if (questionId > 2) {
    //   setCurrentQuestionId(1);
    // } else setCurrentQuestionId(questionId + 1);
  };

  return (
    <AnswerButton
      index={index}
      type={buttonType}
      style={buttonStyle}
      questionStates={questionStates}
      onClick={handleClick}
    />
  );
};

export default KidAnswer;
