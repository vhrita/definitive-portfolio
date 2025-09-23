import './style.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

function MobileSideBar({ isOpen, onClose, items, view, onNavigate, isPortfolio = false }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleItemClick = (id) => {
    onNavigate(id)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.div
            className={`mobile-sidebar ${isPortfolio ? 'portfolio-mode' : ''}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="sidebar-header">
              <button className="close-button" onClick={onClose}>
                <span></span>
                <span></span>
              </button>
            </div>

            <nav className="sidebar-nav">
              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  className={`sidebar-item ${view === item.id ? 'active' : ''}`}
                  onClick={() => handleItemClick(item.id)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileSideBar