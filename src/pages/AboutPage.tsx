import React from 'react';
import { motion } from 'framer-motion';
import AboutMainImg from './about/AboutMainImg';
import AboutDescript from './about/AboutDescript';
import './AboutPage.css';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <section className="about-page__hero">
        <AboutMainImg />
      </section>
      <motion.section
        className="about-page__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <AboutDescript />
      </motion.section>
    </div>
  );
};

export default AboutPage;
