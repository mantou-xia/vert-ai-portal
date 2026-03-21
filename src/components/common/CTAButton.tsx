import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './CTAButton.css';

export interface CTAButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  onClick,
  className = '',
  children,
}) => {
  const { t } = useTranslation();
  const content = children ?? t('common.ctaStart');

  return (
    <button
      type="button"
      className={`cta-button ${className}`.trim()}
      onClick={onClick}
    >
      <span className="cta-button__text">{content}</span>
      <span className="cta-button__icon" aria-hidden>
        <img src={getAssetPath('/images/icons/fde/箭头.svg')} alt="" />
      </span>
    </button>
  );
};

export default CTAButton;
