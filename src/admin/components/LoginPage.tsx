import { useState, type FormEvent } from 'react';
import { ADMIN_PASSWORD_HASH } from '../config';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const hash = await crypto.subtle
      .digest('SHA-256', new TextEncoder().encode(password))
      .then((buf) =>
        Array.from(new Uint8Array(buf))
          .map((b) => b.toString(16).padStart(2, '0'))
          .join(''),
      );

    if (hash === ADMIN_PASSWORD_HASH) {
      sessionStorage.setItem('admin_logged_in', 'true');
      onLogin();
    } else {
      setError('Invalid password.');
      setPassword('');
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center font-bebas text-3xl text-bg-dark font-bold shadow-primary mb-4">
            GD
          </div>
          <h1 className="font-bebas text-3xl text-primary tracking-widest">ADMIN PANEL</h1>
          <p className="text-text-dim font-mono text-xs mt-1">Portfolio Control Panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-bg-card border border-line/30 rounded-xl p-8 space-y-5 shadow-card-glow"
        >
          <div>
            <label className="block text-text-dim/70 font-mono text-xs mb-2 uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-bg-dark border border-line/30 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-primary/60 focus:shadow-primary transition-all placeholder-text-dim/30"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 font-mono text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-neon w-full py-3 text-sm font-bold tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 hover:shadow-primary"
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <a
            href="/"
            className="font-mono text-xs text-text-dim/50 hover:text-primary transition-colors uppercase tracking-widest"
          >
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
