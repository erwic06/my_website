import { useRef, useEffect } from "react";

type Theme = "dark" | "rain" | "snow" | "light";

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  drift: number;
}

interface Snowflake {
  x: number;
  y: number;
  speed: number;
  radius: number;
  phase: number;
  phaseSpeed: number;
}

function createRainDrops(width: number, height: number): RainDrop[] {
  const drops: RainDrop[] = [];
  for (let i = 0; i < 200; i++) {
    drops.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 4 + Math.random() * 6,
      length: 10 + Math.random() * 20,
      drift: -0.5 + Math.random() * 1,
    });
  }
  return drops;
}

function createSnowflakes(width: number, height: number): Snowflake[] {
  const flakes: Snowflake[] = [];
  for (let i = 0; i < 150; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.5 + Math.random() * 1.5,
      radius: 1 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.01 + Math.random() * 0.02,
    });
  }
  return flakes;
}

export default function WeatherCanvas({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<RainDrop[] | Snowflake[]>([]);

  const isWeather = theme === "rain" || theme === "snow";

  // Canvas animation loop
  useEffect(() => {
    if (!isWeather) {
      // Cancel any running loop
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize particles on resize
      if (theme === "rain") {
        particlesRef.current = createRainDrops(canvas.width, canvas.height);
      } else {
        particlesRef.current = createSnowflakes(canvas.width, canvas.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        loop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    function loop() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (theme === "rain") {
        const drops = particlesRef.current as RainDrop[];
        ctx.strokeStyle = "rgba(174, 194, 224, 0.5)";
        ctx.lineWidth = 1;
        for (const drop of drops) {
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + drop.drift, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x += drop.drift;

          if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
          }
          if (drop.x < 0) drop.x = canvas.width;
          if (drop.x > canvas.width) drop.x = 0;
        }
      } else {
        const flakes = particlesRef.current as Snowflake[];
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        for (const flake of flakes) {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fill();

          flake.y += flake.speed;
          flake.phase += flake.phaseSpeed;
          flake.x += Math.sin(flake.phase) * 0.5;

          if (flake.y > canvas.height + flake.radius) {
            flake.y = -flake.radius;
            flake.x = Math.random() * canvas.width;
          }
          if (flake.x < 0) flake.x = canvas.width;
          if (flake.x > canvas.width) flake.x = 0;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    if (!document.hidden) {
      loop();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [theme, isWeather]);

  // Accumulation effect
  useEffect(() => {
    const el = accRef.current;
    if (!el) return;

    if (!isWeather) {
      // Snap reset: remove filling, apply reset class to kill transition, force reflow, remove reset
      el.classList.remove("accumulation-layer--filling");
      el.classList.add("accumulation-layer--reset");
      // Force reflow so the browser applies the reset
      void el.offsetHeight;
      el.classList.remove("accumulation-layer--reset");
      return;
    }

    // Start accumulation: wait one frame so translateY(100%) paints first
    const raf = requestAnimationFrame(() => {
      el.classList.add("accumulation-layer--filling");
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [theme, isWeather]);

  return (
    <>
      {isWeather && (
        <canvas ref={canvasRef} className="weather-canvas" />
      )}
      <div
        ref={accRef}
        className="accumulation-layer"
        style={{
          background:
            theme === "rain"
              ? "linear-gradient(to top, rgba(30, 60, 114, 0.3), rgba(30, 60, 114, 0))"
              : theme === "snow"
                ? "linear-gradient(to top, rgba(220, 230, 240, 0.25), rgba(220, 230, 240, 0))"
                : "none",
        }}
      />
    </>
  );
}
