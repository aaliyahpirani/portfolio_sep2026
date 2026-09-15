import Image from "next/image";

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
        amount: "70,000",
        date: "2024",
        description: 
        "Swap this for what you built, what it does, and the stack you used.  Swap this for what you built, what it does, and the stack you used.",
          
      },
      {
        title: "Project two",
        amount: "70,000",
        date: "August - September 2026", 
        description:
          "A second writeup. Add a link below if the repo or live demo is public.",
      },
      {
        title: "Project three",
        amount: "70,000",
        date: "July 2026",
        description:
          "Keep adding objects to the projects array — this list grows with the page.",
      },
      {
        title: "Project four",
        amount: "70,000",
        date: "July 2026",
        description:
          "Keep adding objects to the projects array — this list grows with the page.",
      },

]
const projects = [
  {
    title: "Project one",
    date: "September 2026",
    description:
      "Swap this for what you built, what it does, and the stack you used.  Swap this for what you built, what it does, and the stack you used.",
      
  },
  {
    title: "Project two",
    date: "August - September 2026", 
    description:
      "A second writeup. Add a link below if the repo or live demo is public.",
  },
  {
    title: "Project three",
    date: "July 2026",
    description:
      "Keep adding objects to the projects array — this list grows with the page.",
  },

  {
    title: "Project four",
    date: "July 2026",
    description:
      "Keep adding objects to the projects array — this list grows with the page.",
  },
];

export default function Projects() {
  return (
    <section className="flex min-h-screen flex-col">
      <div className="relative flex items-center overflow-hidden bg-accent-red px-4 py-5 sm:px-8">
        <div className="flex w-full items-center justify-center">
          {projectImages.map((src, index) => (
            <div
              key={src}
              className="relative aspect-[3/4] w-[18%] min-w-20 shrink-0 overflow-hidden border-16 border-accent-red shadow-md first:ml-0 -ml-6 sm:-ml-8"
            >
              <Image
                src={src}
                alt={`Project photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        id="projects"
        className="flex flex-1 scroll-mt-20 flex-col items-start px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
      >
        <h2 className="relative text-left text-5xl text-foreground md:text-6xl">
          <span className="font-pinyon text-7xl">Projects</span>
        </h2>

        <div className="projects-scroll mt-12 flex w-full max-w-7xl flex-row gap-12 pb-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="w-[calc((100%-6rem)/3)] shrink-0"
            >
              <h3 className="font-serif text-2xl text-accent-red">
                {project.title}
              </h3>
              <h4 className="font-serif text-foreground">
                {project.date}
              </h4>
              <p className="mt-3 font-serif leading-relaxed text-foreground">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="flex text-center">
        <div className="bg-accent-mauve w-full h-full">
            <h1 className="flex flex-wrap items-baseline justify-center gap-x-4 px-4 pt-6 text-2xl text-background">
                <span className="font-pinyon text-7xl">Awards</span>
                <span className="font-imbue-light text-6xl">and</span>
                <span className="font-pinyon text-7xl">Recognition</span>
            </h1>
            <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col divide-y divide-background/40 px-10 pb-8 text-left">
          {awards.map((award) => (
            <article
              key={award.title}
              className="w-full min-w-0 py-6 first:pt-0 last:pb-0"
            >
              <div className="flex w-full min-w-0 items-baseline justify-between gap-4">
                <h3 className="min-w-0 flex-1 font-serif text-2xl text-background">
                  {award.title}
                </h3>
                <h4 className="shrink-0 font-serif text-background">
                  {award.date}
                </h4>
              </div>
              <p className="mt-3 font-serif leading-relaxed text-background">
                {award.description}
              </p>
            </article>
          ))}
        </div>

        </div>
      </div>
    </section>
  );
}
