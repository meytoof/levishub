"use client";
import { useEffect, useRef, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SplitHeadingProps {
  children: string | React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  triggerOnLoad?: boolean;
  style?: React.CSSProperties;
}

export function SplitHeading({
  children,
  as: Tag = "h1",
  className = "",
  delay = 0,
  triggerOnLoad = false,
  style,
}: SplitHeadingProps) {
  const containerRef = useRef<HTMLElement>(null);
  const textContent = typeof children === "string" ? children : String(children);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLSpanElement>(".char-inner");

    if (triggerOnLoad) {
      gsap.fromTo(
        chars,
        { y: "110%" },
        {
          y: "0%",
          ease: "expo.out",
          duration: 1.0,
          stagger: 0.025,
          delay,
        }
      );
    } else {
      gsap.fromTo(
        chars,
        { y: "110%" },
        {
          y: "0%",
          ease: "expo.out",
          duration: 1.0,
          stagger: 0.025,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textContent, delay, triggerOnLoad]);

  const words = textContent.split(" ");

  return (
    <Tag ref={containerRef} className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.25em]">
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="inline-block overflow-hidden"
              style={{ verticalAlign: "bottom" }}
            >
              <span className="char-inner inline-block">{char}</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
