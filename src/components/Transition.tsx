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

interface TransitionTypes {
  setTransition: React.Dispatch<React.SetStateAction<boolean>>;
  questionStates: Record<string, string | null>;
}

const Transition = ({ setTransition, questionStates }: TransitionTypes) => {
  const feelingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransition(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setTransition]);

  useEffect(() => {
    if (questionStates["feelings"] && feelingRef.current) {
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

      emojiEffects[questionStates["feelings"]]?.(feelingRef.current);
    }
  }, [questionStates["feelings"]]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {questionStates["feelings"] && (
        <div ref={feelingRef}>
          <Image
            src={`/media/feelings/${questionStates["feelings"]}.png`}
            alt={`${questionStates["feelings"]} face`}
            height={150}
            width={150}
            className="transform scale-200 border-2 border-black rounded-full p-5"
          />
        </div>
      )}
    </div>
  );
};

export default Transition;
