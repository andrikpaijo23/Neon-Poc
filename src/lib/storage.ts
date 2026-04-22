export type LinkItem = {
  id: string;
  title: string;
  url: string;
  emoji: string;
  enabled: boolean;
};

export type ProfileData = {
  name: string;
  bio: string;
  avatar: string;
};

const LINKS_KEY = "cyber_links";
const PROFILE_KEY = "cyber_profile";
const AUTH_KEY = "cyber_auth";

export const DEFAULT_PIN = "1234";

const defaultLinks: LinkItem[] = [
  { id: "1", title: "My Portfolio", url: "https://example.com", emoji: "🌐", enabled: true },
  { id: "2", title: "Twitter / X", url: "https://twitter.com", emoji: "🐦", enabled: true },
  { id: "3", title: "GitHub", url: "https://github.com", emoji: "💻", enabled: true },
  { id: "4", title: "Discord Server", url: "https://discord.com", emoji: "🎮", enabled: true },
  { id: "5", title: "Buy Me a Coffee", url: "https://buymeacoffee.com", emoji: "☕", enabled: true },
];

const defaultProfile: ProfileData = {
  name: "NEON_USER",
  bio: "// Welcome to the grid. Connect with me across the digital frontier.",
  avatar: "",
};

export const getLinks = (): LinkItem[] => {
  try {
    const raw = localStorage.getItem(LINKS_KEY);
    if (!raw) {
      localStorage.setItem(LINKS_KEY, JSON.stringify(defaultLinks));
      return defaultLinks;
    }
    return JSON.parse(raw);
  } catch {
    return defaultLinks;
  }
};

export const saveLinks = (links: LinkItem[]) => {
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
};

export const getProfile = (): ProfileData => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
      return defaultProfile;
    }
    return JSON.parse(raw);
  } catch {
    return defaultProfile;
  }
};

export const saveProfile = (profile: ProfileData) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const isAuthed = (): boolean => sessionStorage.getItem(AUTH_KEY) === "1";
export const setAuthed = (v: boolean) => {
  if (v) sessionStorage.setItem(AUTH_KEY, "1");
  else sessionStorage.removeItem(AUTH_KEY);
};
