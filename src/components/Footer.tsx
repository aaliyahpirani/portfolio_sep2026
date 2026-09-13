export default function Footer() {
  return (
    <footer className="bg-accent-red">
      <div className="flex items-center justify-between px-8 py-4 font-serif text-background">
        <p className="text-2xl italic">
        © 2026 Aaliyah Pirani
        </p>

        <div className="flex gap-6">
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
