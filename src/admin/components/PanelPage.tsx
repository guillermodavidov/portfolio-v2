import { useState } from 'react';
import type { Project, ProjectPayload } from '../../types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

interface PanelPageProps {
  projects: Project[];
  loading: boolean;
  onSave: (data: ProjectPayload) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export default function PanelPage({
  projects,
  loading,
  onSave,
  onDelete,
  onMoveUp,
  onMoveDown,
}: PanelPageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  function handleEdit(project: Project) {
    setEditing(project);
    setModalOpen(true);
  }

  function handleNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditing(null);
  }

  return (
    <main className="container mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-bebas text-4xl md:text-5xl bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            PROJECTS
          </h2>
          <p className="text-text-dim/50 font-mono text-xs mt-1">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn-neon px-6 py-2.5 text-sm font-bold tracking-widest uppercase hover:bg-primary/10 hover:shadow-primary"
        >
          + New Project
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-bg-card rounded-xl border border-line/20" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24 text-text-dim/40 font-mono text-sm">No projects yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFirst={idx === 0}
              isLast={idx === projects.length - 1}
              onEdit={handleEdit}
              onDelete={onDelete}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
            />
          ))}
        </div>
      )}

      {modalOpen && <ProjectModal project={editing} onSave={onSave} onClose={handleClose} />}
    </main>
  );
}
