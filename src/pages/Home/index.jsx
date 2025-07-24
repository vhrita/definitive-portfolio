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
        whileInView={{ width: "var(--first-span-width)" }}
        transition={{ duration: 1 }}
      ></motion.span>
      <motion.div
        animate={{
          '--float-before-x': ['0px', '10px', '-8px', '12px', '0px'],
          '--float-before-y': ['0px', '-10px', '5px', '-12px', '0px'],
          '--float-after-x':  ['0px', '-12px', '8px', '-15px', '0px'],
          '--float-after-y':  ['0px', '8px', '-5px', '15px', '0px'],
        }}
        transition={{
          duration: 10,
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
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
          {[...Array(2)].map((_e, i) => (
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
      </motion.div>
    </motion.div>
  );
}

export default Home;
