import './style.scss'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Linkedin from "../../assets/icons/linkedin.svg"
import Instagram from "../../assets/icons/instagram.svg"
import Github from "../../assets/icons/github.svg"
import PhoneIcon from "../../assets/icons/phone.svg"
import EmailIcon from "../../assets/icons/email.svg"
import LocationIcon from "../../assets/icons/location.svg"
import CopyIcon from "../../assets/icons/copy.svg"
import useIsMobile from '../../utils/useIsMobile'

const socialMedias = [
  {
    name: "Linkedin",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/vhrita/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://www.instagram.com/vhrita.dev/",
  },
  {
    name: "Github",
    icon: Github,
    link: "https://github.com/vhrita",
  },
]

function Contact({ isContactInView = false }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const [shouldShowForm, setShouldShowForm] = useState(false)
  const [iconVisibility, setIconVisibility] = useState([true, true, true])
  const [copyFeedback, setCopyFeedback] = useState({ phone: false, email: false })
  const [formStatus, setFormStatus] = useState({ submitting: false, success: false, error: null })
  const isMobile = useIsMobile(1024)

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopyFeedback(prev => ({ ...prev, [type]: true }))
      setTimeout(() => {
        setCopyFeedback(prev => ({ ...prev, [type]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ submitting: true, success: false, error: null })

    const formData = new FormData(e.target)

    try {
      const response = await fetch('https://formspree.io/f/mqayappb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setFormStatus({ submitting: false, success: true, error: null })
        e.target.reset()
        setTimeout(() => {
          setFormStatus({ submitting: false, success: false, error: null })
        }, 5000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: t("formErrorMessage")
      })
      setTimeout(() => {
        setFormStatus({ submitting: false, success: false, error: null })
      }, 5000)
    }
  }

  // Form visibility based on scroll position
  useEffect(() => {
    const handleFormScroll = () => {
      const contactElement = document.getElementById('contact')
      if (!contactElement || !isContactInView) return

      const contactRect = contactElement.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const contactTop = contactRect.top
      const contactVisible = contactTop < windowHeight * 0.7

      setShouldShowForm(contactVisible)
    }

    window.addEventListener('scroll', handleFormScroll)
    handleFormScroll()

    return () => window.removeEventListener('scroll', handleFormScroll)
  }, [isContactInView])

  // Set initial form state when contact comes into view
  useEffect(() => {
    if (isContactInView) {
      const contactElement = document.getElementById('contact')
      if (contactElement) {
        const contactRect = contactElement.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const contactTop = contactRect.top
        const contactVisible = contactTop < windowHeight * 0.7
        setShouldShowForm(contactVisible)
      }
    } else {
      setShouldShowForm(false)
    }
  }, [isContactInView])

  // Fleeing animation for contact social icons
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY
      const contactElement = document.getElementById('contact')

      if (!contactElement || !isContactInView) return

      const socialIcons = contactElement.querySelectorAll('.absorbed-icon')
      const newVisibility = [...iconVisibility]

      socialIcons.forEach((icon, index) => {
        const iconRect = icon.getBoundingClientRect()
        const iconBottom = iconRect.bottom
        const distanceToBottom = windowHeight - iconBottom

        const fleeThreshold = 150

        if (distanceToBottom < fleeThreshold && scrollY > 0) {
          newVisibility[index] = false
        } else if (distanceToBottom > fleeThreshold * 1.5) {
          newVisibility[index] = true
        }
      })

      if (JSON.stringify(newVisibility) !== JSON.stringify(iconVisibility)) {
        setIconVisibility(newVisibility)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [iconVisibility, isContactInView])

  return (
    <section
      id='contact'
      ref={ref}
      style={{ backgroundColor: "#2BCAB6" }}
      aria-label={t('accessibility.contactForm')}
    >
      <div className="contact-container">
        <motion.div
          className="social-icons-absorbed"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isContactInView ? 1 : 0,
            scale: isContactInView ? 1 : 0
          }}
          transition={{ delay: 0.8, duration: 1, stagger: 0.2 }}
        >
          {socialMedias.map((media, index) => (
            <motion.div
              key={media.name}
              className="absorbed-icon"
              initial={{
                x: index === 0 ? -200 : index === 1 ? -150 : -100,
                y: -100,
                scale: 0.5,
                opacity: 0
              }}
              animate={{
                x: isContactInView ? 0 : (index === 0 ? -200 : index === 1 ? -150 : -100),
                y: isContactInView ? (iconVisibility[index] ? [0, -8, 0] : -50) : -100,
                scale: isContactInView ? (iconVisibility[index] ? 2 : 0.3) : 0.5,
                opacity: isContactInView ? (iconVisibility[index] ? 0.8 : 0) : 0
              }}
              transition={{
                delay: isContactInView
                  ? 1.0 + (index * 0.1)
                  : 0.3 + (index * 0.05),
                duration: iconVisibility[index] ? (isContactInView ? 0.3 : 0.1) : 0.4,
                ease: "easeIn",
                y: iconVisibility[index] && isContactInView ? {
                  duration: 2 + (index * 0.3),
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                } : {}
              }}
            >
              <a href={media.link} target="_blank" rel="noopener noreferrer">
                <img src={media.icon} alt={`${media.name} ${t('accessibility.socialMediaProfile')}`} />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: shouldShowForm ? 1 : 0,
            y: shouldShowForm ? 0 : -30
          }}
          transition={{
            delay: shouldShowForm ? 0.6 : 0,
            duration: shouldShowForm ? 0.6 : 0.4,
            ease: shouldShowForm ? "easeOut" : "easeIn"
          }}
        >
          <div className="contact-header">
            <h1>{t("contactTitle")}</h1>
            <p>{t("contactSubtitle")}</p>
          </div>

          <div className={`contact-layout ${isMobile ? 'mobile' : 'desktop'}`}>
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
              animate={{
                opacity: shouldShowForm ? 1 : 0,
                x: shouldShowForm ? 0 : (isMobile ? 0 : -30)
              }}
              transition={{ delay: shouldShowForm ? 0.8 : 0, duration: 0.6 }}
            >
              <h3>{t("contactInfoTitle")}</h3>

              <div className="contact-item">
                <img src={PhoneIcon} alt={t('accessibility.phoneContactIcon')} />
                <div className="item-content">
                  <span className="label">{t("phoneLabel")}</span>
                  <a href="tel:+5511989186251" className="value">{t("phoneNumber")}</a>
                </div>
                <motion.button
                  className={`copy-button ${copyFeedback.phone ? 'copied' : ''}`}
                  onClick={() => copyToClipboard('+5511989186251', 'phone')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Copy phone number"
                >
                  <img src={CopyIcon} alt={t('accessibility.copyPhoneClipboard')} />
                </motion.button>
              </div>

              <div className="contact-item">
                <img src={EmailIcon} alt={t('accessibility.emailContactIcon')} />
                <div className="item-content">
                  <span className="label">{t("emailLabel")}</span>
                  <a href="mailto:vhrita.dev@gmail.com" className="value">{t("emailAddress")}</a>
                </div>
                <motion.button
                  className={`copy-button ${copyFeedback.email ? 'copied' : ''}`}
                  onClick={() => copyToClipboard('vhrita.dev@gmail.com', 'email')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Copy email address"
                >
                  <img src={CopyIcon} alt={t('accessibility.copyEmailClipboard')} />
                </motion.button>
              </div>

              <div className="contact-item">
                <img src={LocationIcon} alt={t('accessibility.locationIcon')} />
                <div className="item-content">
                  <span className="label">{t("locationLabel")}</span>
                  <span className="value">{t("location")}</span>
                </div>
              </div>
            </motion.div>

            <motion.form
              className="contact-form"
              onSubmit={handleFormSubmit}
              initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
              animate={{
                opacity: shouldShowForm ? 1 : 0,
                x: shouldShowForm ? 0 : (isMobile ? 0 : 30)
              }}
              transition={{ delay: shouldShowForm ? 1.0 : 0, duration: 0.6 }}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder={t("nameField")}
                  aria-label={t("nameField")}
                  required
                  disabled={formStatus.submitting}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder={t("emailField")}
                  aria-label={t("emailField")}
                  required
                  disabled={formStatus.submitting}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder={t("messageField")}
                  aria-label={t("messageField")}
                  rows="5"
                  required
                  disabled={formStatus.submitting}
                ></textarea>
              </div>

              {formStatus.success && (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ✅ {t("formSuccessMessage")}
                </motion.div>
              )}

              {formStatus.error && (
                <motion.div
                  className="form-error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ❌ {formStatus.error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={formStatus.submitting}
                whileHover={!formStatus.submitting ? { scale: 1.05 } : {}}
                whileTap={!formStatus.submitting ? { scale: 0.95 } : {}}
                className={formStatus.submitting ? 'submitting' : ''}
              >
                {formStatus.submitting ? t("sendingButton") : t("sendButton")}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact;
