import React, { useRef, useState, useEffect } from 'react';
import { getAssetPath } from '../../utils/path';
import MessageBoard from '../MessageBoard';
import './HomeVideo.css';

const VIDEO_SRC = getAssetPath('/videos/home/home_video.mp4');
const POSTER_SRC = getAssetPath('/images/home/video-poster.png');

const HomeVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [backdropHidden, setBackdropHidden] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const footer = document.querySelector('.app-footer');
    if (!overlay) return;

    const check = () => {
      const rect = overlay.getBoundingClientRect();
      // overlay 完全滚出视口时隐藏
      setBackdropHidden(rect.bottom <= 0);
    };

    // Footer 进入视口时强制隐藏，确保 Footer 不被覆盖
    const onFooterVisible = () => {
      setBackdropHidden(true);
    };

    const opts = { passive: true };
    check();
    window.addEventListener('scroll', check, opts);
    document.documentElement.addEventListener('scroll', check, opts);
    document.body.addEventListener('scroll', check, opts);
    window.addEventListener('resize', check);

    const io =
      footer &&
      new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) onFooterVisible();
        },
        { threshold: 0 }
      );
    if (io && footer) io.observe(footer);

    return () => {
      window.removeEventListener('scroll', check);
      document.documentElement.removeEventListener('scroll', check);
      document.body.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      io?.disconnect();
    };
  }, []);

  return (
    <section className="home-video-section">
      {/* 固定全屏视频：首屏播放，下滑时被内容覆盖；滚过本区后隐藏 */}
      <div className={`home-video-backdrop ${backdropHidden ? 'home-video-backdrop--hidden' : ''}`}>
        <video
          ref={videoRef}
          className="home-video-backdrop-element"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          muted
          playsInline
          loop
        >
          您的浏览器不支持视频播放。
        </video>
      </div>

      {/* 顶部留白：保证首屏只看到视频 */}
      <div className="home-video-spacer" aria-hidden="true" />

      {/* 下滑时从底部升上来、覆盖视频的内容块 */}
      <div ref={overlayRef} className="home-video-overlay">
        <div className="home-video-overlay-inner">
          <h2 className="home-video-title">打造企业级数字员工孵化平台</h2>
          <button
            type="button"
            className="home-video-cta"
            onClick={() => setIsMessageOpen(true)}
          >
            立即开始
          </button>
        </div>
      </div>

      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </section>
  );
};

export default HomeVideo;
