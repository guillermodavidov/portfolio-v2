import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from './Projects';
import { DataProvider } from '../context/DataContext';

function renderProjects() {
  return render(
    <DataProvider>
      <Projects />
    </DataProvider>,
  );
}

describe('Projects', () => {
  it('renders the section heading', () => {
    renderProjects();
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  });

  it('renders project cards', () => {
    renderProjects();
    expect(
      screen.getAllByText(/Website development for a CA Athletic Apparel/).length,
    ).toBeGreaterThan(0);
  });

  it('expands and collapses project details', async () => {
    const user = userEvent.setup();
    renderProjects();

    const expandButton = screen.getAllByRole('button', { name: /show more/i })[0];
    await user.click(expandButton);

    expect(screen.getByText('Show less')).toBeInTheDocument();

    const collapseButton = screen.getByRole('button', { name: /show less/i });
    await user.click(collapseButton);

    expect(screen.getAllByRole('button', { name: /show more/i }).length).toBeGreaterThan(0);
  });

  it('renders expand buttons with aria-expanded', () => {
    renderProjects();
    const buttons = screen.getAllByRole('button', { name: /show more/i });
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  });
});
