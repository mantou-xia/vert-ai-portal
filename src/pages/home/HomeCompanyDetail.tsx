import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import HomeBrand from './HomeBrand';
import './HomeCompanyDetail.css';

const DEFAULT_POSTER = getAssetPath('/images/home/keyboard.png');

type CaseItem = {
  id: string;
  videoPoster: string;
  videoSrc?: string;
  companyName: string;
  companyNameEn: string;
  quote: string;
  stats: { label: string; value: string }[];
  brandKey: string;
};

const HomeCompanyDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const isEnglish = i18n.language === 'en-US';

  const caseItems = useMemo<CaseItem[]>(
    () => [
      {
        id: 'jinying',
        videoPoster: '/images/home/case-jinying-poster.jpg',
        videoSrc: '/videos/case-jinying.mp4',
        companyName: isEnglish ? 'Golden Eagle Group' : '金鹰集团',
        companyNameEn: 'Golden Eagle',
        quote: isEnglish
          ? '"In the early stage of the AI revolution, models and ecosystems evolve rapidly. We need tools that help us validate ideas quickly, and that is exactly the value for teams fully embracing AI."'
          : '"我们处在AI革命的早期，其特点是模型和生态快速演进，因此我们更加需要可以快速验证想法的工具，这就是全面拥抱AI的关键价值。"',
        stats: [
          { label: t('home.companyDetail.stat1'), value: '80%' },
          { label: t('home.companyDetail.stat2'), value: '95%' },
          { label: t('home.companyDetail.stat3'), value: '90%' },
        ],
        brandKey: 'jinying',
      },
      {
        id: 'toa',
        videoPoster: DEFAULT_POSTER,
        companyName: isEnglish ? 'TOA Yingteng' : 'TOA 英腾',
        companyNameEn: 'TOA',
        quote: isEnglish
          ? '"The VERT platform helped us build an intelligent customer service system rapidly, significantly improving satisfaction and operational efficiency."'
          : '"VERT 平台帮助我们快速构建智能客服，显著提升了客户满意度与运营效率。"',
        stats: [
          { label: t('home.companyDetail.statResponse'), value: '75%' },
          { label: t('home.companyDetail.statSatisfaction'), value: '92%' },
          { label: t('home.companyDetail.statCostSave'), value: '40%' },
        ],
        brandKey: 'toa',
      },
      {
        id: 'skieer',
        videoPoster: DEFAULT_POSTER,
        companyName: isEnglish ? 'SKIEER DataRead' : 'SKIEER 数阅',
        companyNameEn: 'SKIEER',
        quote: isEnglish
          ? '"From data collection to intelligent analysis, VERT provides end-to-end AI capabilities and powers our intelligent upgrade."'
          : '"从数据采集到智能分析，VERT 提供了端到端的 AI 解决方案，助力我们实现智能化升级。"',
        stats: [
          { label: t('home.companyDetail.statQaAccuracy'), value: '98%' },
          { label: t('home.companyDetail.statCapacity'), value: '35%' },
          { label: t('home.companyDetail.statForecast'), value: '85%' },
        ],
        brandKey: 'skieber',
      },
      {
        id: 'aeon',
        videoPoster: DEFAULT_POSTER,
        companyName: 'AEON',
        companyNameEn: 'AEON',
        quote: isEnglish
          ? '"VERT\'s AI platform enabled a comprehensive digital transformation of our retail business."'
          : '"VERT 的 AI 平台让我们的零售业务实现了全面数字化转型。"',
        stats: [
          { label: t('home.companyDetail.statConversion'), value: '60%' },
          { label: t('home.companyDetail.statInventory'), value: '45%' },
          { label: t('home.companyDetail.statRetention'), value: '88%' },
        ],
        brandKey: 'aeon',
      },
      {
        id: '7eleven',
        videoPoster: DEFAULT_POSTER,
        companyName: '7-ELEVEN',
        companyNameEn: '7-ELEVEN',
        quote: isEnglish
          ? '"With VERT, we successfully applied AI across every key step of store operations."'
          : '"通过 VERT，我们成功将 AI 应用于门店运营的各个环节。"',
        stats: [
          { label: t('home.companyDetail.statOperation'), value: '70%' },
          { label: t('home.companyDetail.statLoss'), value: '55%' },
          { label: t('home.companyDetail.statReplenish'), value: '93%' },
        ],
        brandKey: '7eleven',
      },
      {
        id: 'gmart',
        videoPoster: DEFAULT_POSTER,
        companyName: isEnglish ? 'Gmart Golden Eagle' : 'Gmart 金鹰',
        companyNameEn: 'Gmart',
        quote: isEnglish
          ? '"VERT helped us leap from traditional retail to intelligent retail."'
          : '"VERT 帮助我们实现了从传统零售到智能零售的跨越。"',
        stats: [
          { label: t('home.companyDetail.statSalesGrowth'), value: '50%' },
          { label: t('home.companyDetail.statAcquisition'), value: '-30%' },
          { label: t('home.companyDetail.statRepurchase'), value: '82%' },
        ],
        brandKey: 'gmart',
      },
    ],
    [isEnglish, t]
  );

  const activeItem = caseItems[activeIndex] ?? caseItems[0];

  return (
    <section className="home-company-detail">
      <div className="home-company-detail__inner">
        <header className="home-company-detail__header">
          <h2 className="home-company-detail__title">{t('home.companyDetail.title')}</h2>
        </header>

        <div className="home-company-detail__card">
          <div className="home-company-detail__content">
            <div className="home-company-detail__video">
              <div className="home-company-detail__video-frame">
                <video
                  key={activeItem.id}
                  className="home-company-detail__video-el"
                  src={activeItem.videoSrc}
                  poster={activeItem.videoPoster}
                  controls
                >
                  {t('home.companyDetail.videoUnsupported')}
                </video>
                <div className="home-company-detail__video-play">
                  <span className="home-company-detail__video-play-icon">▶</span>
                </div>
              </div>
            </div>

            <div className="home-company-detail__info">
              <div className="home-company-detail__company">
                <h3 className="home-company-detail__company-name">{activeItem.companyName}</h3>
                <span className="home-company-detail__company-en">{activeItem.companyNameEn}</span>
              </div>

              <blockquote className="home-company-detail__quote">{activeItem.quote}</blockquote>

              <hr className="home-company-detail__divider" />

              <div className="home-company-detail__stats">
                {activeItem.stats.map((stat) => (
                  <div key={`${activeItem.id}-${stat.label}`} className="home-company-detail__stat">
                    <span className="home-company-detail__stat-label">{stat.label}</span>
                    <span className="home-company-detail__stat-value">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="home-company-detail__dots" role="group" aria-label={t('home.companyDetail.switchGroupAria')}>
            {caseItems.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`home-company-detail__dot${index === activeIndex ? ' home-company-detail__dot--active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={t('home.companyDetail.switchToCase', { index: index + 1 })}
              />
            ))}
          </div>
        </div>

        <HomeBrand
          activeIndex={activeIndex}
          onBrandClick={(index) => setActiveIndex(index)}
          total={caseItems.length}
        />
      </div>
    </section>
  );
};

export default HomeCompanyDetail;
