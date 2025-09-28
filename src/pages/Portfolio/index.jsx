import './style.scss'

import StickyCards from '../../components/StickyCards';


function Portfolio({ projects }) {
	return (
	  <section id="portfolio">
	    <div className="portfolio__shell">
	      <StickyCards cards={projects} />
	    </div>
	  </section>
	);
}

export default Portfolio
