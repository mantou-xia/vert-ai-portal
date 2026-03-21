import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './HomeSubjectKeyword.css';

interface HomeSubjectKeywordProps {
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const SECOND_MOVE_MS = 700;
const THIRD_MOVE_MS = 700;
const TOP_REVEAL_MS = 550;
const BOTTOM_REVEAL_MS = 650;
const START_DELAY_MS = 1000;
const ROW_STEP = 56;

type Phase = 'idle' | 'moveSecond' | 'moveThird' | 'showTop' | 'showBottom' | 'complete';

const HomeSubjectKeyword: React.FC<HomeSubjectKeywordProps> = ({ className }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const hasPlayed = useRef(false);
  const startDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry || hasPlayed.current) return;

        if (entry.isIntersecting) {
          if (startDelayTimerRef.current !== null) return;
          startDelayTimerRef.current = setTimeout(() => {
            startDelayTimerRef.current = null;
            hasPlayed.current = true;
            setPhase('moveSecond');
          }, START_DELAY_MS);
          return;
        }

        if (!entry.isIntersecting && startDelayTimerRef.current !== null) {
          clearTimeout(startDelayTimerRef.current);
          startDelayTimerRef.current = null;
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      if (startDelayTimerRef.current !== null) {
        clearTimeout(startDelayTimerRef.current);
        startDelayTimerRef.current = null;
      }
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (phase === 'moveSecond') {
      const tmr = setTimeout(() => setPhase('moveThird'), SECOND_MOVE_MS);
      return () => clearTimeout(tmr);
    }
    if (phase === 'moveThird') {
      const tmr = setTimeout(() => setPhase('showTop'), THIRD_MOVE_MS);
      return () => clearTimeout(tmr);
    }
    if (phase === 'showTop') {
      const tmr = setTimeout(() => setPhase('showBottom'), TOP_REVEAL_MS);
      return () => clearTimeout(tmr);
    }
    if (phase === 'showBottom') {
      const tmr = setTimeout(() => setPhase('complete'), BOTTOM_REVEAL_MS);
      return () => clearTimeout(tmr);
    }
  }, [phase]);

  const showTopText = phase === 'showTop' || phase === 'showBottom' || phase === 'complete';
  const showBottomText = phase === 'showBottom' || phase === 'complete';
  const secondKeywordY = phase === 'idle' ? ROW_STEP : 0;
  const thirdKeywordY = phase === 'idle' || phase === 'moveSecond' ? ROW_STEP * 2 : 0;

  return (
    <section ref={sectionRef} className={`home-subject ${className ?? ''}`}>
      <div className="home-subject__sticky">
        <div className="home-subject__inner">
          <motion.div
            className="home-subject__label-wrap"
            initial={false}
            animate={{
              height: showTopText ? 48 : 0,
              opacity: showTopText ? 1 : 0,
              marginBottom: showTopText ? 40 : 0,
            }}
            transition={{ duration: TOP_REVEAL_MS / 1000, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p className="home-subject__label">{t('home.subject.label')}</p>
          </motion.div>

          <motion.div className="home-subject__keywords">
            <motion.div
              className="home-subject__keyword-row"
              initial={false}
              animate={{ x: 0, y: 0 }}
              transition={{ duration: 0, ease: EASE }}
            >
              <span className="home-subject__keyword">{t('home.subject.keyword1')}</span>
            </motion.div>
            <motion.div
              className="home-subject__keyword-row"
              initial={false}
              animate={{ x: 0, y: secondKeywordY }}
              transition={{ duration: SECOND_MOVE_MS / 1000, ease: EASE }}
            >
              <span className="home-subject__keyword">{t('home.subject.keyword2')}</span>
            </motion.div>
            <motion.div
              className="home-subject__keyword-row"
              initial={false}
              animate={{ x: 0, y: thirdKeywordY }}
              transition={{ duration: THIRD_MOVE_MS / 1000, ease: EASE }}
            >
              <span className="home-subject__keyword">{t('home.subject.keyword3')}</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="home-subject__desc-wrap"
            initial={false}
            animate={{
              height: showBottomText ? 100 : 0,
              opacity: showBottomText ? 1 : 0,
            }}
            transition={{ duration: BOTTOM_REVEAL_MS / 1000, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <p className="home-subject__desc">
              {t('home.subject.desc1')}
              <br />
              {t('home.subject.desc2')}
              <br />
              {t('home.subject.desc3')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSubjectKeyword;
