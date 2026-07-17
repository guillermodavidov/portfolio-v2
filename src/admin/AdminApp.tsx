import { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import LoginPage from './components/LoginPage';
import PanelPage from './components/PanelPage';
import { useProjects } from './hooks/useProjects';

export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('admin_logged_in') === 'true');

  const {
    projects,
    loading,
    saveIndicator,
    loadProjects,
    saveProject,
    deleteProject,
    moveUp,
    moveDown,
  } = useProjects();

  useEffect(() => {
    if (loggedIn) loadProjects();
  }, [loggedIn, loadProjects]);

  function handleLogout() {
    sessionStorage.removeItem('admin_logged_in');
    setLoggedIn(false);
  }

  if (!loggedIn) {
    return (
      <AdminLayout>
        <LoginPage onLogin={() => setLoggedIn(true)} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout onLogout={handleLogout} saveIndicator={saveIndicator}>
      <PanelPage
        projects={projects}
        loading={loading}
        onSave={saveProject}
        onDelete={deleteProject}
        onMoveUp={moveUp}
        onMoveDown={moveDown}
      />
    </AdminLayout>
  );
}
