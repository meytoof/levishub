"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorState = "default" | "link" | "image" | "magnetic";

export function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const stateRef = useRef<CursorState>("default");
  const labelRef = useRef<HTMLSpanElement>(null);

  const springX = useSpring(cursorX, { stiffness: 800, damping: 35 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 35 });

  const scaleSpring = useSpring(1, { stiffness: 400, damping: 28 });
  const opacitySpring = useSpring(1, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor") as CursorState | null;
      if (cursorType === "link") {
        scaleSpring.set(4);
        stateRef.current = "link";
      } else if (cursorType === "image") {
        scaleSpring.set(3);
        if (labelRef.current) labelRef.current.textContent = "+";
        stateRef.current = "image";
      } else if (cursorType === "magnetic") {
        scaleSpring.set(2.5);
        stateRef.current = "magnetic";
      }
    };

    const handleLeave = () => {
      scaleSpring.set(1);
      opacitySpring.set(1);
      if (labelRef.current) labelRef.current.textContent = "";
      stateRef.current = "default";
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, [cursorX, cursorY, scaleSpring, opacitySpring]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        scale: scaleSpring,
      }}
    >
      <motion.div
        className="w-[6px] h-[6px] rounded-full bg-white mix-blend-difference"
        style={{ opacity: opacitySpring }}
      >
        <span ref={labelRef} className="absolute inset-0 flex items-center justify-center text-[2px] font-bold text-black" />
      </motion.div>
    </motion.div>
  );
}
