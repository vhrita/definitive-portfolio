import './style.scss'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DownloadIcon from '../../assets/icons/download.svg'

function ResumeDownloader({ isPortfolio = false, isContact = false }) {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = () => {
    // Criar um link temporário para download
    const link = document.createElement('a')
    link.href = '/resume.pdf' // Arquivo deve estar na pasta public
    link.download = 'Vitor_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resumeText = t('resume') // "Currículo" em PT, "Resume" em EN

  return (
    <motion.div
      className={`resume-downloader ${isPortfolio || isContact ? 'downloader-portfolio-mode' : ''}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: isHovered ? 1 : [1, 1.07, 1], // Pulse pausado no hover
        paddingLeft: isHovered ? "4rem" : "3rem",
        paddingRight: isHovered ? "4rem" : "3rem",
      }}
      transition={{
        opacity: { duration: 0.3 },
        scale: isHovered ? { duration: 0.1 } : {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        },
        paddingLeft: { duration: 0.3, ease: "easeOut" },
        paddingRight: { duration: 0.3, ease: "easeOut" }
      }}
      onClick={handleDownload}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <span>
        {resumeText} <motion.img
          src={DownloadIcon}
          alt="Download Resume"
          animate={{
            y: isHovered ? [4, 10, 4] : [8, 4, 6, 8], // Base 2px (25% do elemento) + animação
          }}
          transition={{
            y: isHovered ? {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            } : {
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }
          }}
        />
      </span>
    </motion.div>
  )
}

export default ResumeDownloader