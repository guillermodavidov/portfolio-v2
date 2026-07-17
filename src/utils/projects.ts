import type { Project } from '../types';

export const formatDate = (dateStr: string): string => {
  const [month, year] = dateStr.split('.');
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const m = parseInt(month);
  return m >= 1 && m <= 12 ? `${months[m - 1]} ${year}` : dateStr;
};

export const sortByOrder = (list: Project[]): Project[] =>
  [...list].sort((a, b) => a.order - b.order);
