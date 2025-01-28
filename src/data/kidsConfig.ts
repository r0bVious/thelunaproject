type ButtonStyleKey = string;
type QuestionStyleKey = string;

export const kidsQuesConfig: Record<
  QuestionStyleKey,
  {
    containerStyles: string;
  }
> = {
  colors: {
    containerStyles: "flex justify-evenly flex-wrap",
  },
  feelings: {
    containerStyles: "p-5 flex flex-col h-full w-full",
  },
  weather: {
    containerStyles: "p-5 flex flex-col h-full w-full",
  },
};

export const kidsAnsConfig: Record<
  ButtonStyleKey,
  {
    buttonStyles: (style: string) => string;
    buttonOnClick: () => void;
  }
> = {
  "color-swatch": {
    buttonStyles: (style: string) => {
      const basicSwatch =
        "animate-tada text-white font-bold h-24 w-36 mb-4 border-2 border-black"; //set up basic here
      switch (style) {
        case "red":
          return `${basicSwatch} bg-red-600 hover:bg-red-700`;
        case "orange":
          return `${basicSwatch} bg-orange-600 hover:bg-orange-700`;
        case "yellow":
          return `${basicSwatch} bg-yellow-500 hover:bg-yellow-600`;
        case "green":
          return `${basicSwatch} bg-green-600 hover:bg-green-700`;
        case "sky":
          return `${basicSwatch} bg-sky-400 hover:bg-sky-500`;
        case "blue":
          return `${basicSwatch} bg-blue-600 hover:bg-blue-700`;
        case "purple":
          return `${basicSwatch} bg-purple-600 hover:bg-purple-700`;
        case "pink":
          return `${basicSwatch} bg-pink-300 hover:bg-pink-400`;
        case "cyan":
          return `${basicSwatch} bg-cyan-400 hover:bg-cyan-500`;
        case "brown":
          return `${basicSwatch} bg-yellow-800 hover:bg-yellow-900`;
        case "black":
          return `${basicSwatch} bg-gray-800 hover:bg-gray-900`;
        case "white":
          return `${basicSwatch} text-black bg-[#FAFAFA] hover:bg-gray-100`;
        case "gray":
          return `${basicSwatch} bg-gray-300 hover:bg-gray-400`;
        default:
          return `${basicSwatch} bg-gray-300`;
      }
    },
    buttonOnClick: async () => console.log("click"),
  },
  weather: {
    buttonStyles: (style: string) => {
      switch (style) {
        case "sunny":
          return "bg-yellow-500 hover:bg-yellow-600";
        case "cloudy":
          return "bg-gray-400 hover:bg-gray-500";
        case "rainy":
          return "bg-blue-500 hover:bg-blue-600";
        case "snowy":
          return "bg-white hover:bg-gray-200";
        case "foggy":
          return "bg-gray-300 hover:bg-gray-400";
        case "windy":
          return "bg-teal-500 hover:bg-teal-600";
        case "hot":
          return "bg-red-500 hover:bg-red-600";
        case "cold":
          return "bg-blue-400 hover:bg-blue-500";
        default:
          return "bg-gray-300";
      }
    },
    buttonOnClick: async () => console.log("click"),
  },
  feeling: {
    buttonStyles: (style: string) => {
      switch (style) {
        case "happy":
          return "bg-yellow-400 hover:bg-yellow-500";
        case "sad":
          return "bg-blue-500 hover:bg-blue-600";
        case "angry":
          return "bg-red-600 hover:bg-red-700";
        case "excited":
          return "bg-orange-500 hover:bg-orange-600";
        case "scared":
          return "bg-purple-500 hover:bg-purple-600";
        case "silly":
          return "bg-pink-400 hover:bg-pink-500";
        case "bored":
          return "bg-gray-400 hover:bg-gray-500";
        case "nervous":
          return "bg-teal-500 hover:bg-teal-600";
        case "tired":
          return "bg-indigo-500 hover:bg-indigo-600";
        default:
          return "bg-gray-300";
      }
    },
    buttonOnClick: async () => console.log("click"),
  },
};
