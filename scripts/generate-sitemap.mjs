import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const hostname = 'https://vhrita.dev'

// Define routes with their SEO priority and change frequency
const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString()
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString()
  },
  {
    url: '/portfolio',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString()
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString()
  }
]

// Add language variants (English is default, no prefix)
const languages = ['en', 'pt', 'ja']
const allRoutes = []

// Add default routes (English)
allRoutes.push(...routes)

// Add language-specific routes
languages.forEach(lang => {
  if (lang === 'en') return // Skip English as it's already added as default

  const langPrefix = lang === 'pt' ? '/pt' : `/${lang}`
  routes.forEach(route => {
    allRoutes.push({
      ...route,
      url: langPrefix + route.url,
      priority: route.priority * 0.9 // Slightly lower priority for non-default language
    })
  })
})

// Create sitemap
const sitemap = new SitemapStream({ hostname })
const outputPath = join(__dirname, '../dist/sitemap.xml')

console.log('Generating sitemap...')
console.log(`Total routes: ${allRoutes.length}`)

try {
  allRoutes.forEach(route => {
    sitemap.write(route)
    console.log(`Added: ${route.url}`)
  })

  sitemap.end()

  const xml = await streamToPromise(sitemap)
  const writeStream = createWriteStream(outputPath)
  writeStream.write(xml)
  writeStream.end()

  console.log(`✅ Sitemap generated successfully at: ${outputPath}`)
  console.log(`📊 Total URLs: ${allRoutes.length}`)
} catch (error) {
  console.error('❌ Error generating sitemap:', error)
  process.exit(1)
}