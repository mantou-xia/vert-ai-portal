import React, { useRef, useState, useCallback, useEffect } from 'react';
import { getAssetPath } from '../../utils/path';
import './MaasAiModelDetail.css';

const CARD_IMAGE = getAssetPath('/images/home/keyboard.png');

const CARDS = [
  {
    key: 'api',
    title: '一站式API, 适配所有大模型',
    description:
      '基于VERT的核心平台 (VERT.Insight, VERT.Flow, VERT.Core), 为用户提供独有的AI Agent, 工作流驱动的智能模块, 解决企业研发的业务痛点。',
  },
  {
    key: 'cost',
    title: '成本与性能平衡',
    description:
      '无缝适配前沿AI Agent, 快速搭建企业级应用和降低成本控制。基于VERT.MAAS云原生平台, 灵活部署调度, 降低企业运营成本, 满足工业生产场景, 提升业务效率。',
  },
  {
    key: 'availability',
    title: '更高可用性',
    description:
      '基于VERT.Core云原生平台自适应流式数据融合分布式计算, 保障AI模型稳定运行, 提供实时数据服务, 支持任何复杂计算体系结构, 同时也能成本弹性地匹配计算资源, 以应对业务增长。',
  },
  {
    key: 'security',
    title: '本地, 私有安全',
    description:
      '你的数据永远属于你, 不提交云平台, 私有部署, 你的工作流敏感信息因此不会被窃取或暴露。并提供完整的隐私保护与信任。',
  },
  {
    key: 'landing',
    title: '从模型到产品, 全流程落地',
    description:
      '模块化构建: 模块化AI Agent设计, 确保用户可以根据自身业务需求, 灵活构建和组合AI Agent功能模块。一键部署接入: 提供一键式部署工具, 快速将AI Agent集成到现有生产系统, 满足多样业务需求。',
  },
  {
    key: 'websearch',
    title: '联网搜索 (Web Search)',
    description:
      '兰大核心智能: 涵盖联网搜索, 网页提取, 检索等核心功能, 适配多模态需求。多模态融合智能: 基于多模态融合技术, 增强AI Agent的感知能力和表达能力, 满足多样业务需求。',
  },
  {
    key: 'mcp',
    title: 'MCP',
    description:
      '通用适配接口: 支持与现有知识库系统无缝集成, 方便用户快速构建和管理知识库。智能检索增强: 结合RAG技术, 增强AI Agent的知识检索能力, 提供更精准的答案。',
  },
  {
    key: 'rag',
    title: '知识库 (RAG)',
    description:
      '模型微调 (Fine-tuning): 基于丰富的行业数据进行模型微调, 确保AI Agent在特定领域表现更出色。增量式训练: 实时监控AI Agent的性能, 根据反馈数据进行增量式训练, 持续优化模型。',
  },
];

const WHEEL_SPEED = 80;
const ENTRANCE_DURATION = 700;
const EDGE_THRESHOLD = 10;
const ENTRANCE_SCROLL_PX = 360;

const MaasAiModelDetail: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const entranceDoneRef = useRef(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || entranceDoneRef.current) return;
    entranceDoneRef.current = true;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (maxScroll <= 0) return;
    const startLeft = el.scrollLeft;
    const targetLeft = Math.min(maxScroll, ENTRANCE_SCROLL_PX);
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / ENTRANCE_DURATION, 1);
      const ease = 1 - (1 - t) * (1 - t);
      el.scrollLeft = startLeft + (targetLeft - startLeft) * ease;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    const el = trackRef.current;
    if (!el) return;
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    if (maxScroll <= 0) return;

    const current = el.scrollLeft;
    const atFirst = current <= EDGE_THRESHOLD;
    const atLast = current >= maxScroll - EDGE_THRESHOLD;

    // 边界放行：到第一个继续往上、到最后继续往下，都交给页面上下滚动
    if (atFirst && delta < 0) return;
    if (atLast && delta > 0) return;

    const move = Math.abs(delta) > 0 ? (delta > 0 ? WHEEL_SPEED : -WHEEL_SPEED) : 0;
    if (move === 0) return;

    const next = Math.max(0, Math.min(current + move, maxScroll));
    if (next === current) return;

    // 只有真正发生横向滚动时才拦截默认滚动（参考 HomeItemShow）
    e.preventDefault();
    el.scrollLeft = next;
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStart(trackRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !trackRef.current) return;
      e.preventDefault();
      const dx = e.pageX - startX;
      const maxScroll = Math.max(
        0,
        trackRef.current.scrollWidth - trackRef.current.clientWidth
      );
      const next = Math.max(0, Math.min(scrollStart + dx, maxScroll));
      trackRef.current.scrollLeft = next;
    },
    [isDragging, startX, scrollStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) setIsDragging(false);
  }, [isDragging]);

  const renderList = (keyPrefix = '') =>
    CARDS.map((card) => (
      <article key={`${keyPrefix}${card.key}`} className="maas-ai-model-detail__card">
        <div className="maas-ai-model-detail__card-visual">
          <img
            className="maas-ai-model-detail__card-img"
            src={CARD_IMAGE}
            alt=""
          />
        </div>
        <h3 className="maas-ai-model-detail__card-title">{card.title}</h3>
        <p className="maas-ai-model-detail__card-desc">{card.description}</p>
      </article>
    ));

  return (
    <section className="maas-ai-model-detail">
      <div className="maas-ai-model-detail__inner">
        <header className="maas-ai-model-detail__header">
          <h2 className="maas-ai-model-detail__title">
            VERT ROUNTER Interface for AI 工具及LLM列表
          </h2>
        </header>
        <div
          ref={trackRef}
          className={`maas-ai-model-detail__track ${isDragging ? 'maas-ai-model-detail__track--dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="maas-ai-model-detail__list">{renderList()}</div>
        </div>
      </div>
    </section>
  );
};

export default MaasAiModelDetail;
