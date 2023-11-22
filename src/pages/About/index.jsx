import './style.scss'

import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <div id="about">
      <h2>{t('aboutTitle')}</h2>
        <p>{t('aboutText')}</p>
    </div>
  );
}

export default About