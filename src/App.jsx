import { useState, useEffect } from "react";

import { useScroll, useMotionValueEvent, inView } from "framer-motion";

import Navbar from "./components/Navbar";
import Social from "./components/Social";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";

import LocaleContext from "./config/internationalization/LocaleContext.js";
import i18n from "./config/internationalization/i18n";
import { useTranslation } from "react-i18next";

import imageExample from "./assets/background.jpg";
import baixarMangasImg from "./assets/portfolio/baixar-mangas.png";
import musaBotImg from "./assets/portfolio/musa-bot.png";
import stellaBotImg from "./assets/portfolio/stella-bot.png";
import imagineAiImg from "./assets/portfolio/imagine-ai.png";
import paladinsOverlayImg from "./assets/portfolio/paladins-dynamic-overlay.gif";
import definitivePortfolioImg from "./assets/portfolio/definitive-portfolio.png";
import familiaCataVentoImg from "./assets/portfolio/familia-cata-vento.png";
import kindleNewsletterImg from "./assets/portfolio/kindle_newsletter.png";
import investidorScraperImg from "./assets/portfolio/investidor10-scraper.png";

function App() {
	const [locale, setLocale] = useState(i18n.language);
	i18n.on("languageChanged", () => setLocale(i18n.language));

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
			social: "vertical",
		},
		{
			id: "contact",
			name: t("contact"),
			social: "vertical"
		}
	];

	const projectImageMap = {
		"baixar-mangas": { src: baixarMangasImg, position: "center center" },
		"musa-bot": { src: musaBotImg, position: "center 25%" },
		"stella-bot": { src: stellaBotImg, position: "center 25%" },
		"imagine-ai": { src: imagineAiImg, position: "center 25%" },
		"paladins-dynamic-overlay": { src: paladinsOverlayImg, position: "center 25%" },
		"definitive-portfolio": { src: definitivePortfolioImg, position: "center top" },
		"familia-cata-vento": { src: familiaCataVentoImg, position: "center top" },
		"kindle_newsletter": { src: kindleNewsletterImg, position: "center top" },
		"investidor10-scraper": { src: investidorScraperImg, position: "center top" },
	};

	const projects = t("projects", { returnObjects: true }).map(item => {
		const assetKeys = Array.isArray(item.images) && item.images.length > 0
			? item.images
			: [];

		const resolvedImages = [];
		const resolvedPositions = [];

		if (assetKeys.length > 0) {
			assetKeys.forEach(key => {
				const config = projectImageMap[key];
				if (config) {
					resolvedImages.push(config.src);
					resolvedPositions.push(config.position);
				} else {
					resolvedImages.push(imageExample);
					resolvedPositions.push("center top");
				}
			});
		}

		if (resolvedImages.length === 0) {
			resolvedImages.push(imageExample);
			resolvedPositions.push("center top");
		}

		return {
			title: item.title,
			description: item.description,
			images: resolvedImages,
			imagePositions: resolvedPositions,
			techs: item.techs,
			link: item.link,
			repository: item.repository,
		};
	});

	const { scrollY } = useScroll();
	const [position, setPosition] = useState(0);
	const [view, setView] = useState(pages[0]);
	const [social, setSocial] = useState(pages[0].social);
	const [isContactInView, setIsContactInView] = useState(false);
	const [isPortfolioInView, setIsPortfolioInView] = useState(false);
	const [lastViewChange, setLastViewChange] = useState(0);

	useMotionValueEvent(scrollY, "change", latest => {
		setPosition(latest);
	});

	useEffect(() => {
		pages.map(item => {
			let threshold = 0.5;
			if (item.id === 'contact') threshold = 0.3;
			if (item.id === 'portfolio') threshold = 0.2;

			inView(
				`#${item.id}`,
				() => {
					const now = Date.now();

					if (now - lastViewChange < 400) {
						return;
					}

					setLastViewChange(now);
					setView(item);

					if (item.id === 'contact') {
						setIsContactInView(true);
						setIsPortfolioInView(false);
						setTimeout(() => {
							setSocial(item.social);
						}, 800);
					} else if (item.id === 'portfolio') {
						setIsPortfolioInView(true);
						setIsContactInView(false);
						setSocial(item.social);
					} else {
						setIsContactInView(false);
						setIsPortfolioInView(false);
						setTimeout(() => {
							setSocial(item.social);
						}, 400);
					}
				},
				{ amount: threshold }
			);
		});
	}, [position, lastViewChange]);

	// Early portfolio detection based on scroll position
	useEffect(() => {
		const handleEarlyPortfolioDetection = () => {
			const portfolioElement = document.getElementById('portfolio')
			const contactElement = document.getElementById('contact')
			if (!portfolioElement || !contactElement) return

			const portfolioRect = portfolioElement.getBoundingClientRect()
			const contactRect = contactElement.getBoundingClientRect()
			const windowHeight = window.innerHeight

			const contactTop = contactRect.top
			const contactVisible = contactTop < windowHeight * 0.7

			if (contactVisible) {
				return
			}

			const portfolioTop = portfolioRect.top
			const portfolioVisible = portfolioTop < windowHeight * 0.3

			if (portfolioVisible && !isPortfolioInView && !isContactInView) {
				setIsPortfolioInView(true)
				setSocial('vertical')
				// Update view to portfolio when it's visible
				const portfolioPage = pages.find(page => page.id === 'portfolio')
				if (portfolioPage) {
					setView(portfolioPage)
				}
			} else if (!portfolioVisible && portfolioTop > windowHeight * 0.5 && isPortfolioInView && !isContactInView) {
				setIsPortfolioInView(false)
				// Reset view to about when portfolio is no longer visible
				const aboutPage = pages.find(page => page.id === 'about')
				if (aboutPage) {
					setView(aboutPage)
				}
			}
		}

		window.addEventListener('scroll', handleEarlyPortfolioDetection)
		handleEarlyPortfolioDetection()

		return () => window.removeEventListener('scroll', handleEarlyPortfolioDetection)
	}, [isPortfolioInView, isContactInView, pages]);

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			<Navbar
				items={pages}
				view={view.id}
				position={position}
				background={view.social === "vertical"}
				isPortfolio={isPortfolioInView || isContactInView}
				isContact={isContactInView}
			/>
			<Social
				orientation={social}
				isContactInView={isContactInView}
				isPortfolio={isPortfolioInView}
			/>
			<Home />
			<About />
			<Portfolio projects={projects} />
			<Contact isContactInView={isContactInView} />
		</LocaleContext.Provider>
	);
}

export default App;
