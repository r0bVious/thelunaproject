import { useEffect, useState } from "react";
import { Gochi_Hand } from "next/font/google";
import { childrenNames } from "../data/childrenNames";

const gochi = Gochi_Hand({ subsets: ["latin"], weight: "400" });

const colors = [
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-purple-500",
  "text-pink-500",
  "text-orange-500",
];

interface NameScrollerProps {
  childName: string;
}

const NameScroller = ({ childName }: NameScrollerProps) => {
  const [names, setNames] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [velocity, setVelocity] = useState(60);
  const [targetVelocity, setTargetVelocity] = useState(60);
  const [showFinalName, setShowFinalName] = useState(false);
  const [randomColor, setRandomColor] = useState(colors[0]);

  useEffect(() => {
    setRandomColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  function shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return [...array];
  }

  useEffect(() => {
    setNames(shuffleArray(childrenNames));
  }, []);

  useEffect(() => {
    if (childName !== "") {
      setTargetVelocity(1000);
      const timer = setTimeout(() => {
        setShowFinalName(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setTargetVelocity(60);
      setShowFinalName(false);
    }
  }, [childName]);

  useEffect(() => {
    if (showFinalName) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const update = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setVelocity((prev) => prev + (targetVelocity - prev) * 0.1);

      setOffset((prev) => {
        const newOffset = prev + velocity * deltaTime;
        return newOffset > names.length * 60 ? 0 : newOffset;
      });

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, [velocity, targetVelocity, names.length, showFinalName]);

  return (
    <div className="relative w-full flex items-center justify-evenly font-mono px-4">
      <h1 className="md:text-5xl text-2xl font-bold">The</h1>
      <div className="relative h-[100px] md:w-64 w-40 mx-4">
        {/* Scrolling content with masks */}
        <div className="relative h-full overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute top-0 left-0 right-0 md:h-2 h-6 bg-gradient-to-b from-white to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 md:h-2 h-6 bg-gradient-to-t from-white to-transparent z-10" />

          <div
            className={`absolute left-0 w-full transition-opacity duration-2000 ${
              childName !== "" ? "opacity-0" : "opacity-100"
            }`}
            style={{ transform: `translateY(-${offset}px)` }}
          >
            {names.map((name, i) => (
              <h1
                key={i}
                className="my-5 md:text-5xl text-4xl font-bold text-center"
              >
                {name}
              </h1>
            ))}
          </div>
        </div>

        {/* Final name overlay */}
        <div
          className={`absolute inset-0 flex justify-center items-center transition-opacity duration-1500 z-20 ${
            showFinalName ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1
            className={`${gochi.className} ${randomColor} md:text-9xl text-6xl font-bold text-center`}
          >
            {childName}
          </h1>
        </div>
      </div>
      <h1 className="md:text-5xl text-2xl font-bold">Project</h1>
    </div>
  );
};

export default NameScroller;
