import { motion } from "motion/react";
import Image from "next/image";

interface ButtonProps {
  index: number;
  type: string;
  style: string;
  questionStates: Record<string, string | null>;
  onClick?: () => void;
}
//I think we can use the current state here to dynamically style through the state object?

const ColorButton: React.FC<ButtonProps> = ({ style, onClick, index }) => {
  const buttonStyles = (style: string) => {
    const basicStyles = `text-3xl font-bold w-[150%]`;
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
  const buttonStyles =
    "font-bold md:h-48 md:w-48 flex flex-col justify-evenly items-center text-3xl border-4 rounded-2xl";

  return (
    <motion.button
      className={buttonStyles}
      onClick={onClick}
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
    "text-2xl font-bold w-36 h-36 mb-4 border-2 border-black flex flex-col justify-evenly bg-gray-500 from-gray-100 to-gray-500 text-black";
  const emoji = (style: string) => {
    return (
      {
        sunny: `☀️`,
        cloudy: `☁️`,
        rainy: `☔`,
        snowy: `🌨️`,
        foggy: `🌫️`,
        windy: `🍃`,
        hot: `🥵`,
        cold: `🥶`,
      }[style] || ``
    );
  };
  return (
    <motion.button className={buttonStyles} onClick={onClick}>
      <span>{style}</span>
      <span className="text-5xl">{emoji(style)}</span>
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
