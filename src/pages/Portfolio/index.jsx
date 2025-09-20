import './style.scss'

import StickyCards from '../../components/StickyCards';


function Portfolio({ projects }) {
    return (
      <div id="portfolio">
        <StickyCards cards={projects} />
      </div>
    );
}

export default Portfolio