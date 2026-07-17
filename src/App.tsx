import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { useMemo } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  animationDelay: string;
}

function StarsBackground() {
  const stars = useMemo<Star[]>(() => {
    const colors = ['#ffffff', '#00d3ff', '#a855f7', '#4ade80', '#fb923c'];
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      animationDelay: `${Math.random() * 3}s`,
    }));
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-bg-stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-bg-dark/50 to-bg-dark" />
    </div>
  );
}

function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-primary focus:text-bg-dark focus:rounded focus:font-mono focus:font-bold"
      >
        Skip to main content
      </a>

      <StarsBackground />
      <Header />

      {/* sr-only h1 for screen readers; visual logo uses <span> to keep heading hierarchy */}
      <h1 className="sr-only">Guillermo Davidov - Frontend Developer Portfolio</h1>

      <main id="main-content" aria-label="Portfolio content">
        <About />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
