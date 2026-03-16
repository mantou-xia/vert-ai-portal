import React from 'react';
import { motion } from 'framer-motion';
import './MaasPage.css';
import MaasMainImg from './maas/MaasMainImg';
import MaasAiModel from './maas/MaasAiModel';
import MaasAiModelDetail from './maas/MaasAiModelDetail';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const MaasPage: React.FC = () => {
  return (
    <div className="maas-page">
      <section className="maas-page__hero">
        <MaasMainImg />
      </section>
      <motion.section
        className="maas-page__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <MaasAiModel />
      </motion.section>
      <motion.section
        className="maas-page__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <MaasAiModelDetail />
      </motion.section>
    </div>
  );
};

export default MaasPage;
