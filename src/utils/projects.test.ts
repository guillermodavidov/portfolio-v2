import { describe, it, expect } from 'vitest';
import { formatDate, sortByOrder } from './projects';
import type { Project } from '../types';

describe('formatDate', () => {
  it('formats valid date string', () => {
    expect(formatDate('05.2010')).toBe('May 2010');
  });

  it('formats January', () => {
    expect(formatDate('01.2023')).toBe('Jan 2023');
  });

  it('formats December', () => {
    expect(formatDate('12.2023')).toBe('Dec 2023');
  });

  it('returns original string for invalid month', () => {
    expect(formatDate('13.2023')).toBe('13.2023');
  });

  it('returns original string for non-numeric input', () => {
    expect(formatDate('ab.2023')).toBe('ab.2023');
  });
});

describe('sortByOrder', () => {
  it('sorts projects by order field ascending', () => {
    const projects: Project[] = [
      { id: '2', title: 'B', order: 2 } as Project,
      { id: '1', title: 'A', order: 1 } as Project,
      { id: '3', title: 'C', order: 3 } as Project,
    ];
    const result = sortByOrder(projects);
    expect(result.map((p) => p.order)).toEqual([1, 2, 3]);
  });

  it('does not mutate the original array', () => {
    const projects: Project[] = [
      { id: '2', title: 'B', order: 2 } as Project,
      { id: '1', title: 'A', order: 1 } as Project,
    ];
    sortByOrder(projects);
    expect(projects[0].order).toBe(2);
  });
});
