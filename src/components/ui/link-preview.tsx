"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import * as React from "react";
import { createPortal } from "react-dom";

interface LinkPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string;
  children: React.ReactNode;
}

// Constructeur d'URL Microlink pour générer un screenshot distant
const buildMicrolinkUrl = (url: string) => {
  const base = "https://api.microlink.io";
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
  });
  return `${base}?${params.toString()}`;
};

// Link preview : rendu en Portal pour échapper à overflow-hidden des parents
export const LinkPreview = ({
  url,
  children,
  className,
  ...rest
}: LinkPreviewProps) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const previewUrl = buildMicrolinkUrl(url);

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 12,
      left: rect.left + rect.width / 2,
    });
  }, []);

  React.useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  const previewContent =
    typeof document !== "undefined" &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none fixed z-[9999] w-80 rounded-xl border border-neutral-800/80 bg-black/90 p-3 shadow-2xl backdrop-blur-2xl"
            style={{
              top: position.top,
              left: position.left,
              transform: `translateX(-50%)`,
              willChange: "transform, opacity",
            }}
          >
            <div className="overflow-hidden rounded-lg border border-white/10 mb-2">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={previewUrl}
                  alt={url}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <div
      ref={triggerRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
      {previewContent}
    </div>
  );
};
