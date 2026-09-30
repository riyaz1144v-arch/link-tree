"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const float = floatRef.current;
      if (!section || !float) return;

      const motionOk = document.documentElement.classList.contains("motion-ok");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!motionOk || reduced) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) return;

      gsap.to(float, {
        y: -48,
        rotation: 8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center py-[var(--spacing-8)]"
      aria-labelledby="statement-heading"
    >
      <div className="container-grid grid-12 relative w-full items-center">
        <div className="col-span-12 md:col-span-7">
          <p className="text-label mb-[var(--spacing-4)] text-[var(--color-amber)]">Links</p>
          <h2
            id="statement-heading"
            className="font-body max-w-[22ch] text-[length:var(--text-lede)] leading-[var(--text-lede--line-height)] font-normal text-[var(--color-ink)]"
          >
            Everything you need to reach me, in{" "}
            <span className="text-[var(--color-amber)]">one place</span>.
          </h2>
        </div>

        <div
          className="pointer-events-none absolute -right-[8%] top-1/2 hidden -translate-y-1/2 md:block"
          aria-hidden
        >
          <p
            className="font-display select-none text-[clamp(6rem,18vw,12rem)] font-extrabold leading-none tracking-[-0.03em]"
            style={{
              WebkitTextStroke: "1px rgb(237 231 220 / 0.2)",
              color: "transparent",
            }}
          >
            02
          </p>
        </div>

        <div
          ref={floatRef}
          className="col-span-12 mt-[var(--spacing-6)] md:col-span-5 md:mt-0 md:justify-self-end"
        >
          <div className="relative ml-auto h-[200px] w-[200px] overflow-hidden rounded-full opacity-50 md:h-[280px] md:w-[280px]">
            <Image
              src="/images/riyaz.jpg"
              alt=""
              fill
              sizes="280px"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
