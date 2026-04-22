import type { ProfileData } from "@/lib/storage";

const ProfileCard = ({ profile }: { profile: ProfileData }) => {
  const initials = profile.name
    .split(/\s|_/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center text-center animate-fade-in-down">
      <div className="relative mb-4 animate-float">
        <div className="absolute inset-0 rounded-full bg-gradient-neon blur-xl opacity-70 animate-pulse-glow" />
        <div className="relative h-28 w-28 rounded-full p-[2px] bg-gradient-neon">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-background">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-orbitron text-3xl font-black neon-text">{initials || "?"}</span>
            )}
          </div>
        </div>
        <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-neon-cyan ring-2 ring-background"
          style={{ boxShadow: "0 0 10px hsl(var(--neon-cyan))" }}
        />
      </div>

      <h1 className="font-orbitron text-2xl font-black tracking-[0.15em] neon-text">
        @{profile.name}
      </h1>
      <p className="mt-2 max-w-sm font-mono text-sm text-muted-foreground">{profile.bio}</p>
    </div>
  );
};

export default ProfileCard;
