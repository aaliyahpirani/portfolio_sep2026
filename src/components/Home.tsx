import Reveal from "@/components/Reveal";
import HomeHero from "@/components/HomeHero";

export default function HomeSection() {
  return (
    <section id="home" className="flex flex-col">
      <HomeHero />

      <Reveal className="home-band relative bg-accent-mauve">
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
      </Reveal>
    </section>
  );
}
