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
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

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
        (config.effectConfig?.initialValue as string | null) ?? null,
      ])
    );
  });

  //sets style of button container
  const key = currentQuestion.container_type as QuestionStyleKey;
  const wrapperStyles = kidsQuesConfig[key].wrapperStyles;
  const containerStyles = kidsQuesConfig[key].containerStyles;

  //specific variable for color effect - the || could have a pull from previous entry!
  const colorStateStyles = stateEffectConfig["color-swatch"].stateEffect(
    questionStates["colors"] || ""
  );
  const backgroundEmotion = `/media/feelings/${questionStates["feelings"]}.png`;
  //maybe have a kidsAnsConfig["weather"].stateEffect(questionStates["weather"]); that returns whatever necessary for whatever effect desired - this brings all necessary data for effects to happen HERE as well as within buttons if necessary
  return (
    <div
      className={`relative h-full transition-all duration-300 ${colorStateStyles} overflow-hidden`}
    >
      <main
        className={`flex flex-col justify-evenly h-full items-center relative w-full`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionId}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute w-full h-full flex flex-col justify-center items-center text-center"
          >
            <section className={wrapperStyles}>
              <div className={containerStyles}>
                {answers.map((answer, index) =>
                  answer.question_id === currentQuestionId ? (
                    <KidAnswer
                      key={answer.answer_id}
                      index={index}
                      userId={userId}
                      questionId={answer.question_id}
                      answerId={answer.answer_id}
                      containerType={currentQuestion.container_type}
                      buttonType={answer.button_type}
                      buttonStyle={answer.button_style}
                      questionStates={questionStates}
                      setQuestionStates={setQuestionStates}
                      setCurrentQuestionId={setCurrentQuestionId}
                    />
                  ) : null
                )}
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export { KidsSelection };
