import { useDataContext } from '../context/DataContext';

export function useData() {
  const { projects, about, skills, loading, error } = useDataContext();

  return {
    projects,
    about,
    skills,
    loading,
    error,
  };
}
