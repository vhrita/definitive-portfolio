import { writeFileSync, mkdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let mainJsPath = '/assets/index.js'
let mainCssPath = '/assets/index.css'

try {
  const indexHtml = readFileSync(join(__dirname, '../dist/index.html'), 'utf8')
  const jsMatch = indexHtml.match(/src="(\/assets\/index-[^"]+\.js)"/);
  const cssMatch = indexHtml.match(/href="(\/assets\/index-[^"]+\.css)"/);

  if (jsMatch) mainJsPath = jsMatch[1]
  if (cssMatch) mainCssPath = cssMatch[1]
} catch (error) {
  console.warn('Could not read index.html for asset paths, using defaults')
}

const enTranslations = JSON.parse(readFileSync(join(__dirname, '../src/config/internationalization/locales/en/translation.json'), 'utf8'))
const ptTranslations = JSON.parse(readFileSync(join(__dirname, '../src/config/internationalization/locales/pt-BR/translation.json'), 'utf8'))
const jaTranslations = JSON.parse(readFileSync(join(__dirname, '../src/config/internationalization/locales/ja/translation.json'), 'utf8'))

const translations = {
  en: enTranslations.translation,
  pt: ptTranslations.translation,
  ja: jaTranslations.translation
}

const routes = [
  { path: '/', section: 'home', lang: 'en' },
  { path: '/about', section: 'about', lang: 'en' },
  { path: '/portfolio', section: 'portfolio', lang: 'en' },
  { path: '/contact', section: 'contact', lang: 'en' },
  { path: '/pt/', section: 'home', lang: 'pt' },
  { path: '/pt/about', section: 'about', lang: 'pt' },
  { path: '/pt/portfolio', section: 'portfolio', lang: 'pt' },
  { path: '/pt/contact', section: 'contact', lang: 'pt' },
  { path: '/ja/', section: 'home', lang: 'ja' },
  { path: '/ja/about', section: 'about', lang: 'ja' },
  { path: '/ja/portfolio', section: 'portfolio', lang: 'ja' },
  { path: '/ja/contact', section: 'contact', lang: 'ja' },
]

function getTranslation(lang, key, fallback) {
  try {
    const keys = key.split('.')
    let result = translations[lang]
    for (const k of keys) {
      result = result?.[k]
      if (!result) break
    }
    return result || fallback
  } catch (error) {
    return fallback
  }
}

