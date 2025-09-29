import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const siteUrl = 'https://vhrita.dev'

export default function SEO() {
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation()

  // Extract language and section from URL pathname
  const pathParts = pathname.split('/').filter(Boolean)
  let currentLang = 'en' // default
  let baseSection = '/'

  if (pathParts.length > 0) {
    const firstPart = pathParts[0]
    if (['pt', 'ja'].includes(firstPart)) {
      // Language prefix route: /pt/about, /ja/portfolio
      currentLang = firstPart // Use 'pt' and 'ja' directly
      baseSection = pathParts.length > 1 ? `/${pathParts[1]}` : '/'
    } else if (['about', 'portfolio', 'contact'].includes(firstPart)) {
      // Direct section route (English default): /about, /portfolio
      currentLang = 'en'
      baseSection = `/${firstPart}`
    }
  }

  // Force translation to use the detected language
  const tWithLang = (key, fallback) => {
    try {
      const fixedT = i18n.getFixedT(currentLang)
      return fixedT(key, fallback)
    } catch (error) {
      return fallback
    }
  }

  // Define route-specific meta data
  const routes = {
    '/': {
      title: tWithLang('seo.home.title', 'Vitor Rita — Senior Software Engineer'),
      description: tWithLang('seo.home.description', 'Portfolio of a Senior Software Engineer specialized in React, Vue.js, Node.js and Adobe Experience Manager. View my projects and get in touch.'),
      ogType: 'website',
      keywords: tWithLang('seo.home.keywords', 'software engineer, frontend developer, react, vue, nodejs, portfolio, vitor rita'),
    },
    '/about': {
      title: tWithLang('seo.about.title', 'About — Vitor Rita'),
      description: tWithLang('seo.about.description', 'Learn about my background, skills and experience as a Senior Software Engineer. Specialized in modern web technologies and enterprise solutions.'),
      ogType: 'profile',
      keywords: tWithLang('seo.about.keywords', 'about, background, skills, experience, software engineer, web developer'),
    },
    '/portfolio': {
      title: tWithLang('seo.portfolio.title', 'Projects — Vitor Rita'),
      description: tWithLang('seo.portfolio.description', 'Explore my selected projects including Discord bots, manga readers, AI tools and enterprise web applications built with modern technologies.'),
      ogType: 'website',
      keywords: tWithLang('seo.portfolio.keywords', 'projects, portfolio, discord bot, web applications, react projects, vue projects'),
    },
    '/contact': {
      title: tWithLang('seo.contact.title', 'Contact — Vitor Rita'),
      description: tWithLang('seo.contact.description', 'Get in touch for freelance projects, full-time opportunities or collaboration. Available for remote work worldwide.'),
      ogType: 'website',
      keywords: tWithLang('seo.contact.keywords', 'contact, hire, freelance, remote work, software engineer, collaboration'),
    }
  }

  const meta = routes[baseSection] || routes['/']
  const canonicalUrl = `${siteUrl}${pathname}`

  // Generate hreflang URLs using baseSection (English is default)
  const altUrls = {
    en: `${siteUrl}${baseSection === '/' ? '/' : baseSection}`,
    pt: `${siteUrl}/pt${baseSection === '/' ? '/' : baseSection}`,
    ja: `${siteUrl}/ja${baseSection === '/' ? '/' : baseSection}`
  }

  // Structured data based on page type
  const getStructuredData = () => {
    const basePersonData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Vitor Hugo Ramos Rita",
      "url": siteUrl,
      "jobTitle": "Senior Software Engineer",
      "description": meta.description,
      "image": `${siteUrl}/vitor-rita.png`,
      "sameAs": [
        "https://www.linkedin.com/in/vhrita",
        "https://github.com/vhrita",
        "https://instagram.com/vhrita.dev"
      ],
      "knowsAbout": [
        "React.js",
        "Vue.js",
        "Node.js",
        "Adobe Experience Manager",
        "TypeScript",
        "JavaScript",
        "Frontend Development",
        "Backend Development"
      ],
      "alumniOf": {
        "@type": "Organization",
        "name": "Software Engineering"
      }
    }

    if (baseSection === '/portfolio') {
      return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": "Vitor Rita Portfolio",
        "author": basePersonData,
        "description": meta.description,
        "url": canonicalUrl
      }
    }

    return basePersonData
  }

  const structuredData = getStructuredData()

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content="Vitor Rita" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="UTF-8" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta property="og:image:alt" content={meta.title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Vitor Rita Portfolio" />
      <meta property="og:locale" content={currentLang === 'pt' ? 'pt_BR' : currentLang === 'ja' ? 'ja_JP' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
      <meta name="twitter:image:alt" content={meta.title} />
      <meta name="twitter:creator" content="@vhrita" />
      <meta name="twitter:site" content="@vhrita" />

      {/* Hreflang for internationalization */}
      <link rel="alternate" hrefLang="en" href={altUrls.en} />
      <link rel="alternate" hrefLang="pt-br" href={altUrls.pt} />
      <link rel="alternate" hrefLang="ja" href={altUrls.ja} />
      <link rel="alternate" hrefLang="x-default" href={altUrls.en} />

      {/* Favicon and Apple Touch Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />


      {/* Theme color for browsers */}
      <meta name="theme-color" content="#2bcab6" />
      <meta name="msapplication-TileColor" content="#242424" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}