import './style.scss'

import { useEffect, useRef, useState } from 'react';
import i18n from '../../config/internationalization/i18n';

import brFlag from '../../assets/icons/br_flag.svg';
import usFlag from '../../assets/icons/us_flag.svg';
import jpFlag from '../../assets/icons/jp_flag.svg';

const DEFAULT_LANGUAGE = 'en';

const languages = [
  {
    code: 'en',
    name: 'English',
    shortCode: 'EN',
    flag: usFlag,
  },
  {
    code: 'pt',
    name: 'Português',
    shortCode: 'PT',
    flag: brFlag,
  },
  {
    code: 'ja',
    name: '日本語',
    shortCode: 'JP',
    flag: jpFlag,
  },
];

function normalizeLanguageCode(code) {
  if (!code) return null
  const lower = code.toLowerCase()
  const base = lower.split(/[-_]/)[0]

  if (base === 'jp') return 'ja'

  const exactMatch = languages.find(lang => lang.code.toLowerCase() === lower)
  if (exactMatch) return exactMatch.code

  const baseMatch = languages.find(lang => lang.code.toLowerCase() === base)
  if (baseMatch) return baseMatch.code

  const partialMatch = languages.find(lang => lower.startsWith(lang.code.toLowerCase()))
  if (partialMatch) return partialMatch.code

  return DEFAULT_LANGUAGE
}

function LangSelector({ isPortfolio = false }) {
  const initialLang = normalizeLanguageCode(i18n.language)
  const [lang, setLang] = useState(initialLang)
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef(null)

  useEffect(() => {
    const handleChange = (newLang) => {
      setLang(normalizeLanguageCode(newLang) ?? languages[0].code)
      setIsOpen(false)
    }

    i18n.on('languageChanged', handleChange)
    return () => {
      i18n.off('languageChanged', handleChange)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEsc = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEsc)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const handleLanguage = (language) => {
    const nextCode = normalizeLanguageCode(language.code) ?? languages[0].code
    setLang(nextCode)
    i18n.changeLanguage(nextCode)
    setIsOpen(false)
  };

  const currentLanguage = languages.find(obj => obj.code === lang) ?? languages[0]
  const dropdownId = 'language-selector-dropdown'

  return (
    <div
      ref={selectorRef}
      id="language-selector"
      className={`${isPortfolio ? 'portfolio-mode' : ''} ${isOpen ? 'open' : ''}`.trim()}
    >
      <button
        type="button"
        className="language-selector__toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
      >
        <span className="language-selector__flag">
          <img src={currentLanguage.flag} alt={currentLanguage.name} />
        </span>
        <span className="language-selector__code">{currentLanguage.shortCode}</span>
        <span className="language-selector__chevron" aria-hidden="true" />
      </button>
      <div
        id={dropdownId}
        className="language-selector__dropdown"
        role="listbox"
        aria-activedescendant={`language-option-${currentLanguage.code}`}
      >
        {languages.map((l) => (
          <button
            key={l.code}
            id={`language-option-${l.code}`}
            type="button"
            role="option"
            aria-selected={l.code === lang}
            onClick={() => handleLanguage(l)}
            disabled={l.code === lang}
            className="language-selector__option"
          >
            <span className="language-selector__flag">
              <img src={l.flag} alt={l.name} />
            </span>
            <span className="language-selector__details">
              <span className="language-selector__option-code">{l.shortCode}</span>
              <span className="language-selector__option-name">{l.name}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default LangSelector;
