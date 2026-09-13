import Image from "next/image";

const roles = [
  {
    title: "Role one",
    date: "2025 — Present",
    description: "Swap this for a team, what you worked on, and what you shipped.",
    side: "left",
  },
  {
    title: "Role two",
    date: "2024 — 2025",
    description: "A second role. Keep adding objects to the roles array.",
    side: "right",
  },
  {
    title: "Role three",
    date: "2023 — 2024",
    description: "A third writeup. These sit on either side of the rose stem.",
    side: "left",
  },
  {
    title: "Role four",
    date: "2023 — 2024",
    description: "A third writeup. These sit on either side of the rose stem.",
    side: "right",
  },
  {
    title: "Role five",
    date: "2023 — 2024",
    description: "A third writeup. These sit on either side of the rose stem.",
    side: "left",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative flex bg-accent-yellow min-h-screen flex-col overflow-hidden px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
    >
      <Image
        src="/rose.png"
        alt=""
        fill
        aria-hidden="true"
        className="pointer-events-none object-contain object-[45%_top]"
        sizes="100vw"
      />

      <h2 className="relative text-center text-5xl text-foreground md:text-6xl">
        <span className="font-serif text-7xl">Experience</span>
      </h2>

      <div className="relative z-10 mx-auto mt-12 flex w-full max-w-5xl flex-col gap-12">
        {roles.map((role) => {
          const isRight = role.side === "right";

          return (
            <article
              key={role.title}
              className={`w-full max-w-sm md:w-1/2 ${
                isRight ? "md:ml-auto md:pl-8" : "md:pr-8 md:text-right"
              }`}
            >
              <div
                className={`relative w-fit max-w-full ${
                  isRight ? "" : "md:ml-auto"
                }`}
              >
                <h3 className="font-serif text-2xl text-accent-red">
                  {role.title}
                </h3>
                <h4 className="w-0 min-w-full font-serif text-foreground">
                  {role.date}
                </h4>
                <div
                  aria-hidden="true"
                  className="relative mt-2 hidden h-3 md:block"
                >
                  <span
                    className={`absolute top-1/2 h-px -translate-y-1/2 bg-accent-red ${
                      isRight
                        ? "left-[calc(-2rem)] right-0"
                        : "left-0 right-[calc(-2rem)]"
                    }`}
                  />
                  <span
                    className={`absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-accent-red ${
                      isRight
                        ? "left-[calc(-2rem)] -translate-x-1/2"
                        : "right-[calc(-2rem)] translate-x-1/2"
                    }`}
                  />
                </div>
              </div>
              <p className="mt-3 font-serif leading-relaxed text-foreground">
                {role.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
