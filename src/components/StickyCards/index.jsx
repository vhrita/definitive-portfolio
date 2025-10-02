import './style.scss'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
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

  const adjustMobileOverlap = () => {
    if (!isMobile || !container.current) return

    const stickyCards = container.current.querySelectorAll('.sticky-card')

    stickyCards.forEach((card) => {
      const cardImg = card.querySelector('.sticky-card-img')
      const cardContent = card.querySelector('.sticky-card-content')
      const mainContainer = card.querySelector('.sticky-card-main-container')

      if (!cardImg || !cardContent || !mainContainer) return

      const imgHeight = cardImg.offsetHeight
      const contentHeight = cardContent.scrollHeight
      const mainContainerHeight = mainContainer.offsetHeight

      const contentStyles = window.getComputedStyle(cardContent)
      const contentPadding = parseFloat(contentStyles.paddingTop) + parseFloat(contentStyles.paddingBottom)

      const minOverlap = imgHeight * 0.3
      const maxOverlap = imgHeight * 0.6

      const availableSpaceWithMinOverlap = mainContainerHeight - imgHeight + minOverlap

      let requiredOverlap = minOverlap

      if (contentHeight > availableSpaceWithMinOverlap) {
        const additionalOverlapNeeded = contentHeight - availableSpaceWithMinOverlap
        requiredOverlap = Math.min(maxOverlap, minOverlap + additionalOverlapNeeded)
      }

      if (contentHeight > mainContainerHeight - imgHeight + requiredOverlap) {
        requiredOverlap = maxOverlap
      }

      cardContent.style.setProperty('--dynamic-overlap', `${requiredOverlap}px`)
      cardContent.style.marginTop = `-${requiredOverlap}px`

      const maxContentHeight = mainContainerHeight - imgHeight + requiredOverlap
      const copyDescription = cardContent.querySelector('.sticky-card-copy-description p')

      if (contentHeight > maxContentHeight) {
        cardContent.style.maxHeight = `${maxContentHeight}px`

        if (copyDescription) {
          copyDescription.style.display = '-webkit-box'
          copyDescription.style.webkitBoxOrient = 'vertical'
          copyDescription.style.overflow = 'hidden'
          copyDescription.style.textOverflow = 'ellipsis'

          const lineHeight = parseFloat(window.getComputedStyle(copyDescription).lineHeight)
          const availableHeight = maxContentHeight - contentPadding
          const maxLines = Math.floor(availableHeight / lineHeight) - 8
          copyDescription.style.webkitLineClamp = Math.max(3, maxLines).toString()
        }
      } else {
        cardContent.style.maxHeight = 'none'

        if (copyDescription) {
          copyDescription.style.display = 'block'
          copyDescription.style.webkitBoxOrient = 'initial'
          copyDescription.style.overflow = 'visible'
          copyDescription.style.textOverflow = 'clip'
          copyDescription.style.webkitLineClamp = 'none'
        }
      }
    })
  }

  useGSAP(
    () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      const stickyCards = container.current.querySelectorAll('.sticky-card')

      stickyCards.forEach((card, index) => {
        const cardImg = card.querySelector('.sticky-card-img')
        const cardContent = card.querySelector('.sticky-card-content')

        if (isMobile) {
          gsap.set(cardImg, {
            x: index === 0 ? '0%' : '-100%',
            opacity: index === 0 ? 1 : 0
          })
          gsap.set(cardContent, {
            x: index === 0 ? '0%' : '100%',
            opacity: index === 0 ? 1 : 0
          })

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

          if (index < stickyCards.length - 1) {
            ScrollTrigger.create({
              trigger: stickyCards[index + 1],
              start: 'top 90%',
              end: 'top top',
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress
                const scale = 1 - progress * 0.15
                const rotation = (index % 2 === 0 ? 2 : -2) * progress
                const afterOpacity = progress * 0.4

                gsap.set(card, {
                  scale: scale,
                  rotation: rotation,
                  '--after-opacity': afterOpacity,
                })
              },
            })
          }
        } else {
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

      if (isMobile) {
        ScrollTrigger.config({
          autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
          limitCallbacks: true
        })

        setTimeout(() => {
          adjustMobileOverlap()
          ScrollTrigger.refresh()
        }, 100)
      } else {
        ScrollTrigger.refresh()
      }
    },
    { scope: container, dependencies: [isMobile] }
  )

  useEffect(() => {
    if (!isMobile) return

    const handleResize = () => {
      adjustMobileOverlap()
    }

    window.addEventListener('resize', handleResize)

    const timer = setTimeout(() => {
      adjustMobileOverlap()
    }, 300)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, loadingStates])

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
                          loading="lazy"
                          decoding="async"
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
