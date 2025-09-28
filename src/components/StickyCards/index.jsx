import './style.scss'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import useIsMobile from '../../utils/useIsMobile'
import { useTranslation } from 'react-i18next'

import OpenExternal from '../../assets/icons/open_external.svg'
import GithubIcon from '../../assets/icons/github.svg'

gsap.registerPlugin(ScrollTrigger)

const ActionButton = ({ href, icon, label }) => {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="sticky-card-action-btn"
    >
      <img src={icon} alt={label} />
      <span>{label}</span>
    </a>
  )
}

function StickyCards({ cards = [] }) {
  const container = useRef(null)
  const isMobile = useIsMobile(1024)
  const { t } = useTranslation()
  const [loadingStates, setLoadingStates] = useState({})

  const handleImageLoad = (index) => {
    setLoadingStates(prev => ({ ...prev, [index]: false }))
  }

  const handleImageError = (index) => {
    setLoadingStates(prev => ({ ...prev, [index]: 'error' }))
  }

  useGSAP(
    () => {
      // Clear all previous ScrollTriggers to avoid conflicts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      const stickyCards = container.current.querySelectorAll('.sticky-card')

      stickyCards.forEach((card, index) => {
        const cardImg = card.querySelector('.sticky-card-img')
        const cardContent = card.querySelector('.sticky-card-content')

        if (isMobile) {
          // Mobile-specific implementation optimized for touch

          // Set initial positions for mobile - volta para transform X
          gsap.set(cardImg, {
            x: index === 0 ? '0%' : '-100%',
            opacity: index === 0 ? 1 : 0
          })
          gsap.set(cardContent, {
            x: index === 0 ? '0%' : '100%',
            opacity: index === 0 ? 1 : 0
          })

          // Simple pin for mobile
          if (index < stickyCards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top top',
              end: () => `+=${window.innerHeight}`,
              pin: true,
              pinSpacing: false,
              anticipatePin: 1,
            })
          }

          // Mobile: Slide-in animations baseadas no scroll (igual desktop)
          ScrollTrigger.create({
            trigger: card,
            start: 'top bottom',
            end: 'top 20%',
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress

              const imgX = -100 + (progress * 100)
              const imgOpacity = Math.min(progress * 1.5, 1)
              gsap.set(cardImg, {
                x: `${imgX}%`,
                opacity: imgOpacity
              })

              const contentX = 100 - (progress * 100)
              const contentOpacity = Math.min(progress * 1.5, 1)
              gsap.set(cardContent, {
                x: `${contentX}%`,
                opacity: contentOpacity
              })
            },
          })

          // Scale out animation when next card approaches - após animação de entrada
          if (index < stickyCards.length - 1) {
            ScrollTrigger.create({
              trigger: stickyCards[index + 1],
              start: 'top 90%', // Começa quando o próximo card está bem próximo
              end: 'top top',
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress
                const scale = 1 - progress * 0.15 // Menos scale para mobile
                const rotation = (index % 2 === 0 ? 2 : -2) * progress // Menos rotação
                const afterOpacity = progress * 0.4 // Menos opacidade do overlay

                gsap.set(card, {
                  scale: scale,
                  rotation: rotation,
                  '--after-opacity': afterOpacity,
                })
              },
            })
          }
        } else {
          // Desktop animations - keep the original complex animations

          // Pin cards
          if (index < stickyCards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top top',
              end: () => stickyCards[index + 1] ? `+=${stickyCards[index + 1].offsetHeight}` : '+=100vh',
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
              fastScrollEnd: true,
              anticipatePin: 1,
            })
          }

          // Slide-in animations
          ScrollTrigger.create({
            trigger: card,
            start: 'top bottom',
            end: 'top top',
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress

              const imgX = -100 + (progress * 100)
              const imgOpacity = Math.min(progress * 1.5, 1)
              gsap.set(cardImg, {
                x: `${imgX}%`,
                opacity: imgOpacity
              })

              const contentX = 100 - (progress * 100)
              const contentOpacity = Math.min(progress * 1.5, 1)
              gsap.set(cardContent, {
                x: `${contentX}%`,
                opacity: contentOpacity
              })
            },
          })

          // Scale-out animations
          if (index < stickyCards.length - 1) {
            ScrollTrigger.create({
              trigger: stickyCards[index + 1],
              start: 'top bottom',
              end: 'top top',
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress
                const scale = 1 - progress * 0.25
                const rotation = (index % 2 === 0 ? 3 : -3) * progress
                const afterOpacity = progress * 0.6

                gsap.set(card, {
                  scale: scale,
                  rotation: rotation,
                  '--after-opacity': afterOpacity,
                })
              },
            })
          }
        }
      })

      // Configure ScrollTrigger for mobile touch
      if (isMobile) {
        ScrollTrigger.config({
          autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
          limitCallbacks: true
        })

        // Force refresh after a short delay to ensure mobile setup
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      } else {
        ScrollTrigger.refresh()
      }
    },
    { scope: container, dependencies: [isMobile] }
  )

  return (
    <div className="sticky-cards" ref={container}>
      {cards.map((card, index) => {
        const primaryImage = Array.isArray(card.images) && card.images.length > 0
          ? card.images[0]
          : card.images
        const primaryImagePosition = Array.isArray(card.imagePositions) && card.imagePositions.length > 0
          ? card.imagePositions[0]
          : 'center top'

        return (
          <div className="sticky-card" key={index}>
            <div className="sticky-card-index">
              <h1>{String(index + 1).padStart(2, '0')}</h1>
            </div>

            <div className="sticky-card-main-container">
              <div className="sticky-card-img">
                {primaryImage && (
                  <>
                    {loadingStates[index] === 'error' ? (
                      <div className="sticky-card-img-error">
                        <span>⚠️</span>
                        <p>Failed to load image</p>
                      </div>
                    ) : (
                      <>
                        {loadingStates[index] !== false && (
                          <div className="sticky-card-img-loading">
                            <div className="loading-spinner"></div>
                          </div>
                        )}
                        <img
                          src={primaryImage}
                          alt={`${card.title} project screenshot showing the application interface`}
                          style={{
                            objectPosition: primaryImagePosition || 'center top',
                            opacity: loadingStates[index] === false ? 1 : 0
                          }}
                          onLoad={() => handleImageLoad(index)}
                          onError={() => handleImageError(index)}
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="sticky-card-content">
                <div className="sticky-card-content-wrapper">
                  <h1 className="sticky-card-header">{card.title}</h1>

                  <div className="sticky-card-copy">
                    <div className="sticky-card-copy-title">
                      <p>(Project Details)</p>
                    </div>
                    <div className="sticky-card-copy-description">
                      <p>{card.description}</p>
                    </div>
                  </div>

                  <div className="sticky-card-actions" role="group" aria-label={t('accessibility.projectActions')}>
                    <ActionButton
                      href={card.link}
                      icon={OpenExternal}
                      label={t('viewProject')}
                    />
                    <ActionButton
                      href={card.repository}
                      icon={GithubIcon}
                      label={t('viewCode')}
                    />
                  </div>

                  <div className="sticky-card-techs" role="list" aria-label={t('accessibility.technologiesUsed')}>
                    {card.techs.map((tech, i) => (
                      <span key={i} className="tech-chip" role="listitem">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StickyCards
