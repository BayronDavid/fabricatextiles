import { products } from '@/data/products';
import { cities } from '@/data/cities';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const urls = [
    `${base}/`,
    `${base}/plan`,
    `${base}/#soluciones`,
    `${base}/#capacidad`,
    `${base}/#contacto`
  ];

  products.forEach((p) => urls.push(`${base}/productos/${encodeURIComponent(p.slug)}`));
  cities.forEach((c) => urls.push(`${base}/envios/${encodeURIComponent(c.slug)}`));

  const lastmod = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n') +
    `\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
