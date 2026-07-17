import type { Project } from '../../types';
import { formatDate } from '../../utils/projects';

interface ProjectCardProps {
  project: Project;
  isFirst: boolean;
  isLast: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export default function ProjectCard({
  project,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: ProjectCardProps) {
  const period = project.endDate
    ? `${formatDate(project.startDate)} — ${formatDate(project.endDate)}`
    : `${formatDate(project.startDate)} — Present`;

  function handleDelete() {
    if (window.confirm(`Delete "${project.title}"?`)) {
      onDelete(project.id);
    }
  }

  return (
    <div className="card-hover bg-bg-card rounded-xl overflow-hidden border border-line/30 transition-all duration-300 hover:border-primary/50 hover:shadow-card-glow group flex flex-col">
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <span className="text-text-dim/70 font-mono text-xs">Period: </span>
              <span className="text-white font-mono text-xs">{period}</span>
            </div>
            <h3 className="font-bebas text-xl text-white group-hover:text-primary transition-colors leading-tight">
              {project.title}
            </h3>
          </div>
          {/* Reorder buttons */}
          <div className="flex flex-col gap-0.5 shrink-0 mt-1">
            <button
              onClick={() => onMoveUp(project.id)}
              disabled={isFirst}
              aria-label="Move project up"
              className="p-1 text-text-dim/50 hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors font-mono text-xs leading-none"
              title="Move up"
            >
              ▲
            </button>
            <button
              onClick={() => onMoveDown(project.id)}
              disabled={isLast}
              aria-label="Move project down"
              className="p-1 text-text-dim/50 hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors font-mono text-xs leading-none"
              title="Move down"
            >
              ▼
            </button>
          </div>
        </div>

        {/* Company / domain badges */}
        <div className="flex flex-wrap gap-2">
          {project.company && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-mono text-xs border border-primary/20">
              {project.company}
            </span>
          )}
          {project.domain && (
            <span className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full font-mono text-xs border border-tertiary/20">
              {project.domain.split(',')[0]}
            </span>
          )}
        </div>

        {/* Overview */}
        <p className="text-text-dim font-mono text-sm leading-relaxed line-clamp-2">
          {project.overview}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2 py-0.5 font-mono text-xs text-text-dim/50">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 flex gap-3 border-t border-line/20 pt-4">
        <button
          onClick={() => onEdit(project)}
          className="btn-neon flex-1 py-2 text-xs font-bold tracking-widest uppercase hover:bg-primary/10 hover:shadow-primary"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 py-2 text-xs font-mono font-bold border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 tracking-widest uppercase"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
