import React, { useState, useEffect } from "react";

import { useScroll, useMotionValueEvent, inView } from "framer-motion";

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
        name: t("home"),
        social: "vertical",
      },
      {
        id: "about",
        name: t("about"),
        social: "vertical",
      },
      {
        id: "portfolio",
        name: t("portfolio"),
        social: "horizontal",
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

    const { scrollY } = useScroll();
    const [position, setPosition] = useState(0);
    const [view, setView] = useState(pages[0]);
    const [ social, setSocial ] = useState(pages[0].social)

    useMotionValueEvent(scrollY, "change", (latest) => {
      setPosition(latest);
    });

    useEffect(() => {
      pages.map((item) => {
        inView(
          `#${item.id}`,
          () => {
            setView(item);
            setTimeout(() => {
              setSocial(item.social)
            }, 400);
          },
          { amount: 0.5 }
        );
      });
    }, [position]);

    return (
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <Navbar items={pages} view={view.id} position={position} background={view.social === "vertical"} />
        <Social orientation={social} />
        <Home />
        <About />
        <Portfolio projects={projects}/>
      </LocaleContext.Provider>
    );
}

export default App;
