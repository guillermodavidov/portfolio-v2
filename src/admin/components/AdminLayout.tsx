import type { ReactNode } from 'react';
import type { SaveIndicator } from '../../types';

interface AdminLayoutProps {
  children: ReactNode;
  onLogout?: () => void;
  saveIndicator?: SaveIndicator;
}

export default function AdminLayout({ children, onLogout, saveIndicator }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {onLogout && (
        <header className="sticky top-0 z-40 bg-bg-sidebar/95 backdrop-blur-md border-b border-line/30 shadow-lg shadow-primary/5">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center font-bebas text-xl text-bg-dark font-bold shadow-primary">
                  GD
                </div>
                <div>
                  <h1 className="font-bebas text-xl text-primary tracking-wider">ADMIN PANEL</h1>
                  <p className="text-text-dim font-mono text-xs">Portfolio Control Panel</p>
                </div>
              </div>
              <span
                className={`hidden sm:inline font-mono text-xs ${saveIndicator === 'saving' ? 'text-secondary animate-pulse' : 'text-text-dim/30'}`}
              >
                ● {saveIndicator === 'saving' ? 'saving...' : 'saved'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="font-mono text-xs text-text-dim/60 hover:text-primary transition-colors uppercase tracking-widest"
              >
                ← Back to site
              </a>
              <button
                onClick={onLogout}
                className="font-mono text-xs text-text-dim/60 hover:text-red-400 transition-colors uppercase tracking-widest"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      {children}
    </div>
  );
}
