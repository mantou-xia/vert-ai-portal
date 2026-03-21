import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './PdeStudiesDetail.css';

const EASE = [0.16, 1, 0.3, 1] as const;

type DetailCard = {
  key: string;
  title: string;
  tag: string;
  pain: string;
  aiService: string;
  coreValue: string;
  image: string;
  isAudit?: boolean;
};

const DETAIL_CARD_IMAGES: Record<string, string> = {
  service: 'https://www.figma.com/api/mcp/asset/a11f3581-5a75-48c2-bdea-1c67ac4bd756',
  legal: 'https://www.figma.com/api/mcp/asset/0240d441-e3a7-4502-b4cf-f48b98c5d588',
  audit: 'https://www.figma.com/api/mcp/asset/0dedae14-c269-4707-b4ff-3a1a602de09a',
};

function parseHighlight(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<React.Fragment key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</React.Fragment>);
    }
    parts.push(
      <span key={`h-${key++}`} className="pde-studies-detail__highlight">
        {match[1]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<React.Fragment key={`t-${key++}`}>{text.slice(lastIndex)}</React.Fragment>);
  }
  return parts.length > 0 ? <>{parts}</> : text;
}

const PdeStudiesDetail: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const hasPlayed = useRef(false);
  const detailCards = useMemo(
    () =>
      (t('fde.studiesDetail.cards', { returnObjects: true }) as Omit<DetailCard, 'image'>[]).map((card) => ({
        ...card,
        image: DETAIL_CARD_IMAGES[card.key] ?? DETAIL_CARD_IMAGES.service,
      })),
    [t]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pde-studies-detail">
      <div className="pde-studies-detail__inner">
        {detailCards.map((card, index) => (
          <motion.article
            key={card.key}
            className={`pde-studies-detail__card${card.isAudit ? ' pde-studies-detail__card--audit' : ''}`}
            initial={{ x: 80, opacity: 0 }}
            animate={hasAnimated ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: EASE,
              delay: index * 0.1,
            }}
          >
            <div className="pde-studies-detail__content">
              <h3 className="pde-studies-detail__title">{card.title}</h3>
              <div className="pde-studies-detail__pain">
                <span className="pde-studies-detail__tag">{card.tag}</span>
                <p className="pde-studies-detail__pain-text">{card.pain}</p>
              </div>
            </div>
            <div className="pde-studies-detail__image-wrap">
              <img src={card.image} alt="" className="pde-studies-detail__image" />
            </div>
            <div className="pde-studies-detail__expand">
              <div className="pde-studies-detail__expand-block">
                <p className="pde-studies-detail__expand-title">{t('fde.studiesDetail.aiServiceTitle')}</p>
                <p className="pde-studies-detail__expand-text">
                  {parseHighlight(card.aiService)}
                </p>
              </div>
              <div className="pde-studies-detail__expand-block">
                <p className="pde-studies-detail__expand-title">{t('fde.studiesDetail.coreValueTitle')}</p>
                <p className="pde-studies-detail__expand-text">
                  {parseHighlight(card.coreValue)}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default PdeStudiesDetail;
