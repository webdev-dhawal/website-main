const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

// Define the list of URLs for your website
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'weekly', priority: 0.8 },
];

// Function to generate the sitemap
const generateSitemap = async () => {
  try {
    // Create a sitemap stream
    const stream = new SitemapStream({
      hostname: 'https://webdev-dhawal.github.io/website-main',
    });

    // Write each link to the sitemap stream
    links.forEach((link) => stream.write(link));
    stream.end();

    // Convert the stream to a string
    const sitemap = await streamToPromise(stream);

    // Save the sitemap to the public directory
    fs.writeFileSync('./public/sitemap.xml', sitemap.toString());

    console.log('Sitemap generated successfully!');
  } catch (err) {
    console.error('Error generating sitemap:', err);
  }
};

// Call the function to generate the sitemap
generateSitemap();
