import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Social from "./components/Social";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Porfolio";

import LocaleContext from "./config/internationalization/LocaleContext.js";
import i18n from './config/internationalization/i18n';
import { useTranslation } from "react-i18next";

import imageExample from "./assets/background.jpg";

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

    const projects = [
      {
        title: "aaaa",
        description: "aaaa",
        images: Array(3).fill(imageExample),
        techs: ["HTML", "CSS3"],
      },
      {
        title: "bbbb",
        description: "aaaa",
        images: Array(3).fill(imageExample),
        techs: ["HTML", "CSS3"],
      },
      {
        title: "cccc",
        description: "aaaa",
        images: Array(3).fill(imageExample),
        techs: ["HTML", "CSS3"],
      },
    ];

    return (
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <Navbar items={pages} />
        <Social />
        <Home />
        <About />
        <Portfolio projects={projects}/>
      </LocaleContext.Provider>
    );
}

export default App;
