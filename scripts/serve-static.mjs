import { createServer } from 'http'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync } from 'fs'
import { extname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const distPath = join(__dirname, '../dist')

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json'
}

// Define exact routes for static SEO pages
const staticRoutes = {
  '/': '/index.html',
  '/about': '/about/index.html',
  '/portfolio': '/portfolio/index.html',
  '/contact': '/contact/index.html',
  '/pt': '/pt/index.html',
  '/pt/': '/pt/index.html',
  '/pt/about': '/pt/about/index.html',
  '/pt/portfolio': '/pt/portfolio/index.html',
  '/pt/contact': '/pt/contact/index.html',
  '/ja': '/ja/index.html',
  '/ja/': '/ja/index.html',
  '/ja/about': '/ja/about/index.html',
  '/ja/portfolio': '/ja/portfolio/index.html',
  '/ja/contact': '/ja/contact/index.html'
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const pathname = url.pathname

  // Check for static routes first
  if (staticRoutes[pathname]) {
    const filePath = join(distPath, staticRoutes[pathname])
    if (existsSync(filePath)) {
      console.log(`📄 Serving static: ${pathname} -> ${staticRoutes[pathname]}`)
      const content = readFileSync(filePath, 'utf8')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(content)
      return
    }
  }

  // Serve static assets
  if (pathname.startsWith('/assets/') || pathname.includes('.')) {
    const filePath = join(distPath, pathname)
    if (existsSync(filePath)) {
      const ext = extname(pathname)
      const contentType = mimeTypes[ext] || 'application/octet-stream'
      const content = readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content)
      return
    }
  }

  // SPA fallback
  console.log(`🔄 SPA fallback: ${pathname} -> /index.html`)
  const indexPath = join(distPath, 'index.html')
  if (existsSync(indexPath)) {
    const content = readFileSync(indexPath, 'utf8')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(content)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
  }
})

const PORT = 4174
server.listen(PORT, () => {
  console.log(`🚀 Static server running at http://localhost:${PORT}`)
  console.log(`📁 Serving from: ${distPath}`)
  console.log(`\n🧪 Test URLs:`)
  console.log(`   http://localhost:${PORT}/pt/contact`)
  console.log(`   http://localhost:${PORT}/ja/contact`)
})