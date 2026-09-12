import Header from "@/components/Header";
import HomeSection from "@/components/Home";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <Header />

      <main>
        <HomeSection />

        <AboutMe />

        <section id="projects" className="min-h-screen px-8 py-24">
          <h2 className="font-symphony text-3xl">Projects</h2>
        </section>

        <section id="experience" className="min-h-screen px-8 py-24">
          <h2 className="font-symphony text-3xl">Experience</h2>
        </section>

        <section id="contact" className="min-h-screen px-8 py-24">
          <h2 className="font-symphony text-3xl">Contact</h2>
        </section>
      </main>
    </div>
  );
}