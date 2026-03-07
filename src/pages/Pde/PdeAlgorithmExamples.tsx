import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssetPath } from '../../utils/path';
import './PdeAlgorithmExamples.css';

const PdeAlgorithmExamples: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="pde-algorithm-examples">
      <div className="pde-algorithm-examples__inner">
        <h2 className="pde-algorithm-examples__title">
          企业级算法解决方案实例
        </h2>
        <div className="pde-algorithm-examples__block">
          <div className="pde-algorithm-examples__left">
            <h3 className="pde-algorithm-examples__company pde-algorithm-examples__reveal-rest">
              金鹰集团
            </h3>
            <p className="pde-algorithm-examples__industry pde-algorithm-examples__reveal-rest">
              商贸新零售
            </p>
            <p className="pde-algorithm-examples__intro pde-algorithm-examples__reveal-rest">
              金鹰集团为商贸新零售标杆企业,VERT.AI为其落地&quot;100+业务节点,20+Agent应用场景&quot;,实现财务、法务、物业等全链路AI智能化升级,解决人工效率低、数据失真、决策滞后等痛点。
            </p>
            <ul className="pde-algorithm-examples__kpis">
              <li className="pde-algorithm-examples__kpi">
                <span className="pde-algorithm-examples__kpi-num">100</span>
                <span className="pde-algorithm-examples__reveal-rest">+ 业务节点</span>
              </li>
              <li className="pde-algorithm-examples__kpi">
                <span className="pde-algorithm-examples__kpi-num">20</span>
                <span className="pde-algorithm-examples__reveal-rest">+ Agent应用场景</span>
              </li>
              <li className="pde-algorithm-examples__kpi">
                <span className="pde-algorithm-examples__kpi-num">60</span>
                <span className="pde-algorithm-examples__reveal-rest">%+ 人力成本降低</span>
              </li>
            </ul>
            <button
              type="button"
              className="pde-algorithm-examples__btn pde-algorithm-examples__reveal-rest"
              onClick={() => navigate('/about')}
            >
              成为合作伙伴 →
            </button>
          </div>
          <div className="pde-algorithm-examples__right">
            <div className="pde-algorithm-examples__screen-wrap pde-algorithm-examples__reveal-rest">
              <img
                className="pde-algorithm-examples__screen-img"
                src={getAssetPath('/images/home/keyboard.png')}
                alt="算法解决方案示意"
              />
            </div>
            <button
              type="button"
              className="pde-algorithm-examples__report-btn pde-algorithm-examples__reveal-rest"
            >
              帮我生成1月的营收报表
              <span className="pde-algorithm-examples__report-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7h-6M17 7v6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdeAlgorithmExamples;
