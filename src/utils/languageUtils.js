import { NON_DEFAULT_LANGUAGES, ROUTE_SECTIONS } from '../config/constants'

const DEFAULT_LANGUAGE = 'en'

/**
 * Normalize various language code formats to standard codes
 */
export function normalizeLanguageCode(code) {
  if (!code) return DEFAULT_LANGUAGE

  const lower = code.toLowerCase()
  const base = lower.split(/[-_]/)[0]

  if (base === 'jp') return 'ja'
  if (lower === 'pt-br' || base === 'pt') return 'pt'
  if (base === 'ja') return 'ja'
  if (base === 'en') return 'en'

  return DEFAULT_LANGUAGE
}

/**
 * Parse URL path and extract language and section
 */
export function parsePathLanguage(pathname) {
  const pathParts = pathname.split('/').filter(Boolean)
  const firstPart = pathParts[0]

  let language = DEFAULT_LANGUAGE
  let section = 'home'

  if (NON_DEFAULT_LANGUAGES.includes(firstPart)) {
    language = firstPart === 'pt' ? 'pt-BR' : firstPart
    section = pathParts[1] || 'home'
  } else if (ROUTE_SECTIONS.includes(firstPart)) {
    section = firstPart
  }

  return { language, section }
}

/**
 * Build URL path for language and section
 */
export function buildPath(language, section) {
  const normalizedLang = normalizeLanguageCode(language)
  const langPrefix = NON_DEFAULT_LANGUAGES.includes(normalizedLang)
    ? `/${normalizedLang}`
    : ''

  const sectionPath = section === 'home' ? '' : `/${section}`

  return `${langPrefix}${sectionPath}` || '/'
}
