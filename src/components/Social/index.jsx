import "./style.scss";

import { motion } from 'framer-motion';
import { SOCIAL_MEDIA } from '../../config/constants';

function Social({ orientation = 'vertical', isContactInView = false, isPortfolio = false }) {
  return (
    <motion.div
      id="social"
      className={`${orientation} ${isPortfolio ? 'portfolio-mode' : ''}`}
      animate={{
        opacity: isContactInView ? 0 : 1,
        scale: isContactInView ? 0.8 : 1,
        y: isContactInView ? (orientation === 'vertical' ? 50 : 0) : 0,
        x: isContactInView ? (orientation === 'horizontal' ? -50 : 0) : 0
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
        opacity: { duration: 0.6 }
      }}
    >
      <div key={orientation}>
        {SOCIAL_MEDIA.map((media, index) => (
          <motion.a
            key={media.name}
            href={media.link}
            target="_blank"
            initial={{ opacity: 0, rotate: "-320deg" }}
            animate={{
              opacity: isContactInView ? 0 : 1,
              rotate: "-360deg",
              scale: isContactInView ? 0.5 : 1
            }}
            transition={{
              duration: 1,
              delay: isContactInView
                ? index * 0.2
                : orientation === "vertical"
                  ? 0.3 + (SOCIAL_MEDIA.length - index) / 2
                  : 0.3 + index / 2,
              opacity: { duration: isContactInView ? 0.4 : 1 },
              scale: { duration: isContactInView ? 0.6 : 1 }
            }}
          >
            <img src={media.icon} alt={media.name}></img>
          </motion.a>
        ))}
      </div>
      <motion.span
        initial={orientation === "vertical" ? { height: 0 } : { width: 0 }}
        animate={{
          height: orientation === "vertical"
            ? (isContactInView ? 0 : "20em")
            : (isContactInView ? 0 : "1px"),
          width: orientation === "horizontal"
            ? (isContactInView ? 0 : "20em")
            : (isContactInView ? 0 : "1px"),
          opacity: isContactInView ? 0 : 1
        }}
        transition={{
          duration: isContactInView ? 0.6 : 0.3,
          delay: 0,
          ease: "easeOut"
        }}
      ></motion.span>
    </motion.div>
  );
}

export default Social;
