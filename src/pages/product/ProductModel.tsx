import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './ProductModel.css';

type ModelItem = {
  name: string;
  capabilities: string[];
  icon: string;
};

const MODEL_ICONS = [
  '/images/icons/product/gpt用于大模型组件.svg',
  '/images/icons/product/claude用于大模型组件.svg',
  '/images/icons/product/DeepSeek用于大模型组件.svg',
  '/images/icons/product/通义千问用于大模型组件.svg',
  '/images/icons/product/gemini用于大模型组件.png',
  '/images/icons/product/kimi用于大模型组件.svg',
];

const ProductModel: React.FC = () => {
  const { t } = useTranslation();
  const models = useMemo<ModelItem[]>(
    () =>
      (t('products.model.models', { returnObjects: true }) as Array<Omit<ModelItem, 'icon'>>).map((model, index) => ({
        ...model,
        icon: MODEL_ICONS[index] ?? MODEL_ICONS[0],
      })),
    [t]
  );

  return (
    <section className="product-model">
      <div className="product-model__container">
        <header className="product-model__header">
          <h2 className="product-model__title">{t('products.model.title')}</h2>
          <p className="product-model__subtitle">{t('products.model.subtitle')}</p>
        </header>

        <div className="product-model__panel">
          {models.map((model) => (
            <article key={model.name} className="product-model__row">
              <div className="product-model__left">
                <div className="product-model__icon-wrap">
                  <img src={getAssetPath(model.icon)} alt={model.name} className="product-model__icon" loading="lazy" />
                </div>

                <div className="product-model__meta">
                  <h3>{model.name}</h3>
                  <div className="product-model__capabilities">
                    {model.capabilities.map((cap) => (
                      <span key={cap}>{cap}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="product-model__right">
                <div className="product-model__metric">
                  <p className="product-model__metric-value">200ms</p>
                  <p className="product-model__metric-label">{t('products.model.latency')}</p>
                </div>
                <div className="product-model__metric">
                  <p className="product-model__metric-value">98.5%</p>
                  <p className="product-model__metric-label">{t('products.model.accuracy')}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductModel;
