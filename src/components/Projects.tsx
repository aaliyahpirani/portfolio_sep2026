"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import PointerWash from "@/components/PointerWash";

const projectImages = [
  "/1.jpg",
  "/2.jpg",
  "/3.JPEG",
  "/4.jpg",
  "/5.jpg",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
];

const awards = [
  {
    title: "TD Scholarship for Community Leadership",
    amount: "70000",
    date: "May 2024",
    description:
      "One of twenty Canadian recipients of the TD Scholarship for Community Leadership, awarded for immense display of impact and leadership in the community.",
  },
  {
    title: "Department of Computer Science Research Scholarship",
    amount: "12000",
    date: "March 2026",
    description:
      "Awarded to outstanding students in the department of computer science in the University of Toronto to pursue research in the field.",
  },
  {
    title: "Howard Ferguson Admission Scholarship",
    amount: "12000",
    date: "September 2024",
    description:
      "Awarded to an outstanding non-Ontario resident to pursue a degree at the University of Toronto.",
  },
  {
    title: "University of Toronto Scholar",
    amount: "1500",
    date: "July 2025",
    description:
      "Recognition of academic excellence in the Faculty of Arts and Science.",
  },
];

const projects = [
  {
    title: "Deformable materials simulation",
    date: "May 2026–present",
    description:
      "GPU-accelerated simulation built using FlexiCubes and NVIDIA Warp, extending an existing deformable-body pipeline that included stretching and sculpting functionality with a tearing force model to reproduce soft-tissue rupture during surgery and laser ablation. Used to visualize skin tearing and train robotic manipulation policies at the MedCVR Lab, University of Toronto.",
    tech: "Python, NVIDIA Warp, FlexiCubes, CUDA",
  },
  {
    title: "Palate",
    date: "January 2026",
    description:
      "Group dining app that resolves restaurant deadlocks through a five-stage session: preference capture, vibe check, AI keyword generation, parallel swipe filtering, and blind voting. Post-meal feedback aggregates per-cuisine and per-tag statistics into each user's profile, sharpening Gemini's matchmaking suggestion prompts over time.",
    tech: "Next.js, Node.js, Gemini API, MongoDB, Python",
  },
  {
    title: "SnackOverflow",
    date: "November–December 2025",
    description:
      "Team recipe app built in Java by six developers, structured around Clean Architecture and SOLID principles. Integrates the Spoonacular API for search and discovery, with account-based saving, custom recipe creation, portion editing, tagging, meal planning, and dietary filtering — my first large-scale exposure to layered design and maintainable object-oriented code.",
    tech: "Java, MongoDB, Spoonacular API, Clean Architecture, OOP",
  },
  {
    title: "Bear With Me",
    date: "November 2025",
    description:
      "Pronunciation analysis tool for young children with speech difficulties, embedded in a stuffed bear via Raspberry Pi to keep interaction off screens. Captures speech through an onboard microphone, evaluates pronunciation with Azure's Speech Pronunciation Assessment API, and responds using ElevenLabs text-to-speech and a connected microphone. Includes a parent dashboard for tracking progress over time.",
    tech: "Raspberry Pi, Azure API, ElevenLabs API, Python",
  },
  {
    title: "Neural network from scratch",
    date: "2025",
    description:
      "Personal project built out of curiosity — a feedforward neural network implemented with only NumPy, using sigmoid activations, backpropagation, and stochastic gradient descent. Trained on the MNIST handwritten digit dataset; my first hands-on entry into machine learning and how networks learn from data.",
    tech: "Python, NumPy, Machine learning",
  },
  {
    title: "Aqualens",
    date: "2024–2025",
    description:
      "Flutter mobile app built with Engineers Without Borders UofT in partnership with CGEN, used by water quality testers in Mexico to capture and store field measurements. Designed for intuitive on-the-ground use in low-friction workflows; I owned the login and authentication system and contributed to the broader UX for reliable data entry and storage.",
    tech: "Dart, Flutter",
  },
];

