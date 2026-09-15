"use client";

import { useEffect, useRef, useState } from "react";

const HEADLINE = "Something you probably wouldn’t have guessed about me...";
const BODY = "I got my private pilot’s license through the air cadet program when I was 17!";
const ITALIC = "private pilot’s license";

function typedBody(shown: string) {
  const start = BODY.indexOf(ITALIC);
  const end = start + ITALIC.length;
  const before = shown.slice(0, Math.min(shown.length, start));
  const italic = shown.slice(start, Math.min(shown.length, end));
  const after = shown.slice(end);

  return (
    <>
      {before}
      {italic ? <span className="italic">{italic}</span> : null}
      {shown.length > end ? after : null}
    </>
  );
}

export default function PilotLicense() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [phase, setPhase] = useState<"idle" | "headline" | "body" | "done">("idle");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.style.setProperty("--band-enter", "1");
      root.style.setProperty("--band-leave", "0");
      setHeadline(HEADLINE);
      setBody(BODY);
      setPhase("done");
      return;
    }

    let started = false;
    let frame = 0;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const fadeIn = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.42)));
      const leaveSpan = Math.max(rect.height * 0.85, 1);
      const fadeOut = Math.min(1, Math.max(0, -rect.top / leaveSpan));
      root.style.setProperty("--band-enter", fadeIn.toFixed(4));
      root.style.setProperty("--band-leave", fadeOut.toFixed(4));
      root.style.setProperty("--stripe-x", `${(-window.scrollY * 0.4).toFixed(1)}px`);

      if (!started && fadeIn > 0.35) {
        started = true;
        setPhase("headline");
      }
    };

    const tick = () => {
      update();
      frame = requestAnimationFrame(tick);
    };

    update();
    frame = requestAnimationFrame(tick);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (phase !== "headline" && phase !== "body") return;

    const source = phase === "headline" ? HEADLINE : BODY;
    const setter = phase === "headline" ? setHeadline : setBody;
    let i = 0;

    const id = window.setInterval(() => {
      i += 1;
      setter(source.slice(0, i));
      if (i >= source.length) {
        window.clearInterval(id);
        setPhase(phase === "headline" ? "body" : "done");
      }
    }, phase === "headline" ? 28 : 22);

    return () => window.clearInterval(id);
  }, [phase]);

  return (
    <div ref={rootRef} className="home-band relative bg-accent-mauve">
      <div
        className="accent-stripes home-band-item home-band-item--stripes pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative">
        <h1
          className="home-band-item home-band-item--headline px-6 pt-12 pb-2 text-center text-2xl font-serif text-background"
          aria-label={HEADLINE}
        >
          {headline}
          {phase === "headline" ? <span className="home-type-caret" aria-hidden="true" /> : null}
        </h1>
        <p
          className="home-band-item home-band-item--body px-6 pb-12 text-center font-serif text-sm tracking-wide text-background"
          aria-label={BODY}
        >
          {typedBody(body)}
          {phase === "body" ? <span className="home-type-caret" aria-hidden="true" /> : null}
        </p>
      </div>
    </div>
  );
}
