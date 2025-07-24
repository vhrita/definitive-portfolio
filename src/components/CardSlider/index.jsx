import './style.scss';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

import OpenExternal from '../../assets/icons/open_external.svg';

gsap.registerPlugin(CustomEase);
CustomEase.create("cubic", "0.83, 0, 0.17, 1");

function CardSlider({ cards = [] }) {
  const sliderRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Split text into spans for animation
  const splitTextIntoSpans = (element) => {
    const text = element.innerText;
    const splitText = text.split("").map(char =>
      `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`
    ).join("");
    element.innerHTML = splitText;
  };

  // Position cards in 3D stack
  const initializeCards = () => {
    const cardsDOM = sliderRef.current.querySelectorAll(".card");
    gsap.to(cardsDOM, {
      y: (i) => -15 + 15 * i + "%",
      z: (i) => 15 * i,
      opacity: 1,
      duration: 1,
      ease: "cubic",
      stagger: -0.1,
    });
  };

  useEffect(() => {
    initializeCards(); 

    const h1s = sliderRef.current.querySelectorAll(".copy h1");
    h1s.forEach(h1 => splitTextIntoSpans(h1));

    gsap.set("h1 span", { y: -200 });
    gsap.set(sliderRef.current.querySelectorAll(".card:last-child h1 span"), { y: 0 });

    // Click handler for card slider
    const handleClick = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const cards = Array.from(sliderRef.current.querySelectorAll(".card"));
      const lastCard = cards.pop();
      const nextCard = cards[cards.length - 1];

      // Animate out last card's text
      gsap.to(lastCard.querySelectorAll("h1 span"), {
        y: 200,
        duration: 0.75,
        ease: "cubic",
      });

      // Animate out last card
      gsap.to(lastCard, {
        y: "+=150%",
        duration: 0.75,
        ease: "cubic",
        onComplete: () => {
          sliderRef.current.prepend(lastCard);
          initializeCards();
          gsap.set(lastCard.querySelectorAll("h1 span"), { y: -200 });
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 1000);
        }
      });

      // Animate in next card's text
      gsap.to(nextCard.querySelectorAll("h1 span"), {
        y: 0,
        duration: 1,
        ease: "cubic",
        stagger: 0.05,
      });
    };

    const sliderEl = sliderRef.current;
    sliderEl.addEventListener("click", handleClick);
    return () => {
      sliderEl.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="container">
      <div className="slider" ref={sliderRef}>
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.images[0]} alt={card.title} />
            <div className="copy">
              <div className="chips">
                {card.techs.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
                <a className="link" href={card.link} target='_blank'>
                  <img src={OpenExternal} alt="Link to project" />
                </a>
              </div>
              <div className="text-content">
                <h1>{card.title}</h1>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardSlider;