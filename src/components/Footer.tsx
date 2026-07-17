export default function Footer() {
  return (
    <footer className="bg-bg-sidebar border-t border-line/30 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#about"
            aria-label="Guillermo — back to top"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div
              aria-hidden="true"
              className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center font-bebas text-xl text-bg-dark font-bold transition-shadow group-hover:shadow-primary"
            >
              GD
            </div>
            <div>
              <span className="block font-bebas text-lg text-primary">GUILLERMO</span>
              <p className="text-xs text-text-dim font-mono">Frontend Developer</p>
            </div>
          </a>

          <div className="text-center">
            <p className="text-text-dim/70 font-mono text-sm">
              © 2026 Guillermo Davidov. All rights reserved.
            </p>
          </div>

          <a
            href="https://guilledev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit live site: guilledev.vercel.app (opens in new tab)"
            className="group flex items-center gap-2 text-text-dim hover:text-primary transition-colors font-mono text-sm"
          >
            <span>guilledev.vercel.app</span>
            <span
              aria-hidden="true"
              className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
