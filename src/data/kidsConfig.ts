export type ButtonStyleKey = "color-swatch" | "weather" | "feeling";
export type QuestionStyleKey = "colors" | "feelings" | "weather";

interface QuestionContainerProps {
  wrapperStyles: string;
  containerStyles: string;
  effectConfig?: {
    stateType: string;
    initialValue: null;
  };
}

const baseWrapper = "w-full h-full flex flex-col justify-center";
const baseCont = "flex flex-wrap rounded-2xl h-full m-5";
export const kidsQuesConfig: Record<QuestionStyleKey, QuestionContainerProps> =
  {
    colors: {
      wrapperStyles: `${baseWrapper}`,
      containerStyles: `${baseCont} rounded-2xl overflow-hidden`,
      effectConfig: {
        stateType: "string",
        initialValue: null,
      },
    },
    feelings: {
      wrapperStyles: `${baseWrapper}`,
      containerStyles: `${baseCont} justify-evenly items-center bg-[rgba(255,255,255,0.5)]`,
      effectConfig: {
        stateType: "string",
        initialValue: null,
      },
    },
    weather: {
      wrapperStyles: `${baseWrapper}`,
      containerStyles: `${baseCont} justify-evenly items-center bg-[rgba(255,255,255,0.75)]`,
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
        red: "bg-linear-45 from-red-400 to-red-700 animate-gradient",
        orange: "bg-linear-45 from-orange-200 to-orange-500 animate-gradient",
        yellow: "bg-linear-45 from-yellow-200 to-yellow-500 animate-gradient",
        green: "bg-linear-45 from-green-500 to-green-700 animate-gradient",
        blue: "bg-linear-45 from-blue-300 to-blue-700 animate-gradient",
        purple: "bg-linear-45 from-purple-300 to-purple-700 animate-gradient",
        pink: "bg-linear-45 from-red-300 to-pink-500 animate-gradient",
        cyan: "bg-linear-45 from-cyan-300 to-cyan-700 animate-gradient",
        black: "bg-linear-45 from-gray-900 to-gray-700 animate-gradient",
        white:
          "text-black bg-linear-45 from-gray-100 to-white animate-gradient",
        gray: "bg-linear-45 from-gray-300 to-gray-500 animate-gradient",
      }[state] || "bg-linear-45 from-gray-500 to-gray-700 animate-gradient"),
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
        happy: "",
        sad: "",
        angry: "",
        excited: "",
        scared: "",
        silly: "",
        bored: "",
        nervous: "",
        tired: "",
      }[state] || ""),
  },
};
