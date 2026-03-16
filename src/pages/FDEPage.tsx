import React from 'react';
import { motion } from 'framer-motion';
import './FDEPage.css';
import PdeMainImg from './Pde/PdeMainImg';
import PdeSolution from './Pde/PdeSolution';
import PdeCaseStudies from './Pde/PdeCaseStudies';
import PdeStudiesDetail from './Pde/PdeStudiesDetail';
import PdeAiPlugins from './Pde/PdeAiPlugins';
import PdeAlgorithmExamples from './Pde/PdeAlgorithmExamples';
import HomeBrand from './home/HomeBrand';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const FDEPage: React.FC = () => {
  return (
    <div className="fde-page">
      <section className="fde-page__hero">
        <PdeMainImg />
      </section>
      <div className="fde-page__gap" />
      <section className="fde-page__hero fde-page__hero--brand">
        <HomeBrand />
      </section>
      <div className="fde-page__section-wrap">
        <motion.section
          className="fde-page__section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <PdeSolution />
        </motion.section>
      </div>
      <div className="fde-page__section-wrap">
        <motion.section
          className="fde-page__section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <PdeCaseStudies />
        </motion.section>
      </div>
      <div className="fde-page__section-wrap">
        <motion.section
          className="fde-page__section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
        >
          <PdeStudiesDetail />
        </motion.section>
      </div>
      <div className="fde-page__section-wrap">
        <motion.section
          className="fde-page__section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <PdeAlgorithmExamples />
        </motion.section>
      </div>
      <div className="fde-page__section-wrap">
        <motion.section
          className="fde-page__section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={sectionVariants}
        >
          <PdeStudiesDetail />
        </motion.section>
      </div>
      <div className="fde-page__section-wrap">
        <motion.section
          className="fde-page__section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <PdeAiPlugins />
        </motion.section>
      </div>
    </div>
  );
};

export default FDEPage;
