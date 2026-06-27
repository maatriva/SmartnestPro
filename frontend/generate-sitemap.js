import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/survey', priority: '0.9', changefreq: 'weekly' },
  { path: '/about-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/diseases', priority: '0.8', changefreq: 'weekly' },
  { path: '/terms', priority: '0.4', changefreq: 'yearly' }
];

const domain = 'https://maatriva.vercel.app';
const currentDate = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${domain}${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent);
console.log('Sitemap generated successfully!');
