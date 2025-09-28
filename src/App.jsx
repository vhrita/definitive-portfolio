import { useState, useEffect } from "react";

import { useScroll, useMotionValueEvent, inView } from "framer-motion";

import Navbar from "./components/Navbar";
import Social from "./components/Social";
import ErrorBoundary from "./components/ErrorBoundary";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));

import LocaleContext from "./config/internationalization/LocaleContext.js";
import i18n from "./config/internationalization/i18n";
import { useTranslation } from "react-i18next";

import { buildProjects } from "./data/projects";

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
	const projectTranslationsRaw = t("projects", { returnObjects: true });
	const projectTranslations = Array.isArray(projectTranslationsRaw) ? projectTranslationsRaw : [];
	const projects = buildProjects(projectTranslations);

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
			<a href="#main-content" className="skip-link">{t('accessibility.skipToMain')}</a>
			<ErrorBoundary>
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
			</ErrorBoundary>
			<main id="main-content">
				<ErrorBoundary>
					<Suspense fallback={<div className="page-loading">Loading...</div>}>
						<Home />
					</Suspense>
				</ErrorBoundary>
				<ErrorBoundary>
					<Suspense fallback={<div className="page-loading">Loading...</div>}>
						<About />
					</Suspense>
				</ErrorBoundary>
				<ErrorBoundary>
					<Suspense fallback={<div className="page-loading">Loading...</div>}>
						<Portfolio projects={projects} />
					</Suspense>
				</ErrorBoundary>
				<ErrorBoundary>
					<Suspense fallback={<div className="page-loading">Loading...</div>}>
						<Contact isContactInView={isContactInView} />
					</Suspense>
				</ErrorBoundary>
			</main>
		</LocaleContext.Provider>
	);
}

export default App;
