import './style.scss'

import Typewriter from 'typewriter-effect'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion';

const mainSkills = [
  'React.js',
  'Vue.js',
  'Node.js',
  'Adobe Experience Manager'
]

function Home() {

  const { t } = useTranslation()

  return (
    <motion.div id="home">
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "20%" }}
        transition={{ duration: 1 }}
      ></motion.span>
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
          {[...Array(2)].map((e, i) => (
            <motion.span
              key={i}
              whileInView={{ rotate: ["20deg", 0, "-20deg"] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror",
                repeatDelay: 2,
              }}
            ></motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
