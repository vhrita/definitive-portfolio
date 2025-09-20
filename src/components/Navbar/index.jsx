import './style.scss';

import { motion } from 'framer-motion';

import LangSelector from '../LangSelector';

function Navbar({ items, view = 'home', position = 0, background = false, isPortfolio = false, isContact = false }) {
  const jumpTo = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const startPosition = window.pageYOffset
      const targetPosition = element.offsetTop
      const distance = targetPosition - startPosition
      const duration = 800
      let start = null

      function animation(currentTime) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        } else {
          setTimeout(() => {
            window.dispatchEvent(new Event('scroll'))
          }, 100)
        }
      }

      function easeInOutCubic(t, b, c, d) {
        t /= d / 2
        if (t < 1) return c / 2 * t * t * t + b
        t -= 2
        return c / 2 * (t * t * t + 2) + b
      }

      requestAnimationFrame(animation)
    }
  }

  const getNavbarClass = () => {
    if (isPortfolio) return 'portfolio-mode'
    if (isContact) return 'contact-mode'
    return ''
  }

  return (
    <motion.nav
      className={getNavbarClass()}
      style={(position >= 75 && (background && !isPortfolio && !isContact)) && { backgroundColor: "#1d1c23cc" }}
    >
      <div>
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index != 0 && index / 3 }}
            className={view === item.id ? 'active' : '' }
            onClick={() => jumpTo(item.id)}
          >
            {item.name}
          </motion.button>
        ))}
        <motion.div
          initial={{ transform: "translateX(150%)" }}
          animate={{ transform: "translateX(0)" }}
          transition={{ duration: 0.8 }}
        >
          <LangSelector isPortfolio={isPortfolio || isContact} />
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar