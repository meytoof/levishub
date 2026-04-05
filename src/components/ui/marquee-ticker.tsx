"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeTickerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function MarqueeTicker({
  children,
  speed = 20,
  direction = "left",
  className = "",
}: MarqueeTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const track = trackRef.current;
    if (!track) return;

    const xPercent = direction === "left" ? -50 : 50;
    tweenRef.current = gsap.to(track, {
      xPercent,
      repeat: -1,
      ease: "none",
      duration: speed,
    });

    const handleMouseEnter = () => tweenRef.current?.pause();
    const handleMouseLeave = () => tweenRef.current?.play();

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tweenRef.current?.kill();
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [speed, direction]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <span className="flex-shrink-0">{children}</span>
        <span className="flex-shrink-0">{children}</span>
      </div>
    </div>
  );
}
