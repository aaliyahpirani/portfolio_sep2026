import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <Header />

      <main>
        <section id="home" className="min-h-screen px-8 py-24">
          <h1 className="font-symphony text-5xl text-accent-red">Your name</h1>
          <p className="font-serif mt-4">One-line intro</p>
        </section>

        <section id="about" className="min-h-screen px-8 py-24">
          <h2 className="font-symphony text-3xl">About me</h2>
        </section>

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