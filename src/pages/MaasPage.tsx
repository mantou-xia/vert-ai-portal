import React from 'react';
import './MaasPage.css';
import MaasMainImg from './maas/MaasMainImg';
import MaasAiModel from './maas/MaasAiModel';
import MaasAiModelDetail from './maas/MaasAiModelDetail';
const MaasPage: React.FC = () => {
  return (
    <div className="fde-page">
      <section className="fde-page__hero">
        <MaasMainImg />
      </section>
      <section className="fde-page__hero">
        <MaasAiModel />
      </section>
      <section className="fde-page__hero">
        <MaasAiModelDetail />
      </section>

    </div>
  );
};

export default MaasPage;
