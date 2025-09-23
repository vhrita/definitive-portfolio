import './style.scss';

import { motion } from 'framer-motion';
import { useState } from 'react';

import LangSelector from '../LangSelector';
import ResumeDownloader from '../ResumeDownloader';
import HamburgerMenu from '../HamburgerMenu';
import MobileSideBar from '../MobileSideBar';
import useIsMobile from '../../utils/useIsMobile';

function Navbar({ items, view = 'home', position = 0, background = false, isPortfolio = false, isContact = false }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isMobile = useIsMobile()
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
    return isPortfolio ? 'portfolio-mode' : ''
  }

  return (
    <>
      <motion.nav
        className={getNavbarClass()}
        style={(position >= 75 && (background && !isPortfolio)) && { backgroundColor: "#1d1c23cc" }}
      >
        <ResumeDownloader isPortfolio={isPortfolio} isContact={isContact} />

        {isMobile ? (
          // Mobile layout: Language selector + Hamburger menu
          <div className="nav-items mobile-layout">
            <motion.div
              initial={{ transform: "translateX(150%)" }}
              animate={{ transform: "translateX(0)" }}
              transition={{ duration: 0.8 }}
            >
              <LangSelector isPortfolio={isPortfolio} />
            </motion.div>
            <HamburgerMenu
              isOpen={isSidebarOpen}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              isPortfolio={isPortfolio}
            />
          </div>
        ) : (
          // Desktop layout: All items + Language selector
          <div className="nav-items desktop-layout">
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
              <LangSelector isPortfolio={isPortfolio} />
            </motion.div>
          </div>
        )}
      </motion.nav>

      <MobileSideBar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={items}
        view={view}
        onNavigate={jumpTo}
        isPortfolio={isPortfolio}
      />
    </>
  )
}

export default Navbar