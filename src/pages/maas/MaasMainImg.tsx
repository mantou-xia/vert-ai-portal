import React from 'react';
import './MaasMainImg.css';

const MaasMainImg: React.FC = () => {
  return (
    <section className="maas-main-img">
      <div className="maas-main-img__bg">
        <div className="maas-main-img__line maas-main-img__line--1" />
        <div className="maas-main-img__line maas-main-img__line--2" />
        <div className="maas-main-img__line maas-main-img__line--3" />
        <div className="maas-main-img__line maas-main-img__line--4" />
        <div className="maas-main-img__line maas-main-img__line--5" />
        <div className="maas-main-img__circle maas-main-img__circle--tl" />
        <div className="maas-main-img__circle maas-main-img__circle--br" />
      </div>
      <div className="maas-main-img__content">
        <h1 className="maas-main-img__title">
          <strong>无需增加额外预算,即可扩大影响力</strong>
        </h1>
        <p className="maas-main-img__desc">
          由VERT提供支持,以人工智能的速度为您配备专家级的精准能力。
        </p>
        <div className="maas-main-img__input-wrap">
          <span className="maas-main-img__input-icon" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
            </svg>
          </span>
          <span className="maas-main-img__input-text">
            帮我分析近一周的采购订单的规模
          </span>
          <button
            type="button"
            className="maas-main-img__input-btn"
            aria-label="发送"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7h-6M17 7v6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MaasMainImg;
