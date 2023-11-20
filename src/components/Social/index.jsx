import "./style.scss";

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

function Social() {
  return (
    <div id="social">
      <div>
        {socialMedias.map((media) => (
          <a key={media.name} href={media.link} target="_blank">
            <img src={media.icon} alt={media.name}></img>
          </a>
        ))}
      </div>
      <span></span>
    </div>
  );
}

export default Social;
