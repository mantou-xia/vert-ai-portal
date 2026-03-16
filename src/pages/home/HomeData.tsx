import React, { useState, useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
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

const STAT_CARDS: StatCard[] = [
  {
    id: 'team',
    title: '与团队共同成长',
    description: '助力每一个团队加速实现从创意到落地的全过程,高效构建、部署和扩展 AI 应用，将大胆构想化为现实。',
    label: '团队',
    numericValue: 40,
    suffix: '+',
  },
  {
    id: 'industry',
    title: '深受行业领导者信赖',
    description: '为众多行业提供可靠的解决方案，从半导体制造到生物医药等，助力客户获取竞争优势。',
    label: '行业',
    numericValue: 7,
    suffix: '+',
  },
  {
    id: 'apps',
    title: '由 VERT 驱动',
    description: '目前，我们提供的应用广泛应用于各行各业及不同部门，解决实际场景中的问题。',
    label: '应用',
    numericValue: 100,
    suffix: '+',
  },
];

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
      {value}{suffix}
    </motion.span>
  );
};

const HomeData: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
        <motion.header
          className="home-data__header"
          variants={infoVariants}
        >
          <h2 className="home-data__title">为企业成功奠定坚实 AI 基石</h2>
          <p className="home-data__subtitle">
            企业实现 AI 转型，需要的不仅仅是工具，更是坚实可靠的基础设施。
            我们提供可扩展的基础设施、细粒度的访问控制以及跨部门的无缝集成能力，帮助企业成功实现 AI 转型。
          </p>
        </motion.header>

        <div className="home-data__cards">
          {STAT_CARDS.map((card) => (
            <motion.article
              key={card.id}
              className="home-data__card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.div
                className="home-data__card-info"
                variants={infoVariants}
              >
                <h3 className="home-data__card-title">{card.title}</h3>
                <p className="home-data__card-desc">{card.description}</p>
              </motion.div>

              <div className="home-data__stat">
                <span className="home-data__stat-label">{card.label}</span>
                <CountUpNumber
                  end={card.numericValue}
                  suffix={card.suffix}
                  inView={inView}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HomeData;
