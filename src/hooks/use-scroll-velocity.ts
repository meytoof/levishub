"use client";
import { useRef } from "react";

export function useScrollVelocity() {
  const velocityRef = useRef(0);

  const onScroll = (velocity: number) => {
    velocityRef.current = velocity;
  };

  return { velocityRef, onScroll };
}
