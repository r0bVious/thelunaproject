import { Button } from "./ui/button";

interface ButtonProps {
  style: string;
  onClick?: () => void;
}

interface AnswerButtonProps {
  type: string;
}

const ColorButton: React.FC<ButtonProps> = ({ style, onClick }) => {
  const buttonStyles = (style: string) => {
    const basicStyles =
      "animate-tada text-white text-3xl font-bold h-24 w-36 mb-4 border-2 border-black";
    return (
      {
        red: `${basicStyles} bg-red-600 hover:bg-red-700`,
        orange: `${basicStyles} bg-orange-600 hover:bg-orange-700`,
        yellow: `${basicStyles} bg-yellow-500 hover:bg-yellow-600`,
        green: `${basicStyles} bg-green-600 hover:bg-green-700`,
        sky: `${basicStyles} bg-sky-400 hover:bg-sky-500`,
        blue: `${basicStyles} bg-blue-600 hover:bg-blue-700`,
        purple: `${basicStyles} bg-purple-600 hover:bg-purple-700`,
        pink: `${basicStyles} bg-pink-300 hover:bg-pink-400`,
        cyan: `${basicStyles} bg-cyan-400 hover:bg-cyan-500`,
        brown: `${basicStyles} bg-yellow-800 hover:bg-yellow-900`,
        black: `${basicStyles} bg-gray-800 hover:bg-gray-900`,
        white: `${basicStyles} text-black bg-[#FAFAFA] hover:bg-gray-100`,
        gray: `${basicStyles} bg-gray-300 text-black hover:bg-gray-400`,
      }[style] || `${basicStyles} bg-gray-300`
    );
  };
  return (
    <Button className={buttonStyles(style)} onClick={onClick}>
      {style}
    </Button>
  );
};

const FeelingButton: React.FC<ButtonProps> = ({ style, onClick }) => {
  const buttonStyles =
    "animate-tada text-white text-2xl font-bold w-36 h-36 rounded-full mb-4 border-2 border-black flex flex-col justify-evenly bg-linear-to-b from-gray-100 to-gray-500 text-black";
  const emoji = (style: string) => {
    return (
      {
        happy: `🙂`,
        sad: `😟`,
        angry: `😠`,
        excited: `😆`,
        scared: `😨`,
        silly: `🤪`,
        bored: `😒`,
        nervous: `😥`,
        tired: `🥱`,
      }[style] || ``
    );
  };
  return (
    <Button className={buttonStyles} onClick={onClick}>
      <span>{style}</span>
      <span className="text-5xl">{emoji(style)}</span>
    </Button>
  );
};

const WeatherButton: React.FC<ButtonProps> = ({ style, onClick }) => {
  const buttonStyles =
    "animate-tada text-2xl font-bold w-36 h-36 mb-4 border-2 border-black flex flex-col justify-evenly bg-gray-500 from-gray-100 to-gray-500 text-black";
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
    <Button className={buttonStyles} onClick={onClick}>
      <span>{style}</span>
      <span className="text-5xl">{emoji(style)}</span>
    </Button>
  );
};

const ButtonRouter: Record<string, React.FC<any>> = {
  "color-swatch": ColorButton,
  weather: WeatherButton,
  feeling: FeelingButton,
};

export const AnswerButton: React.FC<
  AnswerButtonProps & { [key: string]: any }
> = ({ type, ...props }) => {
  const ButtonComponent = ButtonRouter[type];
  return <ButtonComponent {...props} />;
};
