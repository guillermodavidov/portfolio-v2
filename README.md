# Guillermo Davidov - Frontend Developer Portfolio

React 19 · TypeScript 5.8 · Tailwind CSS 4 · Vite 8 · Vitest

**Live:** [guilledev.vercel.app](https://guilledev.vercel.app)

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript 5.8 (strict mode) |
| Styling | Tailwind CSS 4 (CSS-first @theme config) |
| Build | Vite 8 |
| Testing | Vitest + React Testing Library (34 tests) |
| Linting | ESLint 9 + Prettier |
| CI/CD | GitHub Actions |
| Deploy | Vercel |

## Architecture

```
src/
├── components/        # React components with a11y (Header, About, Skills, Projects, Footer)
├── context/           # DataContext (Context API, loads from projects.json)
├── hooks/             # useData (custom hook)
├── types/             # TypeScript interfaces & utility types
├── utils/             # Pure functions (formatDate, sortByOrder)
├── lib/               # IntersectionObserver + MutationObserver (outside React)
├── admin/             # CRUD admin panel (excluded from production build)
│   ├── components/    # AdminLayout, LoginPage, PanelPage, ProjectCard, ProjectModal
│   ├── hooks/         # useProjects (CRUD operations)
│   └── config.ts      # SHA-256 hashed password
├── data/              # Static JSON (about, projects, skills)
├── App.tsx            # Main layout + StarsBackground
├── main.tsx           # Dynamic import (admin vs portfolio)
└── index.css          # Tailwind v4 @theme + custom utilities
```

## Key Features

- **Scroll animations** — IntersectionObserver + MutationObserver (outside React lifecycle)
- **Code splitting** — Admin panel dynamically imported, zero bytes in production
- **Accessibility** — Skip links, ARIA labels, focus-visible, prefers-reduced-motion, progressbar roles, noscript fallback
- **SEO** — Open Graph meta tags, theme-color, descriptive title
- **Admin panel** — Full CRUD with hashed auth, excluded from production via `INCLUDE_ADMIN`, saves directly to `projects.json` via Vite dev server middleware
- **Color system** — Generic token names (primary, secondary, tertiary) for easy retheming

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript + Vite build |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Check lint errors |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format with Prettier |

## License

MIT
