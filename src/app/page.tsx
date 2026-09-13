import Header from "@/components/Header";
import HomeSection from "@/components/Home";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background text-foreground">
      <Header />

      <main>
        <HomeSection />

        <AboutMe />

        <Projects />

        <Experience />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}