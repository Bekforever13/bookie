import React from 'react'

function generateSitemapContent(): string {
	const url = 'https://bookie.uz/'
	const lastmod = '2022-10-16'
	const changefreq = 'monthly'
	const priority = '1.0'

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
</urlset>`
}

const Sitemap: React.FC = () => {
	// Генерация содержимого файла sitemap.xml
	const sitemapContent = generateSitemapContent()

	// Отправка содержимого файла sitemap.xml в ответ на запрос
	return <pre>{sitemapContent}</pre>
}

export { Sitemap }
