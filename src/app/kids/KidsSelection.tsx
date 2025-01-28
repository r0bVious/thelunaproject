"use client";
import { useState } from "react";
import { Answer, Question } from "@/types";
import KidAnswerButton from "@/components/ui/KidAnswerButton";
import { useUserContext } from "@/contexts/UserContext";
import { kidsQuesConfig } from "@/data/kidsConfig";

interface KidsSelectionProps {
  questions: Question[];
  answers: Answer[];
}

const KidsSelection = ({ questions, answers }: KidsSelectionProps) => {
  const { userId } = useUserContext();
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const currentQuestion = questions[currentQuestionId - 1];
  const [bgColor, setBgColor] = useState<string>("");

  const handleNext = () => {
    if (currentQuestionId < questions.length) {
      setCurrentQuestionId(currentQuestionId + 1);
    }
  };

  const kidsQuesStyles =
    kidsQuesConfig[currentQuestion.container_type].containerStyles;
  console.log("cont type:", currentQuestion.container_type);
  console.log("styles found:", kidsQuesStyles);
  return (
    <div
      className={`flex flex-col justify-evenly h-full items-center ${bgColor}`}
    >
      <h1>
        {currentQuestion.question_text} - question {currentQuestionId}
      </h1>
      <section className={kidsQuesStyles}>
        {answers.map((answer) =>
          answer.question_id === currentQuestionId ? (
            <KidAnswerButton
              userId={userId}
              key={answer.answer_id}
              questionId={answer.question_id}
              answerId={answer.answer_id}
              answerText={answer.answer_text}
              buttonType={answer.button_type}
              buttonStyle={answer.button_style}
            />
          ) : null
        )}
      </section>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export { KidsSelection };
