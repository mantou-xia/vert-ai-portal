import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MessageBoard from '../MessageBoard';
import CTAButton from '../../components/common/CTAButton';
import { getAssetPath } from '../../utils/path';
import './AboutMainImg.css';

const HERO_BG = '/images/hero/about_back.png';

const AboutMainImg: React.FC = () => {
  const { t } = useTranslation();
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <section
      className="about-main-img"
      style={{ backgroundImage: `url(${getAssetPath(HERO_BG)})` }}
    >
      <div className="about-main-img__overlay" />
      <div className="about-main-img__content">
        <h1 className="about-main-img__title">{t('about.main.title')}</h1>
        <p className="about-main-img__desc">{t('about.main.desc')}</p>
        <CTAButton className="about-main-img__cta" onClick={() => setIsMessageOpen(true)}>
          {t('about.main.cta')}
        </CTAButton>
      </div>
      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default AboutMainImg;
