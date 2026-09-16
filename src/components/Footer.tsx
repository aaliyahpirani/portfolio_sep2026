import PointerWash from "@/components/PointerWash";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-accent-red" data-fade-group>
      <PointerWash tone="dark" />
      <div className="relative z-[2] flex items-center justify-between gap-3 px-4 py-3 font-serif text-background sm:px-8 sm:py-4">
        <p data-fade-item data-fade-index="0" className="text-sm font-garamond sm:text-2xl">
          © 2026 Aaliyah Pirani
        </p>

        <div data-fade-item data-fade-index="1" className="flex gap-3 text-xs sm:gap-6 sm:text-base">
          <a
            href="https://www.instagram.com/aalipirani"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href="https://github.com/aaliyahpirani" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/aaliyahpirani"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
