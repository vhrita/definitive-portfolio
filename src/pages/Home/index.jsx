import './style.scss'

import Typewriter from 'typewriter-effect'
import Avatar from '../../../public/vite.svg'

const mainSkills = [
  'React.js',
  'Vue.js',
  'Node.js',
  'Adobe Experience Manager'
]

function Home() {
  return (
    <div id='home'>
      <div>
        <h1>
          Hello, I'm <b>Vitor</b>.
        </h1>
        <p>A FullStack Developer</p>
        <div>
          <span>Skilled In</span>
          <Typewriter
            className='skills'
            options={{
              strings: mainSkills,
              autoStart: true,
              loop: true,
              pauseFor: 2000,
            }}
            />
        </div>
      </div>
      <div>
        <img src={Avatar} alt="" />
      </div>
    </div>
  );
}

export default Home;
