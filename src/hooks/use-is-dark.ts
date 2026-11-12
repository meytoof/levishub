"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Returns true when the resolved theme is dark — but only after mount.
 *
 * Reading `resolvedTheme` directly during render causes a hydration mismatch:
 * the server always renders the light variant, the client's first render
 * already knows the theme, and React keeps the server's inline styles
 * (it does not patch attribute mismatches). The result was light panel
 * backgrounds stuck under white dark-mode text. Gating on `mounted`
 * makes the first client render match the server, then re-renders with
 * the real theme.
 */
export function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && resolvedTheme === "dark";
}
