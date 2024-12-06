const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'weekly', priority: 0.8 },
];

const generateSitemap = async () => {
  const stream = new SitemapStream({ hostname: 'https://webdev-dhawal.github.io/website-main' });
  links.forEach(link => stream.write(link));
  stream.end();

  const sitemap = await streamToPromise(stream);
  fs.writeFileSync('./public/sitemap.xml', sitemap.toString());
};

generateSitemap()
  .then(() => console.log('Sitemap generated successfully'))
  .catch(err => console.error('Error generating sitemap:', err));
