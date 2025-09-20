import './style.scss'

import { useState } from "react";
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

function LangSelector({ isPortfolio = false }) {
  const [ lang, setLang ] = useState(i18n.language)

  const handleLanguage = (language) => {
    setLang(language.code);
    i18n.changeLanguage(language.code);
  };

  return (
    <>
      <div id="language-selector" className={isPortfolio ? 'portfolio-mode' : ''}>
        <img src={languages.find(obj => obj.code === lang).flag} />
        <div>
          {languages.map(l => (
            <button key={l.code} onClick={() => handleLanguage(l)} disabled={l.code === lang}>
              <img src={l.flag} />
              {l.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default LangSelector;
