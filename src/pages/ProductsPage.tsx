import React from 'react';
import { motion } from 'framer-motion';
import ProductMainImg from './product/ProductMainImg';
import ProductPlugins from './product/ProductPlugins';
import ProductFlowwork from './product/ProductFlowwork';
import ProductMoniter from './product/ProductMoniter';
import ProductModel from './product/ProductModel';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const ProductsPage: React.FC = () => {
  return (
    <div className="products-page">
      <section className="products-page__hero">
        <ProductMainImg />
      </section>
      <motion.section
        className="products-page__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <ProductPlugins />
      </motion.section>
      <motion.section
        className="products-page__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <ProductFlowwork />
      </motion.section>
      <motion.section
        className="products-page__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <ProductMoniter />
      </motion.section>
      <motion.section
        className="products-page__section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <ProductModel />
      </motion.section>
    </div>
  );
};

export default ProductsPage;
