import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MessageBoard from '../MessageBoard';
import PartnerCtaButton from '../../components/common/PartnerCtaButton';
import './PdeCaseStudies.css';

// const CASE_IMAGE_BACK = 'https://www.figma.com/api/mcp/asset/0e3d9e48-e1f0-4f76-acc5-9c43cd7756c5';
// const CASE_IMAGE_MIDDLE = 'https://www.figma.com/api/mcp/asset/f85ff421-f408-4903-be99-4dcd1bc652f8';
// const CASE_IMAGE_FRONT = 'https://www.figma.com/api/mcp/asset/ae55b782-9e5c-465a-9761-1d427c27e3ac';

const PdeCaseStudies: React.FC = () => {
  const { t } = useTranslation();
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  return (
    <section className="pde-case-studies">
      <div className="pde-case-studies__inner">
        <h2 className="pde-case-studies__title">{t('fde.caseStudies.title')}</h2>

        <div className="pde-case-studies__block">
          <div className="pde-case-studies__left">
            <div className="pde-case-studies__meta">
              <h3 className="pde-case-studies__company">{t('fde.caseStudies.company')}</h3>
              <p className="pde-case-studies__industry">{t('fde.caseStudies.industry')}</p>
            </div>

            <p className="pde-case-studies__intro">
              {t('fde.caseStudies.intro')}
            </p>

            <ul className="pde-case-studies__list">
              <li>
                <span className="pde-case-studies__num">①</span>
                {t('fde.caseStudies.item1')}
              </li>
              <li>
                <span className="pde-case-studies__num">②</span>
                {t('fde.caseStudies.item2')}
              </li>
              <li>
                <span className="pde-case-studies__num">③</span>
                {t('fde.caseStudies.item3')}
              </li>
            </ul>

            <PartnerCtaButton
              className="pde-case-studies__btn"
              onClick={() => setIsMessageOpen(true)}
            />
          </div>

          <div className="pde-case-studies__right" aria-hidden>
            <img className="pde-case-studies__image pde-case-studies__image--back" src="../../../public/images//icons/fde/image_最下层.png" alt="" />
            <img className="pde-case-studies__image pde-case-studies__image--middle" src="../../../public/images//icons/fde/image_中间层.png" alt="" />
            <img className="pde-case-studies__image pde-case-studies__image--front" src="../../../public/images//icons/fde/image_最上层.png" alt="" />
          </div>
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default PdeCaseStudies;
