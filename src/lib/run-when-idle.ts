/**
 * Runs `cb` once the main thread is idle (after first paint), with a timeout
 * so it always runs. Used to keep non-critical animation setup (Lenis,
 * below-the-fold ScrollTriggers) out of the initial load — the visitor sees
 * no difference, but the page becomes interactive sooner (lower TBT).
 * Returns a cancel function for effect cleanups.
 */
export function runWhenIdle(cb: () => void, timeout = 1200): () => void {
  if (typeof window === "undefined") return () => {};
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 200);
  return () => clearTimeout(id);
}
