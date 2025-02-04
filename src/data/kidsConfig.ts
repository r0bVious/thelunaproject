export type ButtonStyleKey = "color-swatch" | "weather" | "feelings";
export type QuestionStyleKey = "colors" | "feelings" | "weather";

interface QuestionConfig {
  containerStyles: string;
  effectConfig?: {
    stateType: string;
    initialValue: any;
  };
}

interface AnswerConfig {
  buttonStyles: (style: string) => string;
  stateEffect: (state: string) => string;
}

export const kidsQuesConfig: Record<QuestionStyleKey, QuestionConfig> = {
  colors: {
    containerStyles: "flex justify-evenly flex-wrap w-5/6 border-2",
    effectConfig: {
      stateType: "string",
      initialValue: null,
    },
  },
  feelings: {
    containerStyles: "p-5 flex flex-col h-full w-full",
    effectConfig: {
      stateType: "string",
      initialValue: null,
    },
  },
  weather: {
    containerStyles: "p-5 flex flex-col h-full w-full",
    effectConfig: {
      stateType: "string",
      initialValue: null,
    },
  },
};

export const kidsAnsConfig: Record<ButtonStyleKey, AnswerConfig> = {
  "color-swatch": {
    buttonStyles: (style) => {
      const basicSwatch =
        "animate-tada text-white font-bold h-24 w-36 mb-4 border-2 border-black";
      return (
        {
          red: `${basicSwatch} bg-red-600 hover:bg-red-700`,
          orange: `${basicSwatch} bg-orange-600 hover:bg-orange-700`,
          yellow: `${basicSwatch} bg-yellow-500 hover:bg-yellow-600`,
          green: `${basicSwatch} bg-green-600 hover:bg-green-700`,
          sky: `${basicSwatch} bg-sky-400 hover:bg-sky-500`,
          blue: `${basicSwatch} bg-blue-600 hover:bg-blue-700`,
          purple: `${basicSwatch} bg-purple-600 hover:bg-purple-700`,
          pink: `${basicSwatch} bg-pink-300 hover:bg-pink-400`,
          cyan: `${basicSwatch} bg-cyan-400 hover:bg-cyan-500`,
          brown: `${basicSwatch} bg-yellow-800 hover:bg-yellow-900`,
          black: `${basicSwatch} bg-gray-800 hover:bg-gray-900`,
          white: `${basicSwatch} text-black bg-[#FAFAFA] hover:bg-gray-100`,
          gray: `${basicSwatch} bg-gray-300 hover:bg-gray-400`,
        }[style] || `${basicSwatch} bg-gray-300`
      );
    },
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
    buttonStyles: (style) =>
      ({
        sunny: "bg-yellow-500 hover:bg-yellow-600",
        cloudy: "bg-gray-400 hover:bg-gray-500",
        rainy: "bg-blue-500 hover:bg-blue-600",
        snowy: "bg-white hover:bg-gray-200",
        foggy: "bg-gray-300 hover:bg-gray-400",
        windy: "bg-teal-500 hover:bg-teal-600",
        hot: "bg-red-500 hover:bg-red-600",
        cold: "bg-blue-400 hover:bg-blue-500",
      }[style] || "bg-gray-300"),
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
  feelings: {
    buttonStyles: (style) =>
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
      }[style] || "bg-gray-300"),
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
