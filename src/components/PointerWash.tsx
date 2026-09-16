"use client";

import { useEffect, useRef } from "react";

export default function PointerWash({ tone = "light" }: { tone?: "light" | "dark" }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 50, y: 42 });
  const glow = useRef({ x: 50, y: 42 });
  const bloom = useRef({ x: 58, y: 36 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.style.setProperty("--mx", "50%");
      root.style.setProperty("--my", "42%");
      root.style.setProperty("--bx", "62%");
      root.style.setProperty("--by", "30%");
      return;
    }

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const host = root.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      target.current.x = ((event.clientX - rect.left) / rect.width) * 100;
      target.current.y = ((event.clientY - rect.top) / rect.height) * 100;
    };

    const tick = () => {
      const t = target.current;
      glow.current.x += (t.x - glow.current.x) * 0.09;
      glow.current.y += (t.y - glow.current.y) * 0.09;
      bloom.current.x += (t.x - bloom.current.x) * 0.035;
      bloom.current.y += (t.y - bloom.current.y) * 0.035;

      root.style.setProperty("--mx", `${glow.current.x}%`);
      root.style.setProperty("--my", `${glow.current.y}%`);
      root.style.setProperty("--bx", `${bloom.current.x}%`);
      root.style.setProperty("--by", `${bloom.current.y}%`);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`pointer-wash${tone === "dark" ? " pointer-wash--dark" : ""}`}
      aria-hidden="true"
    >
      <div className="pointer-wash__glow" />
      <div className="pointer-wash__bloom" />
      <div className="pointer-wash__dots" />
    </div>
  );
}
