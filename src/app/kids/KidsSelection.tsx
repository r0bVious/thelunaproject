"use client";
import { useState } from "react";
import { Answer, Question } from "@/types";
import KidAnswerButton from "@/components/ui/KidAnswerButton";
import { useUserContext } from "@/contexts/UserContext";

interface KidsSelectionProps {
  questions: Question[];
  answers: Answer[];
}

const KidsSelection = ({ questions, answers }: KidsSelectionProps) => {
  const { userId } = useUserContext();
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const currentQuestion = questions[currentQuestionId - 1];

  const handleNext = () => {
    if (currentQuestionId < questions.length) {
      setCurrentQuestionId(currentQuestionId + 1);
    }
  };

  return (
    <div className="p-5 flex flex-col h-full w-full">
      <h1>
        {currentQuestion.question_text} - question {currentQuestionId}
      </h1>
      <section className={``}>
        {answers.map((answer) =>
          answer.question_id === currentQuestionId ? (
            <KidAnswerButton
              userId={userId}
              key={answer.answer_id}
              questionId={answer.question_id}
              answerId={answer.answer_id}
              answerText={answer.answer_text}
              buttonStyles={`w-full py-5`}
            />
          ) : null
        )}
      </section>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export { KidsSelection };
