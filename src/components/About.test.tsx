import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';
import { DataProvider } from '../context/DataContext';

function renderAbout() {
  return render(
    <DataProvider>
      <About />
    </DataProvider>,
  );
}

describe('About', () => {
  it('renders the section heading', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
  });

  it('renders the summary section', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
  });

  it('renders the education section', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument();
  });

  it('renders the languages section', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /languages/i })).toBeInTheDocument();
  });

  it('renders the courses section', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /courses/i })).toBeInTheDocument();
  });

  it('renders the industry experience section', () => {
    renderAbout();
    expect(screen.getByRole('heading', { name: /industry experience/i })).toBeInTheDocument();
  });
});
