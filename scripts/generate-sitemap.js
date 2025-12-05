import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// --- ESM equivalent for __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- Configuration ---
const BASE_URL = 'https://tidyfix.services'; // Replace with your actual domain
const TARGET_DIR = path.join(__dirname, '../public'); // Assumes script is in /scripts and output is /public
const TARGET_FILE = path.join(TARGET_DIR, 'sitemap.xml');

// --- Data (Mirroring data.ts for script execution) ---

const staticRoutes = [
  '/',
  '/quote',
  '/locations'
];

const services = [
  { slug: 'residential-cleaning' },
  { slug: 'commercial-cleaning' },
  {
    slug: 'handyman-services',
    subServices: [
      { slug: 'tv-mounting' },
      { slug: 'faucet-repair-installation' },
      { slug: 'ceiling-fan-installation' }
    ]
  },
  { slug: 'drywall-sheetrock-painting' },
  { slug: 'eco-friendly-cleaning' },
];

const areas = [
  {
    slug: 'raleigh',
    neighborhoods: [
      { slug: 'north-hills' },
      { slug: 'brier-creek' },
      { slug: 'oakwood' },
      { slug: 'boylan-heights' },
    ]
  },
  {
    slug: 'durham',
    neighborhoods: [
      { slug: 'brightleaf' },
      { slug: 'trinity-park' },
      { slug: 'southpoint' },
    ]
  },
  {
    slug: 'chapel-hill',
    neighborhoods: [
      { slug: 'meadowmont' },
      { slug: 'southern-village' },
    ]
  },
  { slug: 'cary' },
  { slug: 'apex' },
  { slug: 'morrisville' },
];


// --- Sitemap Generation ---

function generateSitemap() {
  const urls = new Set();

  // Helper to add URLs, ensuring correct routing format
  const addUrl = (path) => {
    // For the homepage, the path is just '/'
    const finalPath = path;
    urls.add(`${BASE_URL}${finalPath}`);
  };

  // 1. Static Pages
  addUrl('/');

  // 2. Service & Sub-Service Pages
  services.forEach(service => {
    addUrl(`/services/${service.slug}`);
    service.subServices?.forEach(sub => {
      addUrl(`/services/${service.slug}/${sub.slug}`);
    });
  });

  // 3. Programmatic Pages (Location, Location+Service, Neighborhood+Service)
  areas.forEach(area => {
    addUrl(`/locations/${area.slug}`); // Location landing page
    services.forEach(service => {
      // City + Service
      addUrl(`/locations/${area.slug}/services/${service.slug}`);
      // Neighborhood + Service
      area.neighborhoods?.forEach(neighborhood => {
        addUrl(`/locations/${area.slug}/${neighborhood.slug}/services/${service.slug}`);
      });
    });
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...urls].map(url => `
  <url>
    <loc>${url.replace(/&/g, '&amp;')}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`.trim();

  // Ensure the target directory exists
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(TARGET_FILE, sitemapContent);

  console.log(`✅ Sitemap generated successfully with ${urls.size} URLs!`);
  console.log(`✅ File saved to: ${TARGET_FILE}`);
}

generateSitemap();
