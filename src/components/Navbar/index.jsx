import './style.scss';

import { motion } from 'framer-motion';

import LangSelector from '../LangSelector';

function Navbar({ items, view = 'home', position = 0, background = false }) {  
  const jumpTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }

    return (
      <motion.nav style={(position >= 75 && background) && { backgroundColor: "#1d1c23cc" }}>
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
            <LangSelector />
          </motion.div>
        </div>
      </motion.nav>
    );
}

export default Navbar