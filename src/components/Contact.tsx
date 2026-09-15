"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const target = useRef({ mx: 50, my: 38 });
  const current = useRef({ mx: 50, my: 38 });

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
      root.style.setProperty("--mx", `${c.mx}%`);
      root.style.setProperty("--my", `${c.my}%`);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
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

      <h2 className="relative z-[2] text-center text-5xl text-foreground md:text-6xl">
        <span className="font-playfair pr-4 text-7xl">Contact</span>
        <span className="ml-2 font-serif">me</span>
      </h2>

      <p className="relative z-[2] mt-8 max-w-3xl text-center font-serif leading-relaxed text-foreground">
        If you would like to get in touch, fill out the form below and I will get
        back to you.
      </p>

      <form className="relative z-[2] mt-12 flex w-full max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <label className="flex min-w-0 flex-1 flex-col gap-2 font-serif text-foreground">
            Full Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              className="border border-accent-red bg-background px-4 py-3 font-serif text-foreground shadow-[6px_6px_0_0_#45151b] outline-none"
            />
          </label>

          <label className="flex min-w-0 flex-1 flex-col gap-2 font-serif text-foreground">
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="border border-accent-red bg-background px-4 py-3 font-serif text-foreground shadow-[6px_6px_0_0_#45151b] outline-none"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 font-serif text-foreground">
          Message
          <textarea
            name="message"
            rows={8}
            className="resize-y border border-accent-red bg-background px-4 py-3 font-serif text-foreground shadow-[6px_6px_0_0_#45151b] outline-none"
          />
        </label>

        <button
          type="button"
          className="mt-4 self-center border border-accent-red bg-background px-16 py-5 font-serif text-xl text-accent-red shadow-[6px_6px_0_0_#45151b]"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
