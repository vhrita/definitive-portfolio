import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import App from '../App'

function ScrollSections() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    // Extract language and section from pathname
    const pathParts = pathname.split('/').filter(Boolean)
    let language = 'en' // default language (English)
    let section = 'home'

    // Check if first part is a language code
    if (pathParts.length > 0) {
      const firstPart = pathParts[0]
      if (['pt', 'ja'].includes(firstPart)) {
        language = firstPart === 'pt' ? 'pt-BR' : firstPart
        section = pathParts[1] || 'home'
      } else if (['about', 'portfolio', 'contact'].includes(firstPart)) {
        // No language prefix means English (default)
        section = firstPart
      }
    }

    // Change language if different from current
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }

    // Wait for language change to complete, then scroll
    const scrollToSection = () => {
      // Map section to element ID
      const sectionMap = {
        'home': 'home',
        'about': 'about',
        'portfolio': 'portfolio',
        'contact': 'contact'
      }

      const sectionId = sectionMap[section] || 'home'

      // Function to attempt scroll with retry logic
      const attemptScroll = (attempts = 0) => {
        const element = document.getElementById(sectionId)

        if (element) {
          // Use smooth scroll for better UX, but instant on initial load
          const isInitialLoad = !window.history.state || window.history.state.key === undefined
          element.scrollIntoView({
            behavior: isInitialLoad ? 'instant' : 'smooth',
            block: 'start'
          })
        } else if (attempts < 10) {
          // Retry after 100ms if element not found, up to 10 times (1 second total)
          setTimeout(() => attemptScroll(attempts + 1), 100)
        }
      }

      attemptScroll()
    }

    // If language changed, wait a bit for translations to load
    if (i18n.language !== language) {
      setTimeout(scrollToSection, 200)
    } else {
      // For same language, still wait a bit to ensure DOM is ready
      setTimeout(scrollToSection, 50)
    }
  }, [pathname, i18n])

  return null
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollSections />
      <App />
      <Routes>
        {/* Default language routes (English) */}
        <Route path="/" element={null} />
        <Route path="/about" element={null} />
        <Route path="/portfolio" element={null} />
        <Route path="/contact" element={null} />

        {/* Portuguese routes */}
        <Route path="/pt" element={null} />
        <Route path="/pt/about" element={null} />
        <Route path="/pt/portfolio" element={null} />
        <Route path="/pt/contact" element={null} />

        {/* Japanese routes */}
        <Route path="/ja" element={null} />
        <Route path="/ja/about" element={null} />
        <Route path="/ja/portfolio" element={null} />
        <Route path="/ja/contact" element={null} />

        {/* Catch all route for 404 - redirect to home */}
        <Route path="*" element={null} />
      </Routes>
    </BrowserRouter>
  )
}