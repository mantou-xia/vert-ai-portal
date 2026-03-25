import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CTAButton from '../../components/common/CTAButton';
import { getAssetPath } from '../../utils/path';
import MessageBoard from '../MessageBoard';
import './ProductFlowword.css';

const checkIcon = getAssetPath('/images/icons/product/绿色对钩.svg');
const workflowImage = getAssetPath('/images/icons/product/image_工作流.png');

type FeatureItem = {
  prefix: string;
  highlight: string;
  suffix: string;
};

const ProductFlowwork: React.FC = () => {
  const { t } = useTranslation();
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  const stats = useMemo(
    () => [
      { value: '200+', label: t('products.flowwork.stat1') },
      { value: '100w+', label: t('products.flowwork.stat2') },
      { value: '99.9%', label: t('products.flowwork.stat3') },
    ],
    [t]
  );

  const features = useMemo(
    () => (t('products.flowwork.features', { returnObjects: true }) as FeatureItem[]) ?? [],
    [t]
  );

  return (
    <section className="product-flowwork">
      <div className="product-flowwork__container">
        <header className="product-flowwork__header">
          <h2 className="product-flowwork__title">{t('products.flowwork.title')}</h2>
          <p className="product-flowwork__subtitle">{t('products.flowwork.subtitle')}</p>
        </header>

        <div className="product-flowwork__card">
          <div className="product-flowwork__left">
            <ul className="product-flowwork__features">
              {features.map((feature, index) => (
                <li key={`feature-${index}`}>
                  <img src={checkIcon} alt="" aria-hidden className="product-flowwork__check-icon" />
                  <span className="product-flowwork__feature-text">
                    {feature.prefix}
                    <span className="product-flowwork__feature-highlight">{feature.highlight}</span>
                    {feature.suffix}
                  </span>
                </li>
              ))}
            </ul>

            <CTAButton className="product-flowwork__cta" onClick={() => setIsMessageOpen(true)}>
              {t('products.flowwork.cta')}
            </CTAButton>
          </div>

          <div className="product-flowwork__right">
            <img className="product-flowwork__image" src={workflowImage} alt={t('products.flowwork.imageAria')} loading="lazy" />
          </div>
        </div>

        <div className="product-flowwork__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="product-flowwork__stat">
              <p className="product-flowwork__stat-value">{stat.value}</p>
              <p className="product-flowwork__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="product-flowwork__divider" />
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default ProductFlowwork;
