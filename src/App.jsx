import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Social from "./components/Social";
import Home from "./pages/Home";
import About from "./pages/About";

import LocaleContext from "./config/internationalization/LocaleContext.js";
import i18n from './config/internationalization/i18n';
import { useTranslation } from "react-i18next";

function App() {
    const [locale, setLocale] = useState(i18n.language);
    i18n.on('languageChanged', () => setLocale(i18n.language));

    const { t } = useTranslation();

    const pages = [
      {
        id: "home",
        name: t('home'),
      },
      {
        id: "about",
        name: t('about'),
      },
      {
        id: "portfolio",
        name: t('portfolio'),
      },
    ];

    return (
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <Navbar items={pages} />
        <Social />
        <Home />
        <About />
      </LocaleContext.Provider>
    );
}

export default App;
