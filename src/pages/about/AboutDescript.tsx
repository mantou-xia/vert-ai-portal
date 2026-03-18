import React from 'react';
import './AboutDescript.css';

const COLUMN_ONE_ITEMS = [
  { label: 'VERT.FDE', value: '现场交付与深度实施团队' },
  { label: 'VERT.MAAS', value: '垂直场景 AI Agent 插件（数字员工）' },
  { label: 'VERT.Flow AI', value: '应用开发平台（企业级 AI 应用开发平台）' },
  { label: 'VERT.Insight', value: '数据底座（企业级数据整合与治理平台）' },
  { label: 'VERT.Core', value: '云原生平台（DevOps 与跨环境部署平台）' },
];

const AboutDescript: React.FC = () => {
  return (
    <section className="about-descript">
      <div className="about-descript__inner">
        <h2 className="about-descript__title">我们团队的核心竞争力</h2>

        <div className="about-descript__grid">
          <article className="about-descript__col">
            <h3 className="about-descript__col-title">专注于AI技术研发与企业应用</h3>
            <div className="about-descript__divider" />
            <ul className="about-descript__list">
              {COLUMN_ONE_ITEMS.map((item) => (
                <li key={item.label} className="about-descript__item">
                  <span className="about-descript__item-label">{item.label}：</span>
                  <span className="about-descript__item-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="about-descript__col">
            <h3 className="about-descript__col-title">行业化AI企业落地经验</h3>
            <div className="about-descript__divider" />
            <p className="about-descript__text">
              我们团队和自研软件为中国商业企业与前沿医疗机构提供支撑，赋能实时 AI 驱动决策，应用场景覆盖从企业管理、生产车间到一线医疗的前沿的全领域。
            </p>
          </article>

          <article className="about-descript__col">
            <h3 className="about-descript__col-title">团队成员构成情况</h3>
            <div className="about-descript__divider" />
            <p className="about-descript__text">
              核心团队具备多年企业级 AI 部署与大数据治理经验，均为阿里、字节、百度。产品及研发人员占比超 90%，核心技术团队均为硕士及博士学历。
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutDescript;
