import { useState, useCallback } from 'react';
import type { Project, ProjectPayload, SaveIndicator } from '../../types';
import { sortByOrder } from '../../utils/projects';
import projectsData from '../../data/projects.json';

const updateOrders = (list: Project[]): Project[] => list.map((p, i) => ({ ...p, order: i + 1 }));

const swap = <T,>(list: T[], i: number, j: number): T[] => {
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

const makeProject = (
  data: Omit<ProjectPayload, 'id' | 'order' | 'createdAt'>,
  order: number,
): Project => ({
  ...data,
  id: `proj_${Date.now()}`,
  order,
  createdAt: new Date().toISOString(),
});

const saveToFile = async (list: Project[]): Promise<void> => {
  const res = await fetch('/api/save-projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list, null, 2),
  });
  if (!res.ok) throw new Error('Failed to save');
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveIndicator, setSaveIndicator] = useState<SaveIndicator>('saved');

  const triggerSave = useCallback((list: Project[]) => {
    setSaveIndicator('saving');
    saveToFile(list)
      .then(() => setSaveIndicator('saved'))
      .catch(() => setSaveIndicator('saved'));
  }, []);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      setProjects(sortByOrder([...projectsData] as Project[]));
    } catch {
      setProjects([]);
    }
    setLoading(false);
  }, []);

  const saveProject = useCallback(
    (data: ProjectPayload) => {
      setProjects((prev) => {
        const updated = data.id
          ? prev.map((p) => (p.id === data.id ? ({ ...p, ...data } as Project) : p))
          : [...prev, makeProject(data, prev.length + 1)];
        triggerSave(updated);
        return updated;
      });
    },
    [triggerSave],
  );

  const deleteProject = useCallback(
    (id: string) => {
      setProjects((prev) => {
        const updated = updateOrders(prev.filter((p) => p.id !== id));
        triggerSave(updated);
        return updated;
      });
    },
    [triggerSave],
  );

  const moveUp = useCallback(
    (id: string) => {
      setProjects((prev) => {
        const idx = prev.findIndex((p) => p.id === id);
        if (idx <= 0) return prev;
        const updated = updateOrders(swap(prev, idx - 1, idx));
        triggerSave(updated);
        return updated;
      });
    },
    [triggerSave],
  );

  const moveDown = useCallback(
    (id: string) => {
      setProjects((prev) => {
        const idx = prev.findIndex((p) => p.id === id);
        if (idx === -1 || idx === prev.length - 1) return prev;
        const updated = updateOrders(swap(prev, idx, idx + 1));
        triggerSave(updated);
        return updated;
      });
    },
    [triggerSave],
  );

  return {
    projects,
    loading,
    saveIndicator,
    loadProjects,
    saveProject,
    deleteProject,
    moveUp,
    moveDown,
  };
}
