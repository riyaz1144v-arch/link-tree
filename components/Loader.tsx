"use client";

import { LOADER_SESSION_KEY } from "@/lib/motion";
import { SITE } from "@/lib/links";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

type LoaderProps = {
  onComplete: () => void;
};

export function Loader({ onComplete }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [skip] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(LOADER_SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (skip) onComplete();
  }, [skip, onComplete]);

  useGSAP(
    () => {
      if (skip || !rootRef.current) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.documentElement.style.overflow = "hidden";

      const finish = () => {
        try {
          sessionStorage.setItem(LOADER_SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        document.documentElement.style.overflow = "";
        setVisible(false);
        onComplete();
      };

      if (reduced) {
        const t = gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.4,
          onComplete: finish,
        });
        const hard = window.setTimeout(() => {
          t.kill();
          finish();
        }, 3000);
        return () => window.clearTimeout(hard);
      }

      const counter = rootRef.current.querySelector<HTMLElement>("[data-counter]");
      const progress = rootRef.current.querySelector<HTMLElement>("[data-progress]");
      const label = rootRef.current.querySelector<HTMLElement>("[data-loader-label]");
      const line1 = rootRef.current.querySelector<HTMLElement>("[data-line-1]");
      const line2 = rootRef.current.querySelector<HTMLElement>("[data-line-2]");
      const panelLeft = rootRef.current.querySelector<HTMLElement>("[data-panel-left]");
      const panelRight = rootRef.current.querySelector<HTMLElement>("[data-panel-right]");

      const counterObj = { val: 0 };

      const tl = gsap.timeline({
        onComplete: finish,
        defaults: { ease: "power2.out" },
      });

      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.8,
          ease: "none",
          onUpdate: () => {
            if (counter) {
              counter.textContent = String(Math.round(counterObj.val)).padStart(3, "0");
            }
          },
        },
        0,
      );

      if (progress) {
        tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "none" }, 0);
      }

      if (line1 && line2) {
        gsap.set([line1, line2], { yPercent: 110 });
        tl.to(line1, { yPercent: 0, duration: 1, ease: "power3.out" }, 1);
        tl.to(line2, { yPercent: 0, duration: 1, ease: "power3.out" }, 1.05);
      }

      if (counter && label) {
        tl.to([counter, label], { opacity: 0, duration: 0.4 }, 2);
      }

      if (panelLeft && panelRight) {
        gsap.set(panelLeft, { xPercent: 0 });
        gsap.set(panelRight, { xPercent: 0 });
        tl.to(panelLeft, { xPercent: -105, duration: 0.4, ease: "power3.inOut" }, 2.4);
        tl.to(panelRight, { xPercent: 105, duration: 0.4, ease: "power3.inOut" }, 2.4);
      }

      tl.to(rootRef.current, { autoAlpha: 0, duration: 0.01 }, 2.8);

      const hardStop = window.setTimeout(() => {
        tl.progress(1, false);
      }, 3000);

      return () => {
        window.clearTimeout(hardStop);
        tl.kill();
        document.documentElement.style.overflow = "";
      };
    },
    { dependencies: [skip], scope: rootRef },
  );

  if (skip || !visible) return null;

  return (
    <div
      ref={rootRef}
      className="loader-root fixed inset-0 z-[100] flex flex-col bg-[var(--color-ground)] text-[var(--color-ink)]"
      aria-hidden={!visible}
    >
      <div className="relative flex flex-1 flex-col p-[var(--spacing-4)] md:p-[var(--spacing-5)]">
        <p
          data-loader-label
          className="text-label text-[10.5px] text-[var(--color-ink-secondary)]"
        >
          {SITE.wordmark}
        </p>

        <div className="mt-auto flex flex-col gap-[var(--spacing-2)] overflow-hidden">
          <div className="overflow-hidden">
            <p
              data-line-1
              className="font-display text-[clamp(2rem,8vw,4rem)] font-bold leading-none tracking-[-0.03em]"
            >
              {SITE.wordmarkLine1}
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              data-line-2
              className="font-display text-[clamp(2rem,8vw,4rem)] font-bold leading-none tracking-[-0.03em]"
            >
              {SITE.wordmarkLine2}
            </p>
          </div>
          <p
            data-counter
            className="font-display text-[var(--spacing-5)] font-semibold tabular-nums tracking-[-0.02em] md:text-[var(--spacing-6)]"
          >
            000
          </p>
        </div>
      </div>

      <div
        data-progress
        className="h-px origin-left bg-[var(--color-amber)]"
        style={{ transform: "scaleX(0)" }}
      />

      <div
        data-panel-left
        className="pointer-events-none absolute inset-y-0 left-0 w-[52vw] bg-[var(--color-ground)]"
        aria-hidden
      />
      <div
        data-panel-right
        className="pointer-events-none absolute inset-y-0 right-0 w-[52vw] bg-[var(--color-ground)]"
        aria-hidden
      />
    </div>
  );
}
