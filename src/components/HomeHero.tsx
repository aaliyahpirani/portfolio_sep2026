"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HomeHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const target = useRef({ mx: 50, my: 38, leave: 0 });
  const current = useRef({ mx: 50, my: 38, leave: 0 });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.mx += (t.mx - c.mx) * 0.07;
      c.my += (t.my - c.my) * 0.07;
      c.leave += (t.leave - c.leave) * 0.02;

      root.style.setProperty("--mx", `${c.mx}%`);
      root.style.setProperty("--my", `${c.my}%`);
      root.style.setProperty("--home-leave", c.leave.toFixed(4));
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const rect = root.getBoundingClientRect();
      const threshold = Number.parseFloat(
        getComputedStyle(root).getPropertyValue("--home-leave-threshold"),
      );
      const span = Math.max(rect.height * (Number.isFinite(threshold) ? threshold : 0.62), 1);
      target.current.leave = Math.min(1, Math.max(0, -rect.top / span));
    };

    onScroll();
    frame = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="home-hero relative"
      onMouseMove={(event) => {
        const root = rootRef.current;
        if (!root || !window.matchMedia("(pointer: fine)").matches) return;
        const rect = root.getBoundingClientRect();
        target.current.mx = ((event.clientX - rect.left) / rect.width) * 100;
        target.current.my = ((event.clientY - rect.top) / rect.height) * 100;
      }}
      onMouseLeave={() => {
        target.current.mx = 50;
        target.current.my = 38;
      }}
    >
      <div className="home-spotlight" aria-hidden="true" />

      <div className="home-stage">
        <div className="home-portrait-panel">
          <div className="home-leave home-leave--portrait">
            <div className="home-enter home-enter--portrait">
              <Image
                src="/portrait.jpg"
                alt="Aaliyah Pirani"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="home-portrait-image"
                priority
              />
            </div>
          </div>
        </div>

        <div className="home-copy-col">
          <div className="home-leave home-leave--title">
            <h1
              className="home-enter home-enter--title home-names font-playfair text-foreground"
              aria-label="Aaliyah Pirani"
            >
              <span className="home-name">
                Aali<span className="font-playfair-italic">yah</span>
              </span>
              <span className="home-name">
                Pir<span className="font-playfair-italic">ani</span>
              </span>
            </h1>
          </div>
          <div className="home-leave home-leave--copy">
            <p className="home-enter home-enter--copy mt-4 font-montserrat text-xl text-foreground-red">
              Third year HBSc student in Computer Science and Quantitative Biology at
              the University of Toronto
            </p>
          </div>
          <div className="home-leave home-leave--meta">
            <p className="home-enter home-enter--meta max-w-md pt-4 pb-10 font-garamond text-xl text-foreground">
              Graduating in April 2028
            </p>
          </div>
          <div className="home-leave home-leave--actions">
            <div className="home-enter home-enter--actions mt-10 flex flex-row gap-17">
              <a
                href="/AaliyahPirani_Resume.pdf"
                download="AaliyahPirani_Resume.pdf"
                className="border border-accent-red bg-background px-14 py-3 font-montserrat text-md text-accent-red shadow-[6px_6px_0_0_#45151b]"
              >
                Resume
              </a>
              <a
                href="#contact"
                className="border border-accent-red bg-background px-14 py-3 font-montserrat text-md text-accent-red shadow-[6px_6px_0_0_#45151b]"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
