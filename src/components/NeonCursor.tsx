import { useEffect, useRef } from "react";

const NeonCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0, y = 0, rx = 0, ry = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-neon-pink hidden md:block"
        style={{ boxShadow: "0 0 10px hsl(var(--neon-pink)), 0 0 20px hsl(var(--neon-pink))" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border border-neon-cyan hidden md:block"
        style={{ boxShadow: "0 0 15px hsl(var(--neon-cyan) / 0.6)" }}
      />
    </>
  );
};

export default NeonCursor;
