"use client";

import { useEffect, useRef } from "react";
import PointerWash from "@/components/PointerWash";

const roles: {
  title: string;
  date: string;
  description: string;
  stemColor: string;
  icon?: string;
}[] = [
  {
    title: "Teaching Assistant @ UofT Statistics Department",
    date: "August 2026 — Present",
    description: "Directly supported the learning of 24 students by explaining concepts in tutorial, providing thoughtful feedback on written assignments and hosting office hours in a welcoming environment.",
    stemColor: "red",
    icon: "/apple.svg"
  },
  {
    title: "Research Lead @ Medical Computer Vision and Robotics Lab",
    date: "May 2026 - Present",
    description: "Extended Newton Physics Engine to support 3D deformable objects using the finite element method and Newton's coupling hooks. Working towards implementation of an adaptive grid for the underlying mesh, with the aim of higher precision.",
    stemColor: "mauve",
    icon: "/lab.svg"
  },
  {
    title: "VP Internal @ UofT Robotics Association",
    date: "June 2025 - Present",
    description: "Acting as primary liason between admin team and six technical subteams, ensuring smooth communication and collaboration. Formerly Sumo team project manager, tripling club registration and increasing retention by 80% through promotions and dynamic teaching styles. ",
    stemColor: "gold",
    icon: "/comm.svg"
  },
  {
    title: "Data Risk Intern @ TD",
    date: "May 2025 — August 2026",
    description: "Designed and implemented an internal tool to centralize the collection and analysis of data risk metrics across twenty two subteams, significantly reducing administrative burdens. Also createed PowerBI dashboards to simplify reporting for VPs at TD.",
    stemColor: "red",
    icon: "/data.svg"
  },
  {
    title: "Student @ UofT",
    date: "September 2024 - Present",
    description: "A student at the University of Toronto studying a dual degree in Bachelor of Computer Science and a Bachelor of Science in Quantitative Biology. ",
    stemColor: "mauve",
    icon: "/school.svg"
  },
  {
    title: "Private Tutor",
    date: "September 2021 - August 2026",
    description: "Tutored 20+ IB students and undergraduates at UofT in subjects Math, Chemistry, and Computer Science, emphasizing problem solving strategies tailored to each student. Achieved 85+% average across student assessments.",
    stemColor: "mauve",
    icon: "/tutor.svg"
  },
];

function StemIcon({ src }: { src?: string }) {
  if (!src) {
    return <span className="stem-icon-slot" aria-hidden="true" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className="stem-icon" />
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

      let activeColor = "red";

      posts.forEach((post) => {
        const top = post.getBoundingClientRect().top;
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
      className="relative flex min-h-screen flex-col overflow-hidden px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
    >
      <PointerWash />
      <h2 className="relative z-10 mb-16 text-center text-5xl text-foreground md:text-6xl">
        <span className="font-serif text-7xl">Experience</span>
      </h2>

      <div className="stem-timeline relative z-[2]">
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
                <StemIcon src={role.icon} />
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
