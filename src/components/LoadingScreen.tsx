import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 1200) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 250);
      }
    }, 30);
    return () => clearInterval(id);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="font-orbitron text-3xl font-black tracking-[0.3em] neon-text">
          NEON.LINK
        </div>
        <div className="font-mono text-xs text-neon-cyan neon-text-cyan">
          [ INITIALIZING SYSTEM... {Math.floor(progress)}% ]
        </div>
        <div className="h-1 w-64 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-neon transition-all duration-100"
            style={{ width: `${progress}%`, boxShadow: "0 0 12px hsl(var(--neon-pink))" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
