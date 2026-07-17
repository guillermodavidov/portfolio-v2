export interface Project {
  id: string;
  title: string;
  order: number;
  startDate: string;
  endDate?: string;
  duration?: string;
  domain?: string;
  company?: string;
  role?: string;
  overview: string;
  description: string[];
  techStack: string[];
  createdAt: string;
}

/**
 * The shape accepted by saveProject / ProjectModal's onSave.
 * Required fields come from Project; id/order/createdAt are generated
 * server-side on create so they are optional here.
 * Extracted as a named alias so the inline Omit+intersection is not
 * repeated across useProjects.ts, PanelPage.tsx, and ProjectModal.tsx.
 */
export type ProjectPayload = Omit<Project, 'id' | 'order' | 'createdAt'> & {
  id?: string;
  order?: number;
  createdAt?: string;
};

export interface Education {
  degree: string;
  institution: string;
  years: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Course {
  title: string;
  subtitle?: string;
  provider: string;
  year: string;
}

export interface Industry {
  name: string;
  years: string;
}

export interface About {
  summary: string;
  education: Education;
  languages: Language[];
  courses: Course[];
  industry: Industry[];
}

export interface Skill {
  name: string;
  years: number;
  x?: number;
  y?: number;
  size?: number;
}

/**
 * A Skill guaranteed to have layout coordinates and size, as required by
 * the desktop bubble canvas in Skills.tsx. Using a distinct type makes the
 * "possibly undefined" fallbacks in renderSkillCircle unnecessary.
 */
export type PositionedSkill = Skill & Required<Pick<Skill, 'x' | 'y' | 'size'>>;

export interface Skills {
  languages: Skill[];
  frameworks: Skill[];
  testing: Skill[];
  tools: Skill[];
  concepts: Skill[];
  designTools: Skill[];
}

/**
 * The two states of the admin save indicator.
 * Defined here so AdminLayout, useProjects, and any future consumer
 * share a single source of truth instead of duplicating the literal union.
 */
export type SaveIndicator = 'saved' | 'saving';
