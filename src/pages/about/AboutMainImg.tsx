import React, { useState } from 'react';
import MessageBoard from '../MessageBoard';
import CTAButton from '../../components/common/CTAButton';
import { getAssetPath } from '../../utils/path';
import './AboutMainImg.css';

const HERO_BG = '/images/hero/about_back.png';

const HERO_TITLE = '关于VERT';
const HERO_DESC =
  'VERT.AI 为全球中大型企业、机构及数据密集型组织，提供异构数据整合、分析及建模、大模型部署，专注企业级 AI「数字员工」研发与落地。';

const AboutMainImg: React.FC = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <section
      className="about-main-img"
      style={{ backgroundImage: `url(${getAssetPath(HERO_BG)})` }}
    >
      <div className="about-main-img__overlay" />
      <div className="about-main-img__content">
        <h1 className="about-main-img__title">{HERO_TITLE}</h1>
        <p className="about-main-img__desc">{HERO_DESC}</p>
        <CTAButton className="about-main-img__cta" onClick={() => setIsMessageOpen(true)}>
          立即开始
        </CTAButton>
      </div>
      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default AboutMainImg;
