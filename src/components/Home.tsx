import HomeHero from "@/components/HomeHero";
import PilotLicense from "@/components/PilotLicense";

export default function HomeSection() {
  return (
    <section id="home" className="flex flex-col">
      <HomeHero />
      <PilotLicense />
    </section>
  );
}
