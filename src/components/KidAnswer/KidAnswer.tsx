import { motion } from "motion/react";
import Image from "next/image";
import {
  angryBlast,
  boredBlast,
  excitedBlast,
  happyBlast,
  nervousBlast,
  sadBlast,
  scaredBlast,
  sillyBlast,
  tiredBlast,
} from "@/config/emojiBlastConfig";
import { useRef } from "react";
import "./KidAnswerStyles.css";

interface ButtonProps {
  index: number;
  type: string;
  style: string;
  questionStates: Record<string, string | null>;
  onClick: () => void;
}
//I think we can use the current state here to dynamically style through the state object?

const ColorButton: React.FC<ButtonProps> = ({ style, onClick, index }) => {
  const buttonStyles = (style: string) => {
    const basicStyles =
      "text-3xl font-bold w-[150vw] text-center flex flex-1 justify-center items-center self-center";
    return (
      {
        red: `${basicStyles} text-white bg-red-600 hover:bg-red-700`,
        orange: `${basicStyles} text-white bg-orange-500 hover:bg-orange-600`,
        yellow: `${basicStyles} text-white bg-yellow-500 hover:bg-yellow-600`,
        green: `${basicStyles} text-white bg-green-600 hover:bg-green-700`,
        blue: `${basicStyles} text-white bg-blue-600 hover:bg-blue-700`,
        purple: `${basicStyles} text-white bg-purple-600 hover:bg-purple-700`,
        pink: `${basicStyles} text-white bg-pink-300 hover:bg-pink-400`,
        cyan: `${basicStyles} text-white bg-cyan-300 hover:bg-cyan-500`,
        brown: `${basicStyles} text-white bg-yellow-800 hover:bg-yellow-900`,
        black: `${basicStyles} text-white bg-gray-900 hover:bg-gray-700`,
        white: `${basicStyles} bg-[#FAFAFA] hover:bg-gray-300`,
        gray: `${basicStyles} text-white bg-gray-500 hover:bg-gray-400`,
      }[style] || `${basicStyles} bg-gray-300`
    );
  };

  const motionVariants = {
    hidden: { x: "10vw", opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <motion.button
      className={buttonStyles(style)}
      onClick={onClick}
      variants={motionVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      {style}
    </motion.button>
  );
};

const FeelingButton: React.FC<ButtonProps> = ({
  style,
  onClick,
  questionStates,
  index,
}) => {
  const feelingRef = useRef<HTMLButtonElement>(null);
  const buttonStyles =
    "font-bold md:h-48 md:w-48 flex flex-col justify-evenly items-center text-3xl border-4 rounded-2xl";

  const feelingEmoji = (feeling: string) => {
    if (!feelingRef.current) return;

    const emojiEffects: Record<string, (ref: HTMLButtonElement) => void> = {
      happy: (ref) => happyBlast(ref),
      sad: (ref) => sadBlast(ref),
      angry: (ref) => angryBlast(ref),
      excited: (ref) => excitedBlast(ref),
      scared: (ref) => scaredBlast(ref),
      silly: (ref) => sillyBlast(ref),
      bored: (ref) => boredBlast(ref),
      nervous: (ref) => nervousBlast(ref),
      tired: (ref) => tiredBlast(ref),
    };

    emojiEffects[feeling]?.(feelingRef.current);
  };

  return (
    <motion.button
      ref={feelingRef}
      className={buttonStyles}
      onClick={() => {
        feelingEmoji(style);
        onClick();
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.05 * index,
        duration: 0.25,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.75 },
      }}
    >
      <div
        className="rounded-full md:h-36 md:w-36 h-32 w-32 flex justify-center items-center"
        style={{
          backgroundColor: questionStates["colors"] || "#D1D5DB",
        }}
      >
        <Image
          src={`/media/feelings/${style}.png`}
          alt={`${style} face`}
          height={150}
          width={150}
          className="h-2/3 w-2/3"
        />
      </div>
      <span>{style}</span>
    </motion.button>
  );
};

const WeatherButton: React.FC<ButtonProps> = ({ style, onClick }) => {
  const buttonStyles =
    "relative text-3xl font-bold w-full flex flex-1 justify-between items-center overflow-hidden bg-white rounded-2xl";
  const buttonSetup = (style: string) => {
    return (
      {
        sunny: {
          emoji: "☀️",
          className: "absolute -right-36 -bottom-2 text-[16rem] slowpulse",
        },
        cloudy: {
          emoji: "☁️",
          className: "absolute -right-12 -top-10 text-[10rem] slideleftfade",
        },
        rainy: {
          emoji: "☂️",
          className:
            "absolute right-6 top-4 text-[6rem] transform rotate-20 rainy",
        },
        snowy: {
          emoji: "❄️",
          className: "absolute text-[4rem] -top-12 right-12 snowy snowman",
        },
        foggy: {
          emoji: "☁️",
          className: "absolute -top-36 -right-24 text-[21rem] fadeloop",
        },
        windy: { emoji: "🍃", className: "absolute -left-4 text-[5rem] windy" },
        hot: {
          emoji: "🥵",
          className: "absolute right-4 top-4 text-[8rem] rainy",
        },
        cold: {
          emoji: "🥶",
          className: "absolute right-4 top-4 text-[8rem] freezing",
        },
      }[style] || { emoji: "❓", className: "absolute text-[12rem]" }
    );
  };

  const getRandom = () => (Math.random() > 0.5 ? "20%" : "-20%");
  const { emoji, className } = buttonSetup(style);

  return (
    <motion.button className={buttonStyles} onClick={onClick}>
      <span>{style}</span>
      <span
        className={className}
        style={{ "--random-val": getRandom() } as React.CSSProperties}
      >
        {emoji}
      </span>
    </motion.button>
  );
};

const ButtonRouter: Record<string, React.FC<ButtonProps>> = {
  "color-swatch": ColorButton,
  weather: WeatherButton,
  feeling: FeelingButton,
};

export const AnswerButton: React.FC<ButtonProps> = ({
  type,
  style,
  ...props
}) => {
  const ButtonComponent = ButtonRouter[type];
  return <ButtonComponent type={type} style={style} {...props} />;
};

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
