"use client";
import { useState } from "react";
import { Answer, Question } from "@/types";
import KidAnswer from "@/components/KidAnswer";
import { useUserContext } from "@/contexts/UserContext";
import {
  kidsQuesConfig,
  QuestionStyleKey,
  stateEffectConfig,
} from "@/data/kidsConfig";
import "./KidsSelectionStyles.css";

interface KidsSelectionProps {
  questions: Question[];
  answers: Answer[];
}

const KidsSelection = ({ questions, answers }: KidsSelectionProps) => {
  const { userId } = useUserContext();
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const currentQuestion = questions[currentQuestionId - 1];
  const [questionStates, setQuestionStates] = useState(() => {
    return Object.fromEntries(
      Object.entries(kidsQuesConfig).map(([key, config]) => [
        key,
        config.effectConfig?.initialValue,
      ])
    );
  });

  const handleNext = () => {
    if (currentQuestionId < questions.length) {
      setCurrentQuestionId(currentQuestionId + 1);
    }
  };

  //sets style of button container
  const key = currentQuestion.container_type as QuestionStyleKey;
  const kidsQuesStyles = kidsQuesConfig[key].containerStyles;

  //specific variable for color effect
  const colorStateStyles = stateEffectConfig["color-swatch"].stateEffect(
    questionStates["colors"]
  );
  console.log(questionStates);
  //maybe have a kidsAnsConfig["weather"].stateEffect(questionStates["weather"]); that returns whatever necessary for whatever effect desired - this brings all necessary data for effects to happen HERE as well as within buttons if necessary
  return (
    <div
      className={`flex flex-col justify-evenly h-full items-center ${colorStateStyles}`}
    >
      <h1>
        {currentQuestion.question_text} - question {currentQuestionId}
      </h1>
      <section className={kidsQuesStyles}>
        {answers.map((answer) =>
          answer.question_id === currentQuestionId ? (
            <KidAnswer
              userId={userId}
              key={answer.answer_id}
              questionId={answer.question_id}
              answerId={answer.answer_id}
              containerType={currentQuestion.container_type}
              buttonType={answer.button_type}
              buttonStyle={answer.button_style}
              setQuestionStates={setQuestionStates}
              setCurrentQuestionId={setCurrentQuestionId}
            />
          ) : null
        )}
      </section>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export { KidsSelection };
