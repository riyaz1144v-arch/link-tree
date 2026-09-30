"use client";

import { useLayoutEffect } from "react";

export function MotionInit() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      document.documentElement.classList.add("motion-ok");
      window.dispatchEvent(new Event("motion-ready"));
    }
  }, []);

  return null;
}
