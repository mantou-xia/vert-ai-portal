import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCountUp } from '../../hooks/useCountUp';
import './HomeData.css';

type StatCard = {
  id: string;
  title: string;
  description: string;
  label: string;
  numericValue: number;
  suffix: string;
};

const infoVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const slotVariants: Variants = {
  hidden: { opacity: 0, y: '100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const CountUpNumber: React.FC<{ end: number; suffix: string; inView: boolean }> = ({
  end,
  suffix,
  inView,
}) => {
  const value = useCountUp({ end, duration: 2000, enabled: inView });
  return (
    <motion.span
      className="home-data__stat-value"
      variants={slotVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {value}
      {suffix}
    </motion.span>
  );
};

const HomeData: React.FC = () => {
  const { t } = useTranslation();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const statCards = useMemo<StatCard[]>(
    () => [
      {
        id: 'team',
        title: t('home.data.teamTitle'),
        description: t('home.data.teamDesc'),
        label: t('home.data.teamLabel'),
        numericValue: 40,
        suffix: '+',
      },
      {
        id: 'industry',
        title: t('home.data.industryTitle'),
        description: t('home.data.industryDesc'),
        label: t('home.data.industryLabel'),
        numericValue: 7,
        suffix: '+',
      },
      {
        id: 'apps',
        title: t('home.data.appsTitle'),
        description: t('home.data.appsDesc'),
        label: t('home.data.appsLabel'),
        numericValue: 100,
        suffix: '+',
      },
    ],
    [t]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="home-data"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="home-data__inner">
        <motion.header className="home-data__header" variants={infoVariants}>
          <h2 className="home-data__title">{t('home.data.title')}</h2>
          <p className="home-data__subtitle">
            {t('home.data.subtitle1')}
            {t('home.data.subtitle2')}
          </p>
        </motion.header>

        <div className="home-data__cards">
          {statCards.map((card) => (
            <motion.article
              key={card.id}
              className="home-data__card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.div className="home-data__card-info" variants={infoVariants}>
                <h3 className="home-data__card-title">{card.title}</h3>
                <p className="home-data__card-desc">{card.description}</p>
              </motion.div>

              <div className="home-data__stat">
                <span className="home-data__stat-label">{card.label}</span>
                <CountUpNumber end={card.numericValue} suffix={card.suffix} inView={inView} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HomeData;
