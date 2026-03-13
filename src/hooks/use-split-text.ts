"use client";
import { useRef } from "react";

export function useSplitText(text: string) {
  const containerRef = useRef<HTMLElement>(null);
  const chars = text.split("");
  return { chars, containerRef };
}
