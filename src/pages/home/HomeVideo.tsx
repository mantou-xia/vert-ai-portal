import React, { useRef, useState, useEffect } from 'react';
import { getAssetPath } from '../../utils/path';
import './HomeVideo.css';

const VIDEO_SRC = getAssetPath('/videos/home/home_video.mp4');
const POSTER_SRC = getAssetPath('/images/home/video-poster.png');

const HomeVideo: React.FC = () => {
  const cardVideoRef = useRef<HTMLVideoElement | null>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
  const cardWrapRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);

  useEffect(() => {
    const full = fullscreenVideoRef.current;
    const card = cardVideoRef.current;
    const cardWrap = cardWrapRef.current;
    if (!full || !cardWrap) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        const cardInView = e.isIntersecting;
        const active = !cardInView;
        setIsFullscreenActive(active);
        if (active) {
          if (card && !isNaN(card.currentTime)) full.currentTime = card.currentTime;
          card?.pause();
          full.play().catch(() => {});
        } else {
          if (full && !isNaN(full.currentTime) && card) card.currentTime = full.currentTime;
          full.pause();
          card?.play().catch(() => {});
        }
      },
      { threshold: 0, rootMargin: '0px' }
    );
    io.observe(cardWrap);
    return () => io.disconnect();
  }, []);

  const handlePlayClick = () => {
    if (cardVideoRef.current) {
      cardVideoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="home-video-section">
      <div className="home-video-inner">
        <div className="home-video-header">
          <div className="home-video-subtitle">
            160.6k stars on <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <h2 className="home-video-title">打造企业级数字员工孵化平台</h2>
          <button type="button" className="home-video-cta">
            立即开始
          </button>
        </div>

        <div ref={cardWrapRef} className="home-video-card">
          <div className="home-video-frame">
            <video
              ref={cardVideoRef}
              className="home-video-element"
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted
              playsInline
              loop
              controls
              onPlay={() => setIsPlaying(true)}
            >
              您的浏览器不支持视频播放。
            </video>
            {!isPlaying && (
              <button
                type="button"
                className="home-video-play-overlay"
                onClick={handlePlayClick}
                aria-label="播放"
              >
                <span className="home-video-play-button">
                  <span className="home-video-play-icon">▶</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        ref={stickyRef}
        className={`home-video-sticky ${isFullscreenActive ? 'home-video-sticky--active' : ''}`}
      >
        <div className="home-video-fullscreen">
          <video
            ref={fullscreenVideoRef}
            className="home-video-fullscreen-element"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            loop
            controls
          >
            您的浏览器不支持视频播放。
          </video>
        </div>
      </div>
      <div className="home-video-spacer" aria-hidden="true" />
    </section>
  );
};

export default HomeVideo;
