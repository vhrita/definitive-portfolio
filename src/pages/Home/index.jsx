import './style.scss'

import Typewriter from 'typewriter-effect'
import { useTranslation } from 'react-i18next'

const mainSkills = [
  'React.js',
  'Vue.js',
  'Node.js',
  'Adobe Experience Manager'
]

function Home() {

  const { t } = useTranslation()

  return (
    <div id="home">
      <div>
        <h1>
          {t("greatings")} <b>Vitor</b>.
        </h1>
        <p>{t("position")}</p>
        <div>
          <span>{t("skillsPrefix")}</span>
          <Typewriter
            className="skills"
            options={{
              strings: mainSkills,
              autoStart: true,
              loop: true,
              pauseFor: 2000,
            }}
          />
        </div>
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Home;
