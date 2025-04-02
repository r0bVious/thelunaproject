import Image from "next/image";
import { useEffect, useRef } from "react";
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
import { signOut } from "next-auth/react";

interface TransitionTypes {
  setTransition: React.Dispatch<React.SetStateAction<boolean>>;
  questionStates: Record<string, string | null>;
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<number>>;
  currentQuestionId: number;
}

const Transition = ({
  setTransition,
  questionStates,
  setCurrentQuestionId,
  currentQuestionId,
}: TransitionTypes) => {
  const feelingRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setTransition(false);
    setCurrentQuestionId((prev) => prev + 1);
  };

  useEffect(() => {
    const feeling = questionStates["feelings"];
    if (!feeling || !feelingRef.current) return;

    const emojiEffects: Record<string, (ref: HTMLDivElement) => void> = {
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

    emojiEffects[feeling]?.(feelingRef.current!);

    const interval = setInterval(() => {
      emojiEffects[feeling]?.(feelingRef.current!);
    }, 5000);

    return () => clearInterval(interval);
  }, [questionStates["feelings"]]);

  const getFeelingEmoji = (feeling: string) => {
    const feelingMap: Record<string, string> = {
      happy: "😊",
      sad: "😢",
      excited: "🤩",
      angry: "😡",
      relaxed: "😌",
      bored: "😒",
      nervous: "😟",
      silly: "🤪",
      tired: "😴",
      scared: "😨",
    };
    return feelingMap[feeling.toLowerCase()] || "❓";
  };

  const getWeatherEmoji = (weather: string) => {
    const weatherMap: Record<string, string> = {
      sunny: "☀️",
      cloudy: "☁️",
      foggy: "☁️",
      rainy: "🌧️",
      stormy: "⛈️",
      snowy: "❄️",
      windy: "💨",
      hot: "🥵",
      cold: "🥶",
    };
    return weatherMap[weather.toLowerCase()] || "❓";
  };

  const buttonClasses =
    "h-36 mt-4 w-full bg-black/50 text-white text-5xl flex items-center justify-center font-mono border-t-4 border-white";

  return (
    <div className="w-full h-full flex flex-col">
      <div className="pointer-events-none flex flex-col justify-evenly items-center w-full flex-1">
        {questionStates["feelings"] && (
          <div
            ref={feelingRef}
            className="border-2 p-12 rounded-full border-black flex flex-col items-center justify-evenly bg-[radial-gradient(ellipse_at_30%_20%,_rgba(255,255,255,0.9)_10%,_rgba(180,180,180,0.6)_40%,_rgba(50,50,50,0.3)_70%,_rgba(0,0,0,0.5)_100%)]"
          >
            <Image
              src={`/media/feelings/${questionStates["feelings"]}.png`}
              alt={`${questionStates["feelings"]} face`}
              height={150}
              width={150}
            />
          </div>
        )}
        <div className="text-left text-2xl md:text-4xl flex flex-col gap-5">
          {questionStates["colors"] && (
            <div className="flex items-center gap-2">
              <h1>
                You chose the color{" "}
                <span className="text-5xl underline">
                  {questionStates["colors"]}
                </span>
                .
              </h1>
              <div
                className="w-6 h-6 border-2 border-black animate-spin"
                style={{ backgroundColor: questionStates["colors"] }}
              />
            </div>
          )}
          {questionStates["feelings"] && (
            <div className="flex items-center gap-2">
              <h1>
                You feel{" "}
                <span className="text-5xl underline">
                  {questionStates["feelings"]}
                </span>
                .
              </h1>
              <span className="text-5xl animate-[wiggle_1s_ease-in-out_infinite_alternate]">
                {getFeelingEmoji(questionStates["feelings"])}
              </span>
            </div>
          )}
          {questionStates["weather"] && (
            <div className="flex items-center gap-2">
              <h1>
                You said today's weather is{" "}
                <span className="text-5xl underline">
                  {questionStates["weather"]}
                </span>
                .
              </h1>
              <span className="text-5xl">
                {getWeatherEmoji(questionStates["weather"])}
              </span>
            </div>
          )}
        </div>
      </div>
      {currentQuestionId < Object.keys(questionStates).length ? (
        <button className={buttonClasses} onClick={handleClick}>
          Continue
          <Image
            src="/media/next.png"
            alt="Continue"
            height={256}
            width={256}
            className="ml-10 h-1/3 w-auto animate-[pulseright_0.75s_ease-in-out_infinite_alternate]"
          />
        </button>
      ) : (
        <button className={buttonClasses} onClick={() => signOut()}>
          Bye-bye!
          <Image
            src="/media/hand.png"
            alt="Continue"
            height={256}
            width={256}
            className="h-1/3 w-auto invert-100 wavebye"
          />
        </button>
      )}
    </div>
  );
};

export default Transition;
