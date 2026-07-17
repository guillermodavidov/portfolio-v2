import { useState } from 'react';
import { useData } from '../hooks/useData';
import { formatDate } from '../utils/projects';

export default function Projects() {
  const { projects, loading } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <section
        id="projects"
        aria-busy="true"
        aria-label="Projects — loading"
        className="min-h-screen pt-24 pb-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title">PROJECTS</h2>
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-bg-card rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="fade-up">
          <h2 className="section-title">PROJECTS</h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-up"
          style={{ transitionDelay: '100ms' }}
        >
          {projects.map((project) => {
            const isExpanded = expandedId === project.id;
            const detailsId = `project-details-${project.id}`;

            return (
              <div
                key={project.id}
                className="card-hover bg-bg-card rounded-xl overflow-hidden border border-line/30 hover:border-primary/50 hover:shadow-card-glow group"
              >
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-text-dim/70 font-mono text-xs">Period: </span>
                    <span className="text-white font-mono text-sm ml-1">
                      {formatDate(project.startDate)}
                      {/* aria-hidden: em dash is a visual separator; punctuation is read inconsistently across screen readers */}
                      <span aria-hidden="true"> — </span>
                      <span className="sr-only"> to </span>
                      {project.endDate ? formatDate(project.endDate) : 'Present'}
                    </span>
                  </div>

                  <h3 className="font-bebas text-xl text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-mono text-xs border border-primary/20">
                      {project.company}
                    </span>
                    {project.domain && (
                      <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full font-mono text-xs border border-tertiary/20">
                        {project.domain.split(',')[0]}
                      </span>
                    )}
                  </div>

                  <p className="text-text-dim font-mono text-sm mb-4 leading-relaxed">
                    {project.overview}
                  </p>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    className="text-primary font-mono text-sm hover:text-secondary transition-colors flex items-center gap-2 group/btn"
                  >
                    <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                    {/* aria-hidden: decorative triangle — state is already communicated via aria-expanded */}
                    <span
                      aria-hidden="true"
                      className="transition-transform"
                    >
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </button>

                  <div
                    id={detailsId}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-250 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="space-y-4">
                        {project.role && (
                          <div className="pt-4 border-t border-line/20">
                            <span className="text-text-dim/70 font-mono text-xs">Role: </span>
                            <span className="text-white font-mono text-sm ml-1">
                              {project.role}
                            </span>
                          </div>
                        )}
                        {project.duration && (
                          <div className="pt-4 border-t border-line/20">
                            <span className="text-text-dim/70 font-mono text-xs">Duration: </span>
                            <span className="text-white font-mono text-sm ml-1">
                              {project.duration}
                            </span>
                          </div>
                        )}
                        <div className="pt-4 border-t border-line/20">
                          <h4 className="text-text-dim/70 font-mono text-xs mb-2 uppercase tracking-wider">
                            Description
                          </h4>
                          <ul className="space-y-2">
                            {project.description.map((desc, index) => (
                              <li
                                key={index}
                                className="text-white/80 font-mono text-sm flex items-start gap-3"
                              >
                                {/* aria-hidden: decorative bullet glyph */}
                                <span aria-hidden="true" className="text-primary">
                                  ▹
                                </span>
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t border-line/20">
                          <h4 className="text-text-dim/70 font-mono text-xs mb-3 uppercase tracking-wider">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, index) => (
                              <span key={index} className="tech-pill">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
