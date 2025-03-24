"use client";
import { useState } from "react";
import { Answer, Question } from "@/types";
import KidAnswer from "@/components/KidAnswer/KidAnswer";
import { useUserContext } from "@/contexts/UserContext";
import {
  kidsQuesConfig,
  QuestionStyleKey,
  stateEffectConfig,
} from "@/config/kidsConfig";
import "./KidsSelectionStyles.css";
import { motion, AnimatePresence } from "motion/react";
import WeatherLayer from "@/components/WeatherLayer/WeatherLayer";
import Transition from "@/components/Transition";

interface KidsSelectionProps {
  questions: Question[];
  answers: Answer[];
}

const KidsSelection = ({ questions, answers }: KidsSelectionProps) => {
  const { userId } = useUserContext();
  const [transition, setTransition] = useState<boolean>(true);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
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

  console.log(questionStates);
  console.log(currentQuestionId);

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
            initial={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute w-full h-full flex flex-col justify-center items-center text-center"
          >
            {transition ? (
              <Transition
                setTransition={setTransition}
                questionStates={questionStates}
              />
            ) : (
              <motion.div
                key={currentQuestionId}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute w-full h-full flex flex-col justify-center items-center text-center"
              >
                <section className={wrapperStyles}>
                  <h1 className="text-4xl mt-5 bg-white">
                    {currentQuestion.question_text}
                  </h1>
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
                          setTransition={setTransition}
                          setCurrentQuestionId={setCurrentQuestionId}
                        />
                      ) : null
                    )}
                  </div>
                </section>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        <WeatherLayer weather={questionStates["weather"]} />
      </main>
    </div>
  );
};

export { KidsSelection };
