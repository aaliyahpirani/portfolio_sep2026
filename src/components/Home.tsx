import Image from "next/image";

export default function HomeSection() {
  return (
    <section id="home" className="flex flex-col">
      <div className="flex items-start px-6 pt-4 pb-16 sm:px-20 md:px-16 md:pt-6 lg:px-24 lg:pt-8 xl:px-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
        <div className="w-full max-w-xs shrink-0 sm:max-w-sm md:w-1/3 md:max-w-none">
          <Image
            src="/portrait.jpg"
            alt="Aaliyah Pirani"
            width={900}
            height={1200}
            className="h-auto w-full"
            priority
          />
        </div>

        <div className="flex w-full flex-col items-center text-center md:w-2/3">
          <h1 className=" items-center text-foreground">
            <span className="font-pinyon text-7xl">Aaliyah</span>
            <span className="pl-6 font-pinyon text-7xl">Pirani</span>
          </h1>
          <p className="mt-4 font-serif text-xl text-foreground-red">
          Third year HBSc student in Computer Science and Quantitative Biology at the University of Toronto
          </p>
          <p className="mt-6 max-w-md font-montserrat text-base text-foreground">
            Graduating in April 2028
          </p>
          <div className="mt-10 flex flex-row gap-17">
            <a
              href="/AaliyahPirani_Resume.pdf"
              download="AaliyahPirani_Resume.pdf"
              className="border border-accent-red bg-background 
              px-14 py-3 font-montserrat text-md text-accent-red shadow-[6px_6px_0_0_#45151b]"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="border border-accent-red bg-background 
              px-14 py-3 font-montserrat text-md text-accent-red shadow-[6px_6px_0_0_#45151b]"
            >
              Contact
            </a>
          </div>
        </div>
        </div>
      </div>

      <div className="relative bg-accent-mauve">
        <div className="accent-stripes pointer-events-none absolute inset-0" aria-hidden="true" />
        <h1 className="relative px-6 pt-12 pb-2 text-center text-2xl font-serif text-background">
        Something you probably wouldn’t 
        have guessed about me...
        </h1>
        <p className="relative px-6 pb-12 text-center font-serif text-sm tracking-wide text-background">
        I got my <span className="italic">
            private pilot’s license </span> 
            through the air cadet program when I was 17!
        </p>
      </div>
    </section>
  );
}
