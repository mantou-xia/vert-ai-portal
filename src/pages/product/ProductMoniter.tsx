import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './ProductMoniter.css';

const ProductMoniter: React.FC = () => {
  const { t } = useTranslation();
  const monitorCards = useMemo(
    () => [
      {
        className: 'product-moniter__card--perf',
        src: getAssetPath('/images/icons/product/智能体监控.png'),
        alt: t('products.monitor.paramPlaceholder'),
      },
      {
        className: 'product-moniter__card--console',
        src: getAssetPath('/images/icons/product/性能实时监控.png'),
        alt: t('products.monitor.perfPlaceholder'),
      },
      {
        className: 'product-moniter__card--param',
        src: getAssetPath('/images/icons/product/自动产出分析报告.png'),
        alt: t('products.monitor.consolePlaceholder'),
      },
      {
        className: 'product-moniter__card--report',
        src: getAssetPath('/images/icons/product/参数在线调试.png'),
        alt: t('products.monitor.reportPlaceholder'),
      },
    ],
    [t]
  );

  const summaryStats = useMemo(
    () => [
      { value: '<200ms', label: t('products.monitor.stat1') },
      { value: '80%', label: t('products.monitor.stat2') },
      { value: '80%', label: t('products.monitor.stat3') },
    ],
    [t]
  );

  return (
    <section className="product-moniter">
      <div className="product-moniter__container">
        <header className="product-moniter__header">
          <h2 className="product-moniter__title">{t('products.monitor.title')}</h2>
          <p className="product-moniter__subtitle">{t('products.monitor.subtitle')}</p>
        </header>

        <div className="product-moniter__grid">
          {monitorCards.map((card) => (
            <article key={card.src} className={`product-moniter__card ${card.className}`}>
              <img className="product-moniter__image" src={card.src} alt={card.alt} loading="lazy" />
            </article>
          ))}
        </div>

        <div className="product-moniter__stats">
          {summaryStats.map((stat) => (
            <div key={stat.label} className="product-moniter__stat">
              <p className="product-moniter__stat-value">{stat.value}</p>
              <p className="product-moniter__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="product-moniter__divider" />
      </div>
    </section>
  );
};

export default ProductMoniter;
