"use client";

import { Copy, Check } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type CopyButtonProps = {
  value: string;
  label: string;
};

export function CopyButton({ value, label }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (event: React.MouseEvent | React.KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();

      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setState("copied");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setState("idle"), 1600);
    },
    [value],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      void copy(event);
    }
  };

  return (
    <>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Copied" : ""}
      </span>
      <button
        type="button"
        onClick={copy}
        onKeyDown={onKeyDown}
        aria-label={
          state === "copied" ? `${label} copied to clipboard` : `Copy ${label}`
        }
        className="relative z-10 inline-flex min-h-[var(--spacing-7)] min-w-[var(--spacing-7)] shrink-0 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-hairline)] px-[var(--spacing-3)] text-label text-[var(--color-ink-secondary)] transition-[color,border-color,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] active:scale-[0.98] motion-reduce:transition-none"
      >
        {state === "copied" ? (
          <Check size={16} strokeWidth={1.5} aria-hidden />
        ) : (
          <Copy size={16} strokeWidth={1.5} aria-hidden />
        )}
        <span className="ml-[var(--spacing-2)] hidden sm:inline">
          {state === "copied" ? "Copied" : "Copy"}
        </span>
      </button>
    </>
  );
}
