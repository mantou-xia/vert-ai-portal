import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './PdeSolution.css';

type SolutionItem = {
  key: string;
  icon: string;
  title: string;
  desc: string;
};

const PdeSolution: React.FC = () => {
  const { t } = useTranslation();
  const solutions = useMemo<SolutionItem[]>(
    () => [
      {
        key: 'delivery',
        icon: getAssetPath('/images/icons/fde/font_1.svg'),
        title: t('fde.solution.cards.delivery.title'),
        desc: t('fde.solution.cards.delivery.desc'),
      },
      {
        key: 'landing',
        icon: getAssetPath('/images/icons/fde/font_2.svg'),
        title: t('fde.solution.cards.landing.title'),
        desc: t('fde.solution.cards.landing.desc'),
      },
      {
        key: 'custom',
        icon: getAssetPath('/images/icons/fde/font_3.svg'),
        title: t('fde.solution.cards.custom.title'),
        desc: t('fde.solution.cards.custom.desc'),
      },
      {
        key: 'empower',
        icon: getAssetPath('/images/icons/fde/font_4.svg'),
        title: t('fde.solution.cards.empower.title'),
        desc: t('fde.solution.cards.empower.desc'),
      },
    ],
    [t]
  );

  return (
    <section className="pde-solution">
      <div className="pde-solution__inner">
        <div className="pde-solution__heading">
          <h2 className="pde-solution__title">{t('fde.solution.title')}</h2>
          <p className="pde-solution__subtitle">
            {t('fde.solution.subtitle')}
          </p>
        </div>
        <div className="pde-solution__cards">
          {solutions.map((item) => (
            <article key={item.key} className="pde-solution__card">
              <div className="pde-solution__card-icon" aria-hidden>
                <img src={item.icon} alt="" />
              </div>
              <h3 className="pde-solution__card-title">{item.title}</h3>
              <p className="pde-solution__card-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PdeSolution;