function generateHTML(route) {
  const { path, section, lang } = route

  const seoData = {
    home: {
      title: getTranslation(lang, 'seo.home.title', 'Vitor Rita — Senior Software Engineer'),
      description: getTranslation(lang, 'seo.home.description', 'Portfolio of a Senior Software Engineer specialized in React, Vue.js, Node.js and Adobe Experience Manager.'),
      ogType: 'website'
    },
    about: {
      title: getTranslation(lang, 'seo.about.title', 'About — Vitor Rita'),
      description: getTranslation(lang, 'seo.about.description', 'Learn about my background, skills and experience as a Senior Software Engineer.'),
      ogType: 'profile'
    },
    portfolio: {
      title: getTranslation(lang, 'seo.portfolio.title', 'Projects — Vitor Rita'),
      description: getTranslation(lang, 'seo.portfolio.description', 'Explore my selected projects including Discord bots, manga readers, AI tools and enterprise web applications.'),
      ogType: 'website'
    },
    contact: {
      title: getTranslation(lang, 'seo.contact.title', 'Contact — Vitor Rita'),
      description: getTranslation(lang, 'seo.contact.description', 'Get in touch for freelance projects, full-time opportunities or collaboration.'),
      ogType: 'website'
    }
  }

  const meta = seoData[section]

  // Get language-specific Open Graph image
  const getOgImage = () => {
    const ogImages = {
      en: 'https://vhrita.dev/og-image.png',
      pt: 'https://vhrita.dev/og-image-pt.png',
      ja: 'https://vhrita.dev/og-image-ja.png'
    }
    return ogImages[lang] || ogImages.en
  }

  return `<!doctype html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- SEO Meta Tags for crawlers (React Helmet will override for browsers) -->
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta name="author" content="Vitor Rita" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="https://vhrita.dev${path}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${meta.ogType}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${getOgImage()}" />
    <meta property="og:image:alt" content="${meta.title}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://vhrita.dev${path}" />
    <meta property="og:site_name" content="Vitor Rita Portfolio" />
    <meta property="og:locale" content="${lang === 'pt' ? 'pt_BR' : lang === 'ja' ? 'ja_JP' : 'en_US'}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${getOgImage()}" />
    <meta name="twitter:image:alt" content="${meta.title}" />
    <meta name="twitter:creator" content="@vhrita" />
    <meta name="twitter:site" content="@vhrita" />

    <!-- Hreflang -->
    <link rel="alternate" hrefLang="en" href="https://vhrita.dev${section === 'home' ? '/' : '/' + section}" />
    <link rel="alternate" hrefLang="pt-br" href="https://vhrita.dev/pt${section === 'home' ? '/' : '/' + section}" />
    <link rel="alternate" hrefLang="ja" href="https://vhrita.dev/ja${section === 'home' ? '/' : '/' + section}" />
    <link rel="alternate" hrefLang="x-default" href="https://vhrita.dev${section === 'home' ? '/' : '/' + section}" />

    <!-- Theme -->
    <meta name="theme-color" content="#2bcab6" />
    <meta name="msapplication-TileColor" content="#242424" />

    <!-- Preconnects -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Completely block SPA for crawlers -->
    <script>
      // Comprehensive crawler detection
      const ua = navigator.userAgent.toLowerCase();
      const isCrawler = /(bot|crawler|spider|facebookexternalhit|whatsapp|twitterbot|linkedinbot|slackbot|telegrambot|googlebot|bingbot|duckduckbot|baiduspider|yandex|facebook|meta|instagram|snapchat|pinterest|tumblr|reddit|discord|skype|viber|telegram|line|wechat|externalhit|preview)/.test(ua);

      // Also check for headless browsers
      const isHeadless = navigator.webdriver || window.navigator.webdriver || window.callPhantom || window._phantom || window.phantom;

      // If any crawler detected, completely prevent SPA loading
      if (isCrawler || isHeadless) {
        // Block all script loading immediately
        window.stop && window.stop();

        // Override createElement to prevent any script injection
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
          if (tagName.toLowerCase() === 'script') {
            // Return dummy script that does nothing
            const dummy = originalCreateElement.call(this, 'div');
            dummy.src = '';
            dummy.type = 'text/plain';
            return dummy;
          }
          return originalCreateElement.call(this, tagName);
        };

        // Block appendChild for scripts
        const originalAppendChild = HTMLElement.prototype.appendChild;
        HTMLElement.prototype.appendChild = function(child) {
          if (child.tagName && child.tagName.toLowerCase() === 'script') {
            return child; // Do nothing, return the element
          }
          return originalAppendChild.call(this, child);
        };

        // Ensure SEO content is visible
        document.addEventListener('DOMContentLoaded', () => {
          const seoContent = document.getElementById('seo-content');
          const appRoot = document.getElementById('root');
          if (seoContent) {
            seoContent.style.display = 'block';
            seoContent.style.visibility = 'visible';
          }
          if (appRoot) {
            appRoot.style.display = 'none';
            appRoot.style.visibility = 'hidden';
          }
        });
      } else {
        // Load SPA for real users
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.crossOrigin = 'anonymous';
        css.href = '${mainCssPath}';
        document.head.appendChild(css);

        const js = document.createElement('script');
        js.type = 'module';
        js.crossOrigin = 'anonymous';
        js.src = '${mainJsPath}';
        document.head.appendChild(js);

        document.addEventListener('DOMContentLoaded', () => {
          const seoContent = document.getElementById('seo-content');
          const appRoot = document.getElementById('root');
          if (seoContent) seoContent.style.display = 'none';
          if (appRoot) appRoot.style.display = 'block';
        });
      }
    </script>
</head>
<body>
    <div id="seo-content">
        <h1>${meta.title}</h1>
        <p>${meta.description}</p>
        <p>Loading portfolio...</p>
    </div>
    <div id="root" style="display: none;"></div>
</body>
</html>`
}

console.log('🚀 Generating static SEO pages...')

routes.forEach(route => {
  const html = generateHTML(route)
  let filePath = route.path === '/' ? 'index.html' : route.path + '/index.html'
  filePath = filePath.replace('//', '/')
  const fullPath = join(__dirname, '../dist', filePath)

  mkdirSync(dirname(fullPath), { recursive: true })
  writeFileSync(fullPath, html, 'utf8')
  console.log(`✅ Generated: ${filePath}`)
})

const htaccessContent = `RewriteEngine On
RewriteRule ^$ /index.html [L]
RewriteRule ^about$ /about/index.html [L]
RewriteRule ^portfolio$ /portfolio/index.html [L]
RewriteRule ^contact$ /contact/index.html [L]
RewriteRule ^pt$ /pt/index.html [L]
RewriteRule ^pt/about$ /pt/about/index.html [L]
RewriteRule ^pt/portfolio$ /pt/portfolio/index.html [L]
RewriteRule ^pt/contact$ /pt/contact/index.html [L]
RewriteRule ^ja$ /ja/index.html [L]
RewriteRule ^ja/about$ /ja/about/index.html [L]
RewriteRule ^ja/portfolio$ /ja/portfolio/index.html [L]
RewriteRule ^ja/contact$ /ja/contact/index.html [L]
RewriteRule ^(.*)$ /index.html [L]
`

writeFileSync(join(__dirname, '../dist/.htaccess'), htaccessContent, 'utf8')
console.log('✅ Generated: .htaccess')
console.log(`🎉 Generated ${routes.length} SEO pages successfully!`)