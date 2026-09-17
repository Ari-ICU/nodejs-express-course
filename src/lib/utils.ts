import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function getAssetUrl(path?: string): string {
  if (!path) return "";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (basePath && path.startsWith("/") && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }
  return path;
}

