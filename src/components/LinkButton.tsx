import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { LinkItem } from "@/lib/storage";

type Props = { link: LinkItem; index: number };

const LinkButton = ({ link, index }: Props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
    setTimeout(() => window.open(link.url, "_blank", "noopener,noreferrer"), 200);
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    toast.success("Link copied to clipboard", {
      description: link.url,
    });
  };

  return (
    <a
      href={link.url}
      onClick={handleClick}
      className="group relative block animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`relative overflow-hidden rounded-xl glass p-4 transition-all duration-300
          hover:border-neon-pink hover:shadow-glow-pink hover:-translate-y-0.5
          active:scale-[0.98] ${clicked ? "animate-pulse-glow" : ""}`}
      >
        {/* Shimmer */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent group-hover:animate-shimmer" />

        {/* Left neon bar */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink opacity-60 group-hover:opacity-100 group-hover:w-1.5 transition-all" />

        <div className="relative flex items-center gap-3">
          <span className="text-2xl drop-shadow-[0_0_8px_hsl(var(--neon-purple))]">
            {link.emoji}
          </span>
          <span className="flex-1 font-rajdhani text-base font-semibold tracking-wide text-foreground group-hover:text-neon-pink transition-colors">
            {link.title}
          </span>

          <button
            onClick={handleCopy}
            aria-label="Copy link"
            className="rounded-md p-1.5 opacity-0 transition-all hover:bg-neon-cyan/20 hover:text-neon-cyan group-hover:opacity-100"
          >
            <Copy className="h-4 w-4" />
          </button>
          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
        </div>
      </div>
    </a>
  );
};

export default LinkButton;
