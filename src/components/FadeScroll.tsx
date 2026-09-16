"use client";

import { useEffect } from "react";

export default function FadeScroll() {
  useEffect(() => {
    const items = () =>
      document.querySelectorAll<HTMLElement>("[data-fade-item]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items().forEach((el) => {
        el.style.setProperty("--sf-enter", "1");
        el.style.setProperty("--sf-leave", "0");
      });
      return;
    }

    const update = () => {
      const vh = window.innerHeight;

      items().forEach((el) => {
        if (el.closest("#experience")) return;

        const group = el.closest<HTMLElement>("[data-fade-group]") ?? el;
        const groupTop = group.getBoundingClientRect().top;
        const itemTop = el.getBoundingClientRect().top;
        const index = Number(el.dataset.fadeIndex ?? 0);
        const enter = groupTop < vh ? 1 : 0;
        const leave = itemTop < 0 ? 1 : 0;

        el.style.setProperty("--sf-i", String(Number.isFinite(index) ? index : 0));
        el.style.setProperty("--sf-enter", String(enter));
        el.style.setProperty("--sf-leave", String(leave));
      });
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
