const CyberBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Animated neon grid */}
      <div className="absolute inset-0 neon-grid animate-grid-move opacity-60" />

      {/* Glow orbs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-neon-purple/30 blur-[120px] animate-float" />
      <div
        className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-neon-cyan/25 blur-[120px] animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-neon-pink/25 blur-[120px] animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-neon-cyan animate-float"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 5) * 0.7}s`,
            animationDuration: `${4 + (i % 4)}s`,
            boxShadow: "0 0 8px hsl(var(--neon-cyan))",
            opacity: 0.7,
          }}
        />
      ))}

      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, hsl(var(--neon-cyan)) 0, hsl(var(--neon-cyan)) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
};

export default CyberBackground;
