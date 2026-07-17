import { useState, useEffect, useMemo } from 'react';
import { useData } from '../hooks/useData';
import type { PositionedSkill } from '../types';

const SKILL_COLORS = [
  'from-primary/20 to-transparent',
  'from-secondary/20 to-transparent',
  'from-tertiary/20 to-transparent',
  'from-highlight/20 to-transparent',
  'from-info/20 to-transparent',
  'from-accent/20 to-transparent',
];

export default function Skills() {
  const { skills, loading } = useData();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', handler, { passive: true });
    return () => mql.removeEventListener('change', handler);
  }, []);

  const getSizeClass = (size: number) => {
    if (size >= 147) return 'text-lg font-bold';
    if (size >= 113) return 'text-base font-semibold';
    if (size >= 92) return 'text-sm font-medium';
    return 'text-xs font-normal';
  };

  // Computed once — Math.random() in render would re-randomize on every state change
  const decorativeDots = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      })),
    [],
  );

  const renderSkillCircle = (skill: PositionedSkill, index: number) => {
    return (
      <div
        key={index}
        aria-label={`${skill.name}, ${skill.years} year${skill.years === 1 ? '' : 's'}`}
        tabIndex={0}
        className={`absolute rounded-full border border-text-dim/20 bg-linear-to-br ${SKILL_COLORS[index % SKILL_COLORS.length]} shadow-primary/30 transition-all duration-500 hover:scale-110 focus:scale-110 hover:border-primary/80 focus:border-primary/80 hover:shadow-none focus:shadow-none cursor-pointer group outline-none`}
        style={{ left: skill.x, top: skill.y, width: skill.size, height: skill.size }}
      >
        <div className="w-full h-full flex items-center justify-center p-2">
          <span
            aria-hidden="true"
            className={`font-mono text-text-dim ${getSizeClass(skill.size)} text-center leading-tight transition-colors group-hover:text-primary group-focus:text-primary`}
          >
            {skill.name}
          </span>
        </div>
        {/* aria-hidden: duplicate of aria-label on parent */}
        <div
          aria-hidden="true"
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 tooltip-hidden group-hover:visible group-focus:visible group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
        >
          <span className="text-xs font-mono text-secondary bg-bg-dark/90 px-2 py-1 rounded whitespace-nowrap">
            {skill.years} years
          </span>
        </div>
      </div>
    );
  };

  const allSkills: PositionedSkill[] = [
    ...(skills?.languages || []),
    ...(skills?.frameworks || []),
    ...(skills?.tools || []),
  ].filter(
    (s): s is PositionedSkill => s.x !== undefined && s.y !== undefined && s.size !== undefined,
  );

  if (loading) {
    return (
      <section
        id="skills"
        aria-busy="true"
        aria-label="Skills — loading"
        className="min-h-screen pt-24 pb-16 px-4"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title">SKILLS</h2>
          <div className="animate-pulse">
            <div className="h-96 bg-bg-card rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="fade-up">
          <h2 className="section-title">SKILLS</h2>
        </div>

        {isMobile ? (
          <ul
            aria-label="Skills list"
            className="grid grid-cols-2 md:grid-cols-3 gap-4 list-none fade-up delay-100"
          >
            {allSkills.map((skill, index) => (
              <li
                key={index}
                className="card-hover bg-bg-card rounded-lg p-4 border border-line/30 text-center"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="font-mono text-text-dim text-sm block mb-3">{skill.name}</span>
                <div
                  className="skill-bar"
                  role="progressbar"
                  aria-valuenow={skill.years}
                  aria-valuemin={0}
                  aria-valuemax={15}
                  aria-label={`${skill.years} years experience`}
                >
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${Math.min((skill.years / 15) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-text-dim/70 font-mono text-xs mt-3 block" aria-hidden="true">
                  {skill.years} yrs
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="relative w-full overflow-x-auto rounded-2xl p-8 fade-up delay-100 min-h-162.5"
          >
            {/* Decorative background elements — hidden from AT */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-radial from-bg-card/30 via-bg-dark to-bg-dark"
            />
            <div aria-hidden="true" className="absolute inset-0 opacity-30">
              {decorativeDots.map((dot) => (
                <div
                  key={dot.id}
                  className="absolute w-1 h-1 bg-text-dim/50 rounded-full"
                  style={{
                    left: dot.left,
                    top: dot.top,
                  }}
                />
              ))}
            </div>
            <div className="relative min-w-225 min-h-150 mx-auto">
              {allSkills.map((skill, index) => renderSkillCircle(skill, index))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
