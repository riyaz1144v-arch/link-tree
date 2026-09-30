"use client";

import { SITE } from "@/lib/links";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function PortalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const measuredRef = useRef(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("motion-ok")) {
      setMotionReady(true);
      return;
    }
    const onReady = () => setMotionReady(true);
    window.addEventListener("motion-ready", onReady);
    return () => window.removeEventListener("motion-ready", onReady);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !motionReady) return;

      const panelLeft = stage.querySelector<HTMLElement>(".hero-panel-left");
      const panelRight = stage.querySelector<HTMLElement>(".hero-panel-right");
      const photo = stage.querySelector<HTMLElement>(".hero-photo-layer");
      const duotone = stage.querySelector<HTMLElement>(".hero-duotone");
      const dotA = stage.querySelector<HTMLElement>("[data-dot-a]");
      const dotB = stage.querySelector<HTMLElement>("[data-dot-b]");
      const title = stage.querySelector<HTMLElement>("[data-hero-title]");
      const spanLeft = stage.querySelector<HTMLElement>("[data-span-left]");
      const spanRight = stage.querySelector<HTMLElement>("[data-span-right]");

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const endDistance = isMobile ? "+=140%" : "+=250%";

      gsap.set(panelLeft, { xPercent: 0 });
      gsap.set(panelRight, { xPercent: 0 });
      gsap.set(photo, { scale: 1.15 });
      gsap.set(duotone, { opacity: 0 });

      let startLeft = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: endDistance,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (measuredRef.current || process.env.NODE_ENV !== "development") return;
            if (!spanLeft) return;
            if (self.scroll() > 700) {
              const travel = Math.abs(spanLeft.getBoundingClientRect().left - startLeft);
              measuredRef.current = true;
              if (travel > 100) {
                console.info(`[PortalHero] Travel after 700px scroll: ${Math.round(travel)}px`);
              }
            }
          },
        },
      });

      if (spanLeft) {
        startLeft = spanLeft.getBoundingClientRect().left;
      }

      tl.to(panelLeft, { xPercent: -105, ease: "none" }, 0);
      tl.to(panelRight, { xPercent: 105, ease: "none" }, 0);
      tl.to(photo, { scale: 1, ease: "none" }, 0);
      tl.to(duotone, { opacity: 0.25, ease: "none" }, 0);

      if (dotA && dotB) {
        tl.to(dotA, { x: "-42vw", y: "-38vh", ease: "none" }, 0);
        tl.to(dotB, { x: "42vw", y: "38vh", ease: "none" }, 0);
      }

      if (title && spanLeft && spanRight) {
        tl.to(title, { scale: 1.15, ease: "none" }, 0);
        tl.to(title, { letterSpacing: "-0.05em", ease: "none" }, 0);
        tl.to(spanLeft, { x: () => -spanLeft.offsetWidth * 0.5, ease: "none" }, 0);
        tl.to(spanRight, { x: () => spanRight.offsetWidth * 0.5, ease: "none" }, 0);
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [imageLoaded, motionReady] },
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[250vh] md:h-[250vh]"
      aria-label="Introduction"
    >
      <div
        ref={stageRef}
        className="sticky top-0 isolate h-[100dvh] overflow-hidden bg-[var(--color-ground)]"
      >
        <div className="absolute inset-0">
          <div
            className={`hero-photo-layer absolute inset-0 transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-out)] ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src="/images/riyaz.jpg"
              alt="Portrait of SK Riyaz Rahaman"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_20%]"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          {!imageLoaded && (
            <div
              className="absolute inset-0 bg-[var(--color-ground-secondary)]"
              aria-hidden
            />
          )}
          <div
            className="hero-duotone pointer-events-none absolute inset-0 opacity-0"
            style={{
              background:
                "linear-gradient(135deg, rgb(232 145 60 / 0.55), rgb(46 107 114 / 0.55))",
              mixBlendMode: "overlay",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, rgb(10 12 14 / 0.85) 100%)",
            }}
            aria-hidden
          />
        </div>

        <div
          className="hero-panel-left pointer-events-none absolute inset-y-0 left-0 z-[4] w-[52vw] bg-[var(--color-ground)]"
          aria-hidden
        />
        <div
          className="hero-panel-right pointer-events-none absolute inset-y-0 right-0 z-[4] w-[52vw] bg-[var(--color-ground)]"
          aria-hidden
        />

        <div
          data-dot-a
          className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[var(--spacing-2)] w-[var(--spacing-2)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-amber)]"
          aria-hidden
        />
        <div
          data-dot-b
          className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[var(--spacing-2)] w-[var(--spacing-2)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-teal)]"
          aria-hidden
        />

        <div className="relative z-[6] flex h-full flex-col p-[var(--spacing-4)] md:p-[var(--spacing-5)]">
          <div className="flex justify-between gap-[var(--spacing-3)] text-label text-[10.5px] text-[var(--color-ink-secondary)]">
            <span>
              Portfolio <span className="text-[var(--color-muted)]">/</span> Links
            </span>
            <span>{SITE.year}</span>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <h1
              data-hero-title
              className="font-display flex flex-wrap items-baseline justify-center gap-x-[0.35em] text-[clamp(2.25rem,7vw,5rem)] font-bold leading-none tracking-[-0.02em]"
            >
              <span data-span-left>{SITE.wordmarkLine1}</span>
              <span data-span-right>{SITE.wordmarkLine2}</span>
            </h1>
          </div>

          <div className="flex justify-between text-label text-[10.5px] text-[var(--color-ink-secondary)]">
            <span>Scroll</span>
            <span>
              01 <span className="text-[var(--color-muted)]">/</span> 04
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
