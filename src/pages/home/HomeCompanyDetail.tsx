import React, { useState } from 'react';
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

const CASE_ITEMS: CaseItem[] = [
  {
    id: 'jinying',
    videoPoster: '/images/home/case-jinying-poster.jpg',
    videoSrc: '/videos/case-jinying.mp4',
    companyName: '金鹰集团',
    companyNameEn: 'Golden Eagle',
    quote: '"我们处在AI革命的早期，其特点是模型和生态快速演进，因此我们更加需要可以快速验证想法的工具--对于全面拥抱AI的Volvo Cars，这就是价值所在。因此我们更加需要可以快速验证想法的工具--对于全面拥抱AI，这就是价值所在。"',
    stats: [
      { label: '录入提效', value: '80%' },
      { label: '识别率', value: '95%' },
      { label: '问答率', value: '90%' },
    ],
    brandKey: 'jinying',
  },
  {
    id: 'toa',
    videoPoster: DEFAULT_POSTER,
    companyName: 'TOA 英腾',
    companyNameEn: 'ITOA',
    quote: '"VERT 平台帮助我们快速构建智能客服，显著提升了客户满意度与运营效率。"',
    stats: [
      { label: '响应效率', value: '75%' },
      { label: '满意度', value: '92%' },
      { label: '成本节省', value: '40%' },
    ],
    brandKey: 'toa',
  },
  {
    id: 'skieer',
    videoPoster: DEFAULT_POSTER,
    companyName: 'SKIEER 数阅',
    companyNameEn: 'SKIEER',
    quote: '"从数据采集到智能分析，VERT 提供了端到端的 AI 解决方案，助力我们实现智能化升级。"',
    stats: [
      { label: '质检准确率', value: '98%' },
      { label: '产能提升', value: '35%' },
      { label: '故障预测', value: '85%' },
    ],
    brandKey: 'skieber',
  },
  {
    id: 'aeon',
    videoPoster: DEFAULT_POSTER,
    companyName: 'AEON',
    companyNameEn: 'AEON',
    quote: '"VERT 的 AI 平台让我们的零售业务实现了全面数字化转型。"',
    stats: [
      { label: '转化提升', value: '60%' },
      { label: '库存优化', value: '45%' },
      { label: '客户留存', value: '88%' },
    ],
    brandKey: 'aeon',
  },
  {
    id: '7eleven',
    videoPoster: DEFAULT_POSTER,
    companyName: '7-ELEVEN',
    companyNameEn: '7-ELEVEN',
    quote: '"通过 VERT，我们成功将 AI 应用于门店运营的各个环节。"',
    stats: [
      { label: '运营效率', value: '70%' },
      { label: '损耗降低', value: '55%' },
      { label: '补货准确', value: '93%' },
    ],
    brandKey: '7eleven',
  },
  {
    id: 'gmart',
    videoPoster: DEFAULT_POSTER,
    companyName: 'Gmart 金鹰',
    companyNameEn: 'Gmart',
    quote: '"VERT 帮助我们实现了从传统零售到智能零售的跨越。"',
    stats: [
      { label: '销售增长', value: '50%' },
      { label: '获客成本', value: '-30%' },
      { label: '复购率', value: '82%' },
    ],
    brandKey: 'gmart',
  },
];

const HomeCompanyDetail: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = CASE_ITEMS[activeIndex] ?? CASE_ITEMS[0];

  return (
    <section className="home-company-detail">
      <div className="home-company-detail__inner">
        <header className="home-company-detail__header">
          <h2 className="home-company-detail__title">
            他们已经和我们一起实现了业务转型
          </h2>
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
                  您的浏览器不支持视频播放。
                </video>
                <div className="home-company-detail__video-play">
                  <span className="home-company-detail__video-play-icon">▶</span>
                </div>
              </div>
            </div>

            <div className="home-company-detail__info">
              <div className="home-company-detail__company">
                <h3 className="home-company-detail__company-name">
                  {activeItem.companyName}
                </h3>
                <span className="home-company-detail__company-en">
                  {activeItem.companyNameEn}
                </span>
              </div>

              <blockquote className="home-company-detail__quote">
                {activeItem.quote}
              </blockquote>

              <hr className="home-company-detail__divider" />

              <div className="home-company-detail__stats">
                {activeItem.stats.map((stat) => (
                  <div key={stat.label} className="home-company-detail__stat">
                    <span className="home-company-detail__stat-label">
                      {stat.label}
                    </span>
                    <span className="home-company-detail__stat-value">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="home-company-detail__dots" role="group" aria-label="切换公司案例">
            {CASE_ITEMS.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`${
                  index === activeIndex ? 'home-company-detail__dot-active' : 'home-company-detail__dot'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`切换到第 ${index + 1} 个案例`}
              />
            ))}
          </div>
        </div>

        <HomeBrand
          activeIndex={activeIndex}
          onBrandClick={(index) => setActiveIndex(index)}
          total={CASE_ITEMS.length}
        />
      </div>
    </section>
  );
};

export default HomeCompanyDetail;
