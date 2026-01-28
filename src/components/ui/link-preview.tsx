"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import * as React from "react";

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

// Link preview : petite carte avec screenshot + URL
export const LinkPreview = ({
  url,
  children,
  className,
  ...rest
}: LinkPreviewProps) => {
  const [open, setOpen] = React.useState(false);
  const [cursorX, setCursorX] = React.useState<number | null>(null);
  const previewUrl = buildMicrolinkUrl(url);

  return (
    <div
      className={cn("relative inline-block", className)}
      onMouseEnter={(e) => {
        setOpen(true);
        const rect = (
          e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setCursorX(x);
      }}
      onMouseMove={(e) => {
        if (!open) return;
        const rect = (
          e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setCursorX(x);
      }}
      onMouseLeave={() => {
        setOpen(false);
        setCursorX(null);
      }}
      {...rest}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute top-full z-50 mt-3 w-80 rounded-xl border border-neutral-800/80 bg-black/90 p-3 shadow-2xl backdrop-blur-2xl"
            style={{
              left: `${cursorX ?? 50}%`,
              transform: "translateX(-50%)",
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
      </AnimatePresence>
    </div>
  );
};
