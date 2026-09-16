import Image from "next/image";
import PointerWash from "@/components/PointerWash";

export default function AboutMe() {
  return (
    <section
      id="about"
      data-fade-group
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 sm:px-20 md:px-16 lg:px-24 xl:px-32"
    >
      <PointerWash />
      <Image
        src="/embellish.png"
        alt=""
        width={900}
        height={1100}
        aria-hidden="true"
        data-fade-item
        data-fade-index="4"
        className="pointer-events-none absolute bottom-0 left-0 z-[1] w-1/4 max-w-xs rotate-180"
        loading="eager"
      />
      <Image
        src="/embellish.png"
        alt=""
        width={900}
        height={1100}
        aria-hidden="true"
        data-fade-item
        data-fade-index="3"
        className="pointer-events-none absolute top-0 right-0 z-[1] w-1/4 max-w-xs"
        loading="eager"
      />

      <h2
        data-fade-item
        data-fade-index="0"
        className="relative z-[2] text-center text-5xl text-foreground md:text-6xl"
      >
        <span className="font-playfair pr-4 text-7xl">About me</span>
      </h2>
      <p
        data-fade-item
        data-fade-index="1"
        className="relative z-[2] mt-5 max-w-2xl text-center font-garamond text-xl text-foreground/90"
      >
        A CS and quantitative biology student still exploring the parts of tech
        I enjoy most.
      </p>

      <div
        data-fade-item
        data-fade-index="2"
        className="relative z-[2] mt-8 flex flex-col items-center"
      >
        <p className="max-w-3xl text-center font-montserrat leading-relaxed text-foreground">
          I’m a third year student at the University of Toronto studying computer
          science and quantitative biology as a double major. I’m relatively new to
          the world of tech, and actually first learned how to code when I started
          university. Since then, I’ve made an effort to explore the range of
          opportunities available to students in computer science, as I always felt
          I wanted to try everything to figure out what it is I really enjoy doing.
          I added on a bio major in my second year because I found the applications
          of biology in CS to be especially alluring, and wanted a background in
          biology. Outside of school, I enjoy trying new food spots around the city
          and creating content for students!
        </p>

        <a
          href="https://www.instagram.com/aalipirani"
          className="mt-8 border border-accent-red bg-background px-12 py-3 font-garamond text-xl text-accent-red shadow-[6px_6px_0_0_#45151b]"
        >
          Check out my Instagram!
        </a>
      </div>
    </section>
  );
}
