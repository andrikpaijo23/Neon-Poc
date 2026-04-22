import { useState } from "react";
import { Lock } from "lucide-react";
import { DEFAULT_PIN, setAuthed } from "@/lib/storage";
import { toast } from "sonner";

const PinLogin = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(false);

  const update = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...pin];
    next[i] = v;
    setPin(next);
    if (v && i < 3) {
      const el = document.getElementById(`pin-${i + 1}`);
      el?.focus();
    }
    if (next.every((d) => d !== "")) submit(next.join(""));
  };

  const submit = (code: string) => {
    if (code === DEFAULT_PIN) {
      setAuthed(true);
      toast.success("ACCESS GRANTED", { description: "Welcome back, operator." });
      onSuccess();
    } else {
      setShake(true);
      toast.error("ACCESS DENIED", { description: "Invalid PIN sequence." });
      setTimeout(() => {
        setShake(false);
        setPin(["", "", "", ""]);
        document.getElementById("pin-0")?.focus();
      }, 500);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div
        className={`glass-strong w-full max-w-sm rounded-2xl p-8 animate-scale-in ${
          shake ? "animate-[glitch_0.3s_ease-in-out]" : ""
        }`}
        style={{ boxShadow: "var(--glow-purple)" }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-gradient-neon p-3 shadow-glow-purple">
            <Lock className="h-6 w-6 text-background" />
          </div>
          <h1 className="font-orbitron text-2xl font-black tracking-[0.2em] neon-text">
            ADMIN.SYS
          </h1>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            // Enter PIN to access control panel
          </p>

          <div className="mt-8 flex gap-3">
            {pin.map((d, i) => (
              <input
                key={i}
                id={`pin-${i}`}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => update(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !pin[i] && i > 0) {
                    document.getElementById(`pin-${i - 1}`)?.focus();
                  }
                }}
                className="h-14 w-12 rounded-lg border-2 border-neon-purple/40 bg-input text-center font-orbitron text-2xl font-bold text-neon-pink outline-none transition-all focus:border-neon-pink focus:shadow-glow-pink"
              />
            ))}
          </div>

          <p className="mt-6 font-mono text-[10px] text-muted-foreground">
            DEFAULT PIN: 1234
          </p>
        </div>
      </div>
    </div>
  );
};

export default PinLogin;
