"use client";

import { useEffect, useRef } from "react";

const roles: {
  title: string;
  date: string;
  description: string;
  stemColor: string;
}[] = [
  {
    title: "Role one",
    date: "2025 — Present",
    description: "Swap this for a team, what you worked on, and what you shipped.",
    stemColor: "red",
  },
  {
    title: "Role two",
    date: "2024 — 2025",
    description: "A second role. Keep adding objects to the roles array.",
    stemColor: "mauve",
  },
  {
    title: "Role three",
    date: "2023 — 2024",
    description: "A third writeup. Click a node on the stem to scroll to that role.",
    stemColor: "gold",
  },
  {
    title: "Role four",
    date: "2022 — 2023",
    description: "A fourth writeup. These alternate on either side of the stem.",
    stemColor: "red",
  },
  {
    title: "Role five",
    date: "2021 — 2022",
    description: "A fifth writeup. Drop your SVGs into the node slots later.",
    stemColor: "mauve",
  },
];

function SvgSlot() {
  return (
    <span className="stem-icon-slot" aria-hidden="true">
      {/* Import an SVG here later */}
    </span>
  );
}

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    const stem = stemRef.current;
    if (!root || !fill || !stem) return;

    const posts = [...root.querySelectorAll<HTMLElement>(".stem-post")];
    const colors = ["color-red", "color-mauve", "color-gold"];

    const update = () => {
      const mid = window.innerHeight * 0.5;
      const rootBox = root.getBoundingClientRect();
      const start = rootBox.top;
      const end = rootBox.bottom;
      const progress = Math.min(1, Math.max(0, (mid - start) / (end - start)));
      fill.style.height = `${progress * 100}%`;

      const revealLine = window.innerHeight * 0.8;
      let activeColor = "red";

      posts.forEach((post) => {
        const top = post.getBoundingClientRect().top;
        if (top < revealLine) {
          post.classList.add("is-visible");
        } else {
          post.classList.remove("is-visible");
        }
        if (top < mid) {
          activeColor = post.dataset.stemColor ?? "red";
        }
      });

      stem.classList.remove(...colors);
      stem.classList.add(`color-${activeColor}`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollToPost = (index: number) => {
    const post = rootRef.current?.querySelectorAll<HTMLElement>(".stem-post")[index];
    if (!post) return;
    const top = post.getBoundingClientRect().top + window.scrollY;
    const target = top - window.innerHeight / 2 + post.offsetHeight / 2;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="experience"
      ref={rootRef}
      className="relative flex min-h-screen flex-col px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
    >
      <h2 className="relative z-10 mb-16 text-center text-5xl text-foreground md:text-6xl">
        <span className="font-serif text-7xl">Experience</span>
      </h2>

      <div className="stem-timeline">
        <div ref={stemRef} className="stem-track color-red">
          <div className="stem-track__line" />
          <div ref={fillRef} className="stem-track__fill" />
        </div>

        <div className="stem-posts">
          {roles.map((role, i) => (
            <article
              key={role.title}
              className="stem-post"
              data-stem-color={role.stemColor}
            >
              <button
                type="button"
                className="stem-node"
                aria-label={`Jump to ${role.title}`}
                onClick={() => scrollToPost(i)}
              >
                <SvgSlot />
              </button>
              <div className="stem-post__body">
                <p className="stem-post__meta">{role.date}</p>
                <h3 className="stem-post__title">{role.title}</h3>
                <p className="stem-post__copy">{role.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
