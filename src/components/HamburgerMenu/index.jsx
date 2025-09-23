import './style.scss'
import { motion } from 'framer-motion'

function HamburgerMenu({ isOpen, onClick, isPortfolio = false }) {
  return (
    <motion.button
      className={`hamburger-menu ${isPortfolio ? 'portfolio-mode' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-label="Toggle menu"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}

export default HamburgerMenu