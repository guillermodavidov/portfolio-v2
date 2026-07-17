import React, { useState, useEffect, useId, type FormEvent, type ReactNode } from 'react';
import type { Project, ProjectPayload } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onSave: (data: ProjectPayload) => void;
  onClose: () => void;
}

type FormData = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  duration: string;
  company: string;
  role: string;
  domain: string;
  overview: string;
  descriptionRaw: string;
  techStackRaw: string;
};

function emptyForm(): FormData {
  return {
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    duration: '',
    company: '',
    role: '',
    domain: '',
    overview: '',
    descriptionRaw: '',
    techStackRaw: '',
  };
}

export default function ProjectModal({ project, onSave, onClose }: ProjectModalProps) {
  const [form, setForm] = useState<FormData>(emptyForm());

  useEffect(() => {
    if (project) {
      setForm({
        id: project.id,
        title: project.title,
        startDate: project.startDate,
        endDate: project.endDate ?? '',
        duration: project.duration ?? '',
        company: project.company ?? '',
        role: project.role ?? '',
        domain: project.domain ?? '',
        overview: project.overview,
        descriptionRaw: project.description.join('\n'),
        techStackRaw: project.techStack.join(', '),
      });
    } else {
      setForm(emptyForm());
    }
  }, [project]);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      ...(form.id ? { id: form.id } : {}),
      title: form.title.trim(),
      startDate: form.startDate.trim(),
      endDate: form.endDate.trim() || undefined,
      duration: form.duration.trim() || undefined,
      company: form.company.trim() || undefined,
      role: form.role.trim() || undefined,
      domain: form.domain.trim() || undefined,
      overview: form.overview.trim(),
      description: form.descriptionRaw
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      techStack: form.techStackRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onSave(payload);
    onClose();
  }

  const isEdit = Boolean(form.id);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4">
      <div className="bg-bg-card border border-line/30 rounded-xl w-full max-w-2xl shadow-card-glow">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line/20">
          <h2 className="font-bebas text-2xl text-primary tracking-widest">
            {isEdit ? 'Edit Project' : 'New Project'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 text-text-dim/50 hover:text-white rounded-lg hover:bg-bg-dark transition-colors font-mono text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          <Field label="Title *">
            <input
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className={inputCls}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date *">
              <input
                required
                placeholder="01.2023"
                value={form.startDate}
                onChange={(e) => set('startDate', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="End Date">
              <input
                placeholder="12.2023 — blank = Present"
                value={form.endDate}
                onChange={(e) => set('endDate', e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Duration">
              <input
                placeholder="e.g. 6 months"
                value={form.duration}
                onChange={(e) => set('duration', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Domain">
              <input
                placeholder="e.g. FinTech"
                value={form.domain}
                onChange={(e) => set('domain', e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Company">
              <input
                value={form.company}
                onChange={(e) => set('company', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Role">
              <input
                value={form.role}
                onChange={(e) => set('role', e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Overview *">
            <textarea
              required
              rows={3}
              value={form.overview}
              onChange={(e) => set('overview', e.target.value)}
              className={inputCls + ' resize-y'}
            />
          </Field>

          <Field label="Description Bullets (one per line)">
            <textarea
              rows={5}
              value={form.descriptionRaw}
              onChange={(e) => set('descriptionRaw', e.target.value)}
              className={inputCls + ' resize-y'}
            />
          </Field>

          <Field label="Tech Stack (comma-separated)">
            <textarea
              rows={2}
              value={form.techStackRaw}
              onChange={(e) => set('techStackRaw', e.target.value)}
              className={inputCls + ' resize-y'}
            />
          </Field>

          <div className="flex gap-3 pt-2 border-t border-line/20">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 font-mono text-sm border border-line/40 text-text-dim rounded-lg hover:border-text-dim/60 hover:text-white transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-neon flex-1 py-2.5 text-sm font-bold tracking-widest uppercase hover:bg-primary/10 hover:shadow-primary"
            >
              {isEdit ? 'Save Changes' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls =
  'w-full bg-bg-dark border border-line/30 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-primary/60 focus:shadow-primary transition-all placeholder-text-dim/30';

function Field({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-text-dim/70 font-mono text-xs mb-1.5 uppercase tracking-widest">
        {label}
      </label>
      {React.cloneElement(children as React.ReactElement<{ id?: string }>, { id })}
    </div>
  );
}
