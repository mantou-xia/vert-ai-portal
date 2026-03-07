import React, { useRef, useState, useCallback, useEffect } from 'react';
import './MaasAiModel.css';

const MODELS = [
  {
    key: 'gpt4',
    name: 'OpenAI GPT-4',
    description: '文本生成 代码辅助 多模态',
    iconColor: '#9ca3af',
    iconShape: 'gear',
  },
  {
    key: 'claude3',
    name: 'Claude 3',
    description: '长文本理解 分析推理 创作',
    iconColor: '#f59e0b',
    iconShape: 'star',
  },
  {
    key: 'deepseek',
    name: 'deepseek',
    description: '文本生成 代码辅助 多模态',
    iconColor: '#3b82f6',
    iconShape: 'd',
  },
  {
    key: 'qwen',
    name: '通义千问',
    description: '多语言 多模态 代码生成',
    iconColor: '#a855f7',
    iconShape: 'hex',
  },
  {
    key: 'gemini',
    name: 'Gemini Pro',
    description: '推理 创意 多模态',
    iconColor: '#2563eb',
    iconShape: 'diamond',
  },
  {
    key: 'kimi',
    name: 'Kimi',
    description: '文本生成 代码辅助 多模态',
    iconColor: '#6b7280',
    iconShape: 'k',
  },
];

const SCROLL_SPEED = 1;

const MaasAiModel: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const autoScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || isDragging) return;
    const listWidth = el.scrollWidth / 2;
    if (listWidth <= 0) return;
    let next = el.scrollLeft + SCROLL_SPEED;
    if (next >= listWidth) next -= listWidth;
    el.scrollLeft = next;
    rafRef.current = requestAnimationFrame(autoScroll);
  }, [isDragging]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoScroll]);

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
      const listWidth = trackRef.current.scrollWidth / 2;
      let next = scrollStart + dx;
      next = ((next % listWidth) + listWidth) % listWidth;
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

  const renderIcon = (color: string, shape: string) => (
    <span
      className="maas-ai-model__icon"
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {shape === 'gear' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M19.78 4.22l-1.42 1.42M5.64 18.36l-1.42 1.42" />
        </svg>
      )}
      {shape === 'star' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
        </svg>
      )}
      {shape === 'd' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4v16h4c4 0 8-3.5 8-8s-4-8-8-8H6zm2 2h2c2.5 0 4 2 4 6s-1.5 6-4 6H8V6z" />
        </svg>
      )}
      {shape === 'hex' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7 3.5v7L12 18.5l-7-3.5v-7l7-3.5z" />
        </svg>
      )}
      {shape === 'diamond' && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l9 9-9 9-9-9 9-9z" />
        </svg>
      )}
      {shape === 'k' && (
        <span className="maas-ai-model__icon-k">K</span>
      )}
    </span>
  );

  const renderList = (keyPrefix = '') =>
    MODELS.map((m) => (
      <div key={`${keyPrefix}${m.key}`} className="maas-ai-model__item">
        {renderIcon(m.iconColor, m.iconShape)}
        <div className="maas-ai-model__text">
          <div className="maas-ai-model__name">{m.name}</div>
          <div className="maas-ai-model__desc">{m.description}</div>
        </div>
      </div>
    ));

  return (
    <section className="maas-ai-model">
      <div className="maas-ai-model__inner">
        <div
          ref={trackRef}
          className={`maas-ai-model__track ${isDragging ? 'maas-ai-model__track--dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div className="maas-ai-model__list">{renderList()}</div>
          <div className="maas-ai-model__list" aria-hidden="true">
            {renderList('dup-')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaasAiModel;
