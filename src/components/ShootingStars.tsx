import { useState, useEffect, useCallback } from "react";

interface Star {
  id: number;
  zone: "left" | "right";
  startX: number;
  angle: number;
  duration: number;
  length: number;
  tx: number;
  ty: number;
}

let nextId = 0;

export default function ShootingStars({ theme }: { theme: "dark" | "rain" | "snow" | "light" }) {
  const [stars, setStars] = useState<Star[]>([]);

  const spawnStar = useCallback(() => {
    const zone: "left" | "right" = Math.random() < 0.5 ? "left" : "right";
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Angle in degrees: left zone goes down-right (30–50°), right zone goes down-left (130–150°)
    const angleDeg =
      zone === "left"
        ? 30 + Math.random() * 20
        : 130 + Math.random() * 20;
    const angleRad = (angleDeg * Math.PI) / 180;

    // Start position
    const startX =
      zone === "left"
        ? Math.random() * 192
        : viewportWidth - 192 + Math.random() * 192;

    // Travel distance: enough to fully exit the viewport bottom
    // vertical component needs to cover viewportHeight + buffer
    const verticalDistance = viewportHeight + 100;
    const travel = verticalDistance / Math.sin(angleRad < Math.PI / 2 ? angleRad : Math.PI - angleRad);

    // Translation components
    const tx = Math.cos(angleRad) * travel;
    const ty = Math.sin(angleRad) * travel;

    // Duration: 1.2–2.5s
    const duration = 1.2 + Math.random() * 1.3;

    // Tail length: 80–160px
    const length = 80 + Math.random() * 80;

    const star: Star = {
      id: nextId++,
      zone,
      startX,
      angle: angleDeg,
      duration,
      length,
      tx,
      ty,
    };

    setStars((prev) => [...prev, star]);
    setTimeout(() => {
      setStars((prev) => prev.filter((s) => s.id !== star.id));
    }, duration * 1000 + 100);
  }, []);

  useEffect(() => {
    if (theme !== "dark") return;
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 800 + Math.random() * 1700;
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
    <div className="shooting-stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`shooting-star shooting-star--${star.zone}`}
          style={{
            left: `${star.startX}px`,
            width: `${star.length}px`,
            "--duration": `${star.duration}s`,
            "--tx": `${star.tx}px`,
            "--ty": `${star.ty}px`,
            "--angle": `${star.zone === "left" ? star.angle : star.angle - 180}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
