import './style.scss'

import CardSlider from '../../components/CardSlider';


function Portfolio({ projects }) {
    
    
    return (
      <div id="portfolio">
        <CardSlider cards={projects} />
      </div>
    );
}

export default Portfolio