import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { DataProvider } from './context/DataContext';

describe('App', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  it('renders the skip navigation link', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();
  });

  it('renders the sr-only h1', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    expect(screen.getByRole('heading', { name: /guillermo davidov/i })).toBeInTheDocument();
  });

  it('renders the main content area', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    expect(screen.getByRole('main', { name: /portfolio content/i })).toBeInTheDocument();
  });

  it('renders all sections', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  });

  it('renders the header navigation', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    expect(screen.getByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );
    expect(screen.getByText(/© 2026 Guillermo Davidov/)).toBeInTheDocument();
  });
});
