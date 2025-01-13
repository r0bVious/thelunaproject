"use client";
import { useState } from "react";
import { Answer, Question } from "@/types";
import AnswerButton from "@/components/ui/AnswerButton";

interface KidsSelectionProps {
  questions: Question[];
  answers: Answer[];
}

const KidsSelection = ({ questions, answers }: KidsSelectionProps) => {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const currentQuestion = questions[currentQuestionId - 1];

  const handleNext = () => {
    if (currentQuestionId < questions.length) {
      setCurrentQuestionId(currentQuestionId + 1);
    }
  };

  return (
    <div>
      <h1>
        {currentQuestion.question_text} - question {currentQuestionId}
      </h1>
      <section className="flex">
        {answers.map((answer) =>
          answer.question_id === currentQuestionId ? (
            <AnswerButton
              key={answer.answer_id}
              kidUser={true}
              questionId={answer.question_id}
              answerId={answer.answer_id}
            >
              {answer.answer_text}
            </AnswerButton>
          ) : null
        )}
      </section>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export { KidsSelection };
