import './style.scss'

import { useState, useEffect } from "react";
import i18n from "../../config/internationalization/i18n";

import brFlag from '../../assets/icons/br_flag.svg';
import usFlag from '../../assets/icons/us_flag.svg';

const languages = [
  {
    code: "pt-BR",
    name: "Português",
    flag: brFlag,
  },
  {
    code: "en",
    name: "English",
    flag: usFlag,
  },
];

function normalizeLanguageCode(code) {
  if (!code) return null
  const lower = code.toLowerCase()
  // Match exact codes first, then allow partials like "pt" to fallback to "pt-BR"
  const exactMatch = languages.find(lang => lang.code.toLowerCase() === lower)
  if (exactMatch) return exactMatch.code

  const partialMatch = languages.find(lang => lower.startsWith(lang.code.toLowerCase()))
  return partialMatch ? partialMatch.code : null
}

function LangSelector({ isPortfolio = false }) {
  const initialLang = normalizeLanguageCode(i18n.language) ?? languages[0].code
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    const handleChange = (newLang) => {
      setLang(normalizeLanguageCode(newLang) ?? languages[0].code)
    }

    i18n.on('languageChanged', handleChange)
    return () => {
      i18n.off('languageChanged', handleChange)
    }
  }, [])

  const handleLanguage = (language) => {
    const nextCode = normalizeLanguageCode(language.code) ?? languages[0].code
    setLang(nextCode)
    i18n.changeLanguage(nextCode)
  };

  const currentLanguage = languages.find(obj => obj.code === lang) ?? languages[0]

  return (
    <>
      <div id="language-selector" className={isPortfolio ? 'portfolio-mode' : ''}>
        <img src={currentLanguage.flag} alt={currentLanguage.name} />
        <div>
          {languages.map(l => (
            <button key={l.code} onClick={() => handleLanguage(l)} disabled={l.code === lang}>
              <img src={l.flag} alt={l.name} />
              {l.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default LangSelector;
