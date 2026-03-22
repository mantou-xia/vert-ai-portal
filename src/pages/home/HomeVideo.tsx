import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import { useScrollContext } from '../../contexts/ScrollContext';
import MessageBoard from '../MessageBoard';
import CTAButton from '../../components/common/CTAButton';
import './HomeVideo.css';

const VIDEO_SRC = getAssetPath('/videos/home/home_video.mp4');
const POSTER_SRC = getAssetPath('/images/home/video-poster.png');

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const HomeVideo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoStartBase, setVideoStartBase] = useState(440);
  const { setVideoFullscreen, setVideoProgress } = useScrollContext();

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrolled = -rect.top;
    const maxScroll = sectionHeight - viewportHeight;
    if (maxScroll <= 0) return;
    const p = clamp(scrolled / maxScroll, 0, 1);
    setProgress(p);
    setVideoProgress(p);
    setVideoFullscreen(p >= 0.92);
  }, [setVideoFullscreen, setVideoProgress]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const measureVideoStartBase = useCallback(() => {
    const ctaWrap = ctaWrapRef.current;
    if (!ctaWrap) return;
    const nextTop = ctaWrap.offsetTop + ctaWrap.offsetHeight + 64;
    setVideoStartBase(nextTop);
  }, []);

  useEffect(() => {
    const raf = window.requestAnimationFrame(measureVideoStartBase);
    const handleResize = () => measureVideoStartBase();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, [measureVideoStartBase, i18n.language]);

  const phase1 = clamp(progress / 0.6, 0, 1);
  const phase2 = clamp((progress - 0.6) / 0.4, 0, 1);

  const videoInset = lerp(5, 0, phase1);
  const videoRadius = lerp(24, 0, phase1);

  const colorT = clamp(phase1 * 0.5 + phase2 * 0.5, 0, 1);
  const r = Math.round(lerp(26, 255, colorT));
  const g = Math.round(lerp(26, 255, colorT));
  const b = Math.round(lerp(26, 255, colorT));
  const titleColor = `rgb(${r},${g},${b})`;

  const githubLinkColor = `rgb(${Math.round(lerp(45, 255, colorT))},${Math.round(lerp(108, 255, colorT))},${Math.round(lerp(255, 255, colorT))})`;

  const ctaOpacity = clamp(1 - phase1 * 2, 0, 1);
  const labelOpacity = clamp(1 - phase1 * 1.5, 0, 1);
  const playBtnOpacity = clamp(1 - phase1 * 2, 0, 1);
  const titleLayerY = lerp(-90, 0, clamp(progress / 0.15, 0, 1));
  const videoStartTop = videoStartBase + titleLayerY;
  const videoTopOffset = lerp(videoStartTop, 0, phase1);

  return (
    <section ref={sectionRef} className="home-video-section">
      <div className="home-video-sticky">
        <div className="home-video-title-layer" style={{ transform: `translateY(${titleLayerY}px)` }}>
          <p className="home-video-github-label" style={{ opacity: labelOpacity, color: titleColor }}>
            160.6k stars on <a href="https://github.com" style={{ color: githubLinkColor }}>GitHub</a>
          </p>
          <h2 className="home-video-title" style={{ color: titleColor }}>
            {t('home.video.title')}
          </h2>
          <div
            className="home-video-cta-wrap"
            ref={ctaWrapRef}
            style={{ opacity: ctaOpacity, pointerEvents: ctaOpacity < 0.1 ? 'none' : 'auto' }}
          >
            <CTAButton className="home-video-cta" onClick={() => setIsMessageOpen(true)} />
          </div>
        </div>

        <div
          className="home-video-frame"
          style={{
            top: `${videoTopOffset}px`,
            left: `${videoInset}%`,
            right: `${videoInset}%`,
            bottom: '0',
            borderRadius: `${videoRadius}px`,
          }}
        >
          <video
            ref={videoRef}
            className="home-video-element"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            playsInline
            loop
          >
            {t('home.video.videoUnsupported')}
          </video>
          <div className="home-video-play-btn" style={{ opacity: playBtnOpacity }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.9)" />
              <path d="M20 16L34 24L20 32V16Z" fill="#0f172a" />
            </svg>
          </div>
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default HomeVideo;
