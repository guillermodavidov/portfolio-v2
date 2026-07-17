import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from './Skills';
import { DataProvider } from '../context/DataContext';

function renderSkills() {
  return render(
    <DataProvider>
      <Skills />
    </DataProvider>,
  );
}

describe('Skills', () => {
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

  it('renders the section heading', () => {
    renderSkills();
    expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument();
  });

  it('renders skill names', () => {
    renderSkills();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders the skills container', () => {
    renderSkills();
    expect(screen.getByText('JavaScript').closest('[class*="relative"]')).toBeInTheDocument();
  });
});
