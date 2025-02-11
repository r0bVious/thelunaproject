export type ButtonStyleKey = "color-swatch" | "weather" | "feeling";
export type QuestionStyleKey = "colors" | "feelings" | "weather";

interface QuestionContainerProps {
  containerStyles: string;
  effectConfig?: {
    stateType: string;
    initialValue: any;
  };
}

export const kidsQuesConfig: Record<QuestionStyleKey, QuestionContainerProps> =
  {
    colors: {
      containerStyles: "flex flex-wrap w-full justify-evenly",
      effectConfig: {
        stateType: "string",
        initialValue: null,
      },
    },
    feelings: {
      containerStyles: "flex justify-evenly flex-wrap w-5/6 border-2",
      effectConfig: {
        stateType: "string",
        initialValue: null,
      },
    },
    weather: {
      containerStyles: "flex justify-evenly flex-wrap w-5/6 border-2",
      effectConfig: {
        stateType: "string",
        initialValue: null,
      },
    },
  };

export const stateEffectConfig: Record<
  string,
  { stateEffect: (state: string) => string }
> = {
  "color-swatch": {
    stateEffect: (state) =>
      ({
        red: `bg-gradient-to-r from-red-500 to-red-700 animate-gradient`,
        orange: `bg-gradient-to-r from-orange-400 to-orange-600 animate-gradient`,
        yellow: `bg-gradient-to-r from-yellow-300 to-yellow-500 animate-gradient`,
        green: `bg-gradient-to-r from-green-500 to-green-700 animate-gradient`,
        sky: `bg-gradient-to-r from-sky-300 to-sky-500 animate-gradient`,
        blue: `bg-gradient-to-r from-blue-500 to-blue-700 animate-gradient`,
        purple: `bg-gradient-to-r from-purple-500 to-purple-700 animate-gradient`,
        pink: `bg-gradient-to-r from-pink-300 to-pink-500 animate-gradient`,
        cyan: `bg-gradient-to-r from-cyan-300 to-cyan-500 animate-gradient`,
        brown: `bg-gradient-to-r from-yellow-700 to-yellow-900 animate-gradient`,
        black: `bg-gradient-to-r from-gray-900 to-gray-700 animate-gradient`,
        white: `text-black bg-gradient-to-r from-gray-100 to-white animate-gradient`,
        gray: `bg-gradient-to-r from-gray-300 to-gray-500 animate-gradient`,
      }[state] ||
      `bg-gradient-to-r from-gray-300 to-gray-500 animate-gradient`),
  },
  weather: {
    stateEffect: (state) =>
      ({
        sunny: "bg-yellow-500",
        cloudy: "bg-gray-400",
        rainy: "bg-blue-500",
        snowy: "bg-white",
        foggy: "bg-gray-300",
        windy: "bg-teal-500",
        hot: "bg-red-500",
        cold: "bg-blue-400",
      }[state] || "bg-gray-300"),
  },
  feeling: {
    stateEffect: (state) =>
      ({
        happy: "bg-yellow-400 hover:bg-yellow-500",
        sad: "bg-blue-500 hover:bg-blue-600",
        angry: "bg-red-600 hover:bg-red-700",
        excited: "bg-orange-500 hover:bg-orange-600",
        scared: "bg-purple-500 hover:bg-purple-600",
        silly: "bg-pink-400 hover:bg-pink-500",
        bored: "bg-gray-400 hover:bg-gray-500",
        nervous: "bg-teal-500 hover:bg-teal-600",
        tired: "bg-indigo-500 hover:bg-indigo-600",
      }[state] || "bg-gray-300"),
  },
};
