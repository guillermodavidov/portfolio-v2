import { useData } from '../hooks/useData';

export default function About() {
  const { about, loading } = useData();

  if (loading) {
    return (
      <section
        id="about"
        aria-busy="true"
        aria-label="About me — loading"
        className="min-h-screen pt-24 pb-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title">ABOUT ME</h2>
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-bg-card rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 bg-bg-card rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="fade-up">
          <h2 className="section-title">ABOUT ME</h2>
        </div>

        <div className="card-hover bg-bg-card rounded-xl p-6 md:p-8 mb-8 border border-line/30 fade-up delay-100">
          <h3 className="font-bebas text-2xl text-primary mb-4 flex items-center gap-3">
            {/* aria-hidden: emoji is decorative — the heading text already labels the card */}
            <span
              aria-hidden="true"
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl"
            >
              📋
            </span>
            Summary
          </h3>
          <p className="text-text-dim font-mono leading-relaxed text-base">{about.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-hover bg-bg-card rounded-xl p-6 border border-line/30 hover:border-primary/30 fade-left">
            <h3 className="font-bebas text-xl text-primary mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
              >
                🎓
              </span>
              Education
            </h3>
            <div className="space-y-2">
              <p className="text-white font-mono">{about.education.degree}</p>
              <p className="text-text-dim font-mono text-sm">{about.education.institution}</p>
              <p className="text-text-dim/70 font-mono text-xs">{about.education.years}</p>
            </div>
          </div>

          <div className="card-hover bg-bg-card rounded-xl p-6 border border-line/30 hover:border-primary/30 fade-right">
            <h3 className="font-bebas text-xl text-primary mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
              >
                🌐
              </span>
              Languages
            </h3>
            <div className="space-y-3">
              {about.languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded-lg bg-bg-dark/50"
                >
                  <span className="text-white font-mono">{lang.name}</span>
                  <span className="text-secondary font-mono text-sm">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-hover bg-bg-card rounded-xl p-6 border border-line/30 hover:border-primary/30 fade-left delay-100">
            <h3 className="font-bebas text-xl text-primary mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
              >
                📚
              </span>
              Courses
            </h3>
            <div className="space-y-4">
              {about.courses.map((course, index) => (
                <div
                  key={index}
                  className="border-l-2 border-primary pl-4 py-2 hover:bg-primary/5 rounded-r transition-colors"
                >
                  <p className="text-white font-mono text-sm">{course.title}</p>
                  {course.subtitle && (
                    <p className="text-text-dim/70 font-mono text-xs mt-1">{course.subtitle}</p>
                  )}
                  <p className="text-text-dim/70 font-mono text-xs mt-2">
                    {course.provider} • {course.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-hover bg-bg-card rounded-xl p-6 border border-line/30 hover:border-primary/30 fade-right delay-100">
            <h3 className="font-bebas text-xl text-primary mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
              >
                🏢
              </span>
              Industry Experience
            </h3>
            <div className="space-y-3">
              {about.industry.map((ind, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-bg-dark/50 hover:bg-bg-dark transition-colors"
                >
                  <span className="text-white font-mono text-sm">{ind.name}</span>
                  <span className="text-secondary font-mono text-sm">{ind.years}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
