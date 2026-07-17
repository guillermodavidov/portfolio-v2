import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Project, About, Skills } from '../types';
import { sortByOrder } from '../utils/projects';
import projectsData from '../data/projects.json';
import aboutData from '../data/about.json';
import skillsData from '../data/skills.json';

interface DataContextType {
  projects: Project[];
  about: About;
  skills: Skills;
  loading: boolean;
  error: string | null;
}

// Static data — module-level consts avoid unnecessary re-renders
const ABOUT: About = aboutData as About;
const SKILLS: Skills = skillsData as Skills;

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setProjects(sortByOrder([...projectsData] as Project[]));
      setLoading(false);
    } catch {
      setError('Failed to load data');
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ projects, about: ABOUT, skills: SKILLS, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}
