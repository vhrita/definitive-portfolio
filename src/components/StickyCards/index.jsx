import './style.scss'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import OpenExternal from '../../assets/icons/open_external.svg'

gsap.registerPlugin(ScrollTrigger)

function StickyCards({ cards = [] }) {
  const container = useRef(null)

  useGSAP(
    () => {
      const stickyCards = document.querySelectorAll('.sticky-card')

      stickyCards.forEach((card, index) => {
        const cardImg = card.querySelector('.sticky-card-img')
        const cardContent = card.querySelector('.sticky-card-content')

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
      })
    },
    { scope: container }
  )

  return (
    <div className="sticky-cards" ref={container}>
      {cards.map((card, index) => (
        <div className="sticky-card" key={index}>
          <div className="sticky-card-index">
            <h1>{String(index + 1).padStart(2, '0')}</h1>
          </div>

          <div className="sticky-card-main-container">
            <div className="sticky-card-img">
              <img src={card.images[0]} alt={card.title} />
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

                <div className="sticky-card-actions">
                  {card.link && (
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <img src={OpenExternal} alt="Visit project" />
                      <span>View Project</span>
                    </a>
                  )}
                </div>

                <div className="sticky-card-techs">
                  {card.techs.map((tech, i) => (
                    <span key={i} className="tech-chip">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StickyCards