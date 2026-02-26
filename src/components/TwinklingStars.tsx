import { useState, useEffect, useCallback } from "react";

interface TwinkleStar {
  id: number;
  x: number;
  y: number;
}

let nextId = 0;

export default function TwinklingStars({ theme }: { theme: "dark" | "rain" | "snow" | "light" }) {
  const [stars, setStars] = useState<TwinkleStar[]>([]);

  const spawnStar = useCallback(() => {
    setStars((prev) => {
      if (prev.length >= 3) return prev;
      const star: TwinkleStar = {
        id: nextId++,
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      setTimeout(() => {
        setStars((p) => p.filter((s) => s.id !== star.id));
      }, 2100);
      return [...prev, star];
    });
  }, []);

  useEffect(() => {
    if (theme !== "dark") return;
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 1700 + Math.random() * 800;
      timeout = setTimeout(() => {
        spawnStar();
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, [spawnStar, theme]);

  useEffect(() => {
    if (theme !== "dark") setStars([]);
  }, [theme]);

  return (
    <div className="twinkle-stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="twinkle-star"
          style={{ left: `${star.x}%`, top: `${star.y}%`, transform: 'translate(-50%, -50%)' }}
        />
      ))}
    </div>
  );
}
