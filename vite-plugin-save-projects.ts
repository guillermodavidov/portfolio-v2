import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

export default function saveProjects(): Plugin {
  return {
    name: 'save-projects',
    configureServer(server) {
      server.middlewares.use('/api/save-projects', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const projects = JSON.parse(body);
            const filePath = path.resolve(__dirname, 'src/data/projects.json');
            fs.writeFileSync(filePath, JSON.stringify(projects, null, 2) + '\n', 'utf-8');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: String(err) }));
          }
        });
      });
    },
  };
}
