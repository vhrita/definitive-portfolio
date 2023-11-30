import "./style.scss";

import { motion } from 'framer-motion';

import Linkedin from "../../assets/icons/linkedin.svg";
import Instagram from "../../assets/icons/instagram.svg";
import Github from "../../assets/icons/github.svg";

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
];

function Social({ orientation = 'vertical' }) {
  return (
    <div id="social" className={orientation}>
      <div key={orientation}>
        {socialMedias.map((media, index) => (
          <motion.a
            key={media.name}
            href={media.link}
            target="_blank"
            initial={{ opacity: 0, rotate: "-320deg" }}
            animate={{ opacity: 1, rotate: "-360deg" }}
            transition={{
              duration: 1,
              delay:
                orientation === "vertical"
                  ? (socialMedias.length - index) / 2
                  : index / 2,
            }}
          >
            <img src={media.icon} alt={media.name}></img>
          </motion.a>
        ))}
      </div>
      <motion.span
        initial={orientation === "vertical" ? { height: 0 } : { width: 0 }}
        animate={orientation === "vertical" ? { height: "20em", width: "1px" } : { width: "20em", height: "1px" }}
        transition={{ duration: 1 }}
      ></motion.span>
    </div>
  );
}

export default Social;
