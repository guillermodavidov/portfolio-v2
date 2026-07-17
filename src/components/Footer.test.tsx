import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Guillermo Davidov/)).toBeInTheDocument();
  });

  it('renders the live site link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /visit live site/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://guilledev.vercel.app');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders the back to top link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /guillermo — back to top/i });
    expect(link).toHaveAttribute('href', '#about');
  });
});
