"use client";
import { useEffect, useRef, forwardRef, useState } from "react";
import "./WeatherLayerStyles.css";
import { motion } from "motion/react";
import Snowfall from "react-snowfall";
import Image from "next/image";

const Rain = forwardRef<HTMLDivElement>((_, ref) => {
  useEffect(() => {
    if (!ref || !(ref as React.RefObject<HTMLDivElement>).current) return;

    const container = (ref as React.RefObject<HTMLDivElement>).current!;
    let counter = 50;

    for (let i = 0; i < counter; i++) {
      const hrElement = document.createElement("HR");

      hrElement.style.left =
        Math.floor(Math.random() * window.innerWidth) + "px";
      hrElement.style.animationDuration = 0.2 + Math.random() * 3 + "s";
      hrElement.style.animationDelay = Math.random() * 5 + "s";

      container.appendChild(hrElement);
    }
  }, [ref]);

  return <div ref={ref} className="absolute w-full h-full"></div>;
});

const Sunny = () => {
  const sunbeamCount = 12;
  const sunbeamLength = 1600;

  return (
    <div className="absolute w-full h-full flex justify-start items-start -left-42 -top-42">
      <motion.div
        className="rounded-full w-96 h-96 bg-yellow-300 opacity-70 relative"
        animate={{ rotate: 360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {Array.from({ length: sunbeamCount }, (_, index) => (
          <div
            key={index}
            className="absolute opacity-30 bg-yellow-300"
            style={{
              width: "50px",
              height: sunbeamLength + "px",
              top: "50%",
              left: "50%",
              transformOrigin: "0 0",
              transform: `rotate(${(index / sunbeamCount) * 360}deg)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const Cloudy = () => {
  const numClouds = 4;
  const [clouds, setClouds] = useState<number[]>([]);

  useEffect(() => {
    setClouds(
      Array.from(
        { length: numClouds },
        () => Math.floor(Math.random() * 300) + 100
      )
    );
  }, []);

  return (
    <div className="relative h-full w-full">
      {clouds.map((size, i) => (
        <div
          key={i}
          className="cloud absolute"
          style={{
            fontSize: `${size}px`,
          }}
        >
          ☁️
        </div>
      ))}
    </div>
  );
};

const Foggy = () => {
  const numClouds = 3;
  const [clouds, setClouds] = useState<{ size: number }[]>([]);

  useEffect(() => {
    setClouds(
      Array.from({ length: numClouds }, () => ({
        size: Math.floor(Math.random() * 1500) + 500,
      }))
    );
  }, []);

  return (
    <div className="relative h-full w-full opacity-50 overflow-hidden">
      {clouds.map(({ size }, i) => (
        <div
          key={i}
          className="fog absolute"
          style={{
            fontSize: `${size}px`,
            top: 0,
          }}
        >
          ☁️
        </div>
      ))}
    </div>
  );
};

const Windy = () => {
  const numLeaves = 5;
  const [leaves, setLeaves] = useState<
    { id: number; size: number; top: number; duration: number }[]
  >([]);

  useEffect(() => {
    const generateLeaves = () => {
      const newLeaves = Array.from({ length: numLeaves }, (_, i) => ({
        id: Date.now() + i,
        size: Math.floor(Math.random() * 100) + 25,
        top: Math.random() * 100,
        duration: Math.random() * 2 + 3,
      }));

      setLeaves(newLeaves);
      const maxDuration = Math.max(...newLeaves.map((l) => l.duration + 1));
      setTimeout(generateLeaves, maxDuration * 1000);
    };

    generateLeaves();

    return () => setLeaves([]);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {leaves.map(({ id, size, top, duration }) => (
        <div
          key={id}
          className="absolute leaf"
          style={{
            fontSize: `${size}px`,
            top: `${top}%`,
            left: "-10%",
            animation: `windy ${duration}s linear forwards`,
          }}
        >
          🍃
        </div>
      ))}
    </div>
  );
};

const Hot = () => {
  const numWaves = 5;
  const [waves, setWaves] = useState<
    { id: number; size: number; top: number; left: number }[]
  >([]);

  useEffect(() => {
    const generateWaves = () => {
      const newWaves = Array.from({ length: numWaves }, (_, i) => ({
        id: Date.now() + i,
        size: Math.floor(Math.random() * 100) + 75,
        top: Math.random() * 100,
        left: Math.random() * 100,
      }));

      setWaves(newWaves);
      setTimeout(generateWaves, 3000);
    };

    generateWaves();
    return () => setWaves([]);
  }, []);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-red-400/50 to-transparent to-20% overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-96 h-96 bg-radial-[at_100%_0%] from-orange-600 via-orange-300 to-yellow-300 to-90% border-8 border-amber-200 opacity-50" />
      {waves.map(({ id, size, top, left }) => (
        <div
          key={id}
          className="sizzle absolute text-gray-400 opacity-25"
          style={{
            fontSize: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
          }}
        >
          ⌇
        </div>
      ))}
    </div>
  );
};

const Cold = () => {
  const numFrost = 8;
  const [frost, setFrost] = useState<
    { size: number; top: number; left: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const generateFrost = () => {
      setFrost(
        Array.from({ length: numFrost }, () => ({
          size: Math.floor(Math.random() * 60) + 20,
          top: Math.random() * 100,
          left: Math.random() * 100,
          opacity: Math.random() * 0.5 + 0.3,
        }))
      );
    };

    generateFrost();
  }, []);

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-blue-400/50 to-transparent to-20% overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 rounded-lg border-[20px] border-transparent"
          style={{
            boxShadow: "0 0 50px 30px rgba(255, 255, 255, 0.3) inset",
            WebkitMaskImage:
              "radial-gradient(circle, rgba(255, 255, 255, 0.8) 60%, transparent 100%)",
            maskImage:
              "radial-gradient(circle, rgba(255, 255, 255, 0.8) 60%, transparent 100%)",
          }}
        />
      </div>
      {frost.map(({ size, top, left, opacity }, i) => (
        <div
          key={i}
          className="absolute frost"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            opacity,
          }}
        />
      ))}
    </div>
  );
};

const WeatherLayer = ({ weather }: { weather: string | null }) => {
  const weatherRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute h-full w-full pointer-events-none flex flex-col justify-center">
      {weather === "rainy" && <Rain ref={weatherRef} />}
      {weather === "sunny" && <Sunny />}
      {weather === "cloudy" && <Cloudy />}
      {weather === "snowy" && <Snowfall snowflakeCount={500} />}
      {weather === "foggy" && <Foggy />}
      {weather === "windy" && <Windy />}
      {weather === "hot" && <Hot />}
      {weather === "cold" && <Cold />}
    </div>
  );
};

export default WeatherLayer;
