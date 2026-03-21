import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './ProductMoniter.css';

const ProductMoniter: React.FC = () => {
  const { t } = useTranslation();
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
          <article className="product-moniter__card product-moniter__card--perf">
            <div className="product-moniter__image-placeholder" role="img" aria-label={t('products.monitor.perfPlaceholder')}>
              {t('products.monitor.perfPlaceholder')}
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--console">
            <div className="product-moniter__image-placeholder" role="img" aria-label={t('products.monitor.consolePlaceholder')}>
              {t('products.monitor.consolePlaceholder')}
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--param">
            <div className="product-moniter__image-placeholder" role="img" aria-label={t('products.monitor.paramPlaceholder')}>
              {t('products.monitor.paramPlaceholder')}
            </div>
          </article>

          <article className="product-moniter__card product-moniter__card--report">
            <div className="product-moniter__image-placeholder" role="img" aria-label={t('products.monitor.reportPlaceholder')}>
              {t('products.monitor.reportPlaceholder')}
            </div>
          </article>
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
