import './style.scss';

import { useState } from "react";
import { motion } from 'framer-motion';

import arrow from "../../assets/icons/arrow_down.svg";


function CardSlider({ cards = [], width = '100%', height = '80%' }) {
    const [position, setPosition] = useState(0);

    return (
      <motion.div
        id="slider"
        style={{ width, height }}
        initial={{ position: "absolute", x: "+100%" }}
        whileInView={{ x: 0, position: "relative" }}
        transition={{ duration: 1 }}
        viewport={{ amount: 0.1, once: true }}
      >
        <span className="counter">
          {position + 1} / {cards.length}
        </span>
        <button
          className="btn-previous"
          onClick={() =>
            setPosition(position === 0 ? cards.length - 1 : position - 1)
          }
        >
          <img src={arrow} />
        </button>
        {cards.map((card, index) => {
          return (
            <motion.div
              key={card.title}
              className="card"
              initial={{
                scale: 1,
                rotation: -180,
                opacity: index !== 0 ? 0 : 0.5,
              }}
              animate={{
                left: `${(index - position) * 95}%`,
                opacity: 1,
                rotate: 0,
                scale: index === position ? 1 : 0.8,
              }}
            >
              <img src={card.images[0]} />
              {index === position && (
                <div className="card__content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <div className="card__content__chips">
                    {card.techs.map((tech, index) => {
                      return (
                        <motion.span
                          key={tech}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: index != 0 && index - 0.5,
                          }}
                        >
                          {tech}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
        <button
          className="btn-next"
          onClick={() =>
            setPosition(position >= cards.length - 1 ? 0 : position + 1)
          }
        >
          <img src={arrow} />
        </button>
      </motion.div>
    );
}

export default CardSlider