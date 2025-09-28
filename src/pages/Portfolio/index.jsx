import './style.scss'

import StickyCards from '../../components/StickyCards';
import { useTranslation } from 'react-i18next';


function Portfolio({ projects }) {
	const { t } = useTranslation();
	return (
	  <section id="portfolio" aria-label={t('accessibility.portfolioProjects')}>
	    <div className="portfolio__shell">
	      <StickyCards cards={projects} />
	    </div>
	  </section>
	);
}

export default Portfolio