function formatAmount(amount: string) {
  return `$${Number(amount).toLocaleString("en-CA")}`;
}

function ProjectPhotoStrip() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      track.style.transform = "none";
      return;
    }

    let currentX = 0;
    let frame = 0;

    const tick = () => {
      const maxX = Math.max(0, track.scrollWidth - root.clientWidth);
      const rect = root.getBoundingClientRect();
      const travel = Math.max(window.innerHeight + rect.height, 1);
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / travel),
      );
      const targetX = maxX === 0 ? 0 : -progress * maxX;
      currentX += (targetX - currentX) * 0.08;
      track.style.transform = `translate3d(${currentX}px, 0, 0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex items-center overflow-x-hidden overflow-y-visible bg-accent-red px-4 py-6 sm:px-8"
      data-fade-group
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {projectImages.map((src, index) => (
          <div
            key={src}
            data-fade-item
            data-fade-index={index}
            className="relative z-0 -ml-6 shrink-0 first:ml-0 hover:z-20 sm:-ml-8"
          >
            <div className="relative aspect-[3/4] w-[16vw] min-w-24 overflow-hidden border-16 border-accent-red shadow-md motion-safe:transition-[transform,box-shadow] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:scale-[1.06] motion-safe:hover:shadow-[0_10px_28px_rgba(255,247,214,0.28)]">
              <Image
                src={src}
                alt={`Project photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="16vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="flex min-h-screen flex-col">
      <ProjectPhotoStrip />
      <div
        id="projects"
        data-fade-group
        className="relative flex flex-1 scroll-mt-20 flex-col items-start overflow-hidden px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
      >
        <PointerWash />
        <h2
          data-fade-item
          data-fade-index="0"
          className="relative z-[2] text-left text-5xl text-foreground md:text-6xl"
        >
          <span className="font-playfair text-7xl">Projects</span>
        </h2>
        <p
          data-fade-item
          data-fade-index="1"
          className="relative z-[2] mt-5 max-w-2xl text-left font-garamond text-xl text-foreground/90"
        >
          Selected work from school, research, and things I built to learn.
        </p>

        <div className="projects-scroll relative z-[2] mt-12 flex w-full max-w-7xl flex-row gap-12 pb-8">
          {projects.map((project, index) => (
            <article
              key={project.title}
              data-fade-item
              data-fade-index={index + 2}
              className="w-[calc((100%-6rem)/3)] shrink-0"
            >
              <h3 className="font-serif text-2xl text-accent-red">
                {project.title}
              </h3>
              <h4 className="font-serif text-foreground">{project.date}</h4>
              <p className="mt-3 font-serif leading-relaxed text-foreground">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div
        id="awards"
        data-fade-group
        className="relative overflow-hidden bg-accent-mauve px-6 py-14 sm:px-16 lg:px-24"
      >
        <PointerWash tone="dark" />
        <h2
          data-fade-item
          data-fade-index="0"
          className="relative z-[2] text-center font-playfair text-4xl text-background md:text-5xl"
        >
          Awards and Recognition
        </h2>
        <p
          data-fade-item
          data-fade-index="1"
          className="relative z-[2] mx-auto mt-3 max-w-2xl text-center font-garamond text-base text-background/90 md:text-lg"
        >
          Scholarships and honours for community leadership, research, and
          academic work at the University of Toronto.
        </p>
        <div className="relative z-[2] mx-auto mt-8 grid w-full max-w-5xl gap-x-12 gap-y-8 text-left sm:grid-cols-2">
          {awards.map((award, index) => (
            <article
              key={award.title}
              data-fade-item
              data-fade-index={index + 3}
              className="border-t border-background/35 pt-4"
            >
              <p className="font-playfair text-3xl tracking-tight text-background md:text-4xl">
                {formatAmount(award.amount)}
              </p>
              <h3 className="mt-2 font-serif text-lg text-background md:text-xl">
                {award.title}
              </h3>
              <p className="mt-1 font-serif text-xs tracking-wide text-background/75">
                {award.date}
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-background">
                {award.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
