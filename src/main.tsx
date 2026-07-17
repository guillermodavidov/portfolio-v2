import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const isAdmin = window.location.pathname.startsWith('/admin');

async function mount() {
  if (isAdmin && import.meta.env.INCLUDE_ADMIN) {
    const AdminApp = (await import('./admin/AdminApp')).default;
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <AdminApp />
      </StrictMode>,
    );
  } else {
    const App = (await import('./App')).default;
    const { DataProvider } = await import('./context/DataContext');
    await import('./lib/observer');
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <DataProvider>
          <App />
        </DataProvider>
      </StrictMode>,
    );
  }
}

mount();
