"use client";
import { useState } from "react";
import { Answer, Question } from "@/types";

interface KidsSelectionProps {
  questions: Question[];
  answers: Answer[];
}

const KidsSelection = ({ questions }: KidsSelectionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div>
      <h1>{currentQuestion.question_text}</h1>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export { KidsSelection };
