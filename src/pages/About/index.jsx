import './style.scss';

import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  const aboutText = t('aboutText', { returnObjects: true });
  const paragraphs = Array.isArray(aboutText) ? aboutText : [aboutText];

  return (
    <section id="about" className="about">
      <div className="about__content">
        <h2>{t('aboutTitle')}</h2>
        <div className="about__copy">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
