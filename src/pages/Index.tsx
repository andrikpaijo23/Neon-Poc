import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import CyberBackground from "@/components/CyberBackground";
import LoadingScreen from "@/components/LoadingScreen";
import NeonCursor from "@/components/NeonCursor";
import ProfileCard from "@/components/ProfileCard";
import LinkButton from "@/components/LinkButton";
import { getLinks, getProfile, type LinkItem, type ProfileData } from "@/lib/storage";

const Index = () => {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    setLinks(getLinks());
    setProfile(getProfile());

    const onStorage = () => {
      setLinks(getLinks());
      setProfile(getProfile());
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onStorage);
    };
  }, []);

  if (!profile) return <LoadingScreen />;

  const visibleLinks = links.filter((l) => l.enabled);

  return (
    <>
      <LoadingScreen />
      <NeonCursor />
      <CyberBackground />

      <main className="relative min-h-screen px-4 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-md">
          <ProfileCard profile={profile} />

          <div className="mt-10 space-y-3">
            {visibleLinks.length === 0 ? (
              <p className="text-center font-mono text-sm text-muted-foreground">
                // No active links yet. Visit /admin to add some.
              </p>
            ) : (
              visibleLinks.map((link, i) => <LinkButton key={link.id} link={link} index={i} />)
            )}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 text-center animate-fade-in" style={{ animationDelay: "600ms" }}>
            <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              ━━━ POWERED BY NEON.LINK ━━━
            </div>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              <Shield className="h-3 w-3" /> admin
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
