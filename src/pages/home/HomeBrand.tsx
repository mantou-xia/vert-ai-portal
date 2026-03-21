import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../../utils/path';
import './HomeBrand.css';

const BRANDS = [
  { nameKey: 'home.brand.jinying', key: 'jinying', logo: '/images/icons/home/金鹰.png' },
  { nameKey: 'home.brand.toa', key: 'toa', logo: '/images/icons/home/英唐.png' },
  { nameKey: 'home.brand.skieber', key: 'skieber', logo: '/images/icons/home/数阔.png' },
  { name: 'ÆON', key: 'aeon', logo: '/images/icons/home/AEON.png' },
  { name: '7-ELEVEN', key: '7eleven', logo: '/images/icons/home/7-ELEVEN.png' },
  { nameKey: 'home.brand.gmart', key: 'gmart', logo: '/images/icons/home/金鹰2.png' },
];

type HomeBrandProps = {
  activeIndex?: number;
  onBrandClick?: (index: number) => void;
  total?: number;
};

const SCROLL_SPEED = 1.2;

const HomeBrand: React.FC<HomeBrandProps> = ({
  activeIndex = -1,
  onBrandClick,
}) => {
  const { t } = useTranslation();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const listWidthRef = useRef(0);
  const lastCenterRef = useRef(-1);

  const brands = useMemo(
    () =>
      BRANDS.map((brand) => ({
        ...brand,
        name: brand.nameKey ? t(brand.nameKey) : brand.name,
      })),
    [t]
  );

  const detectCenter = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !onBrandClick) return;

    const viewportRect = viewport.getBoundingClientRect();
    const centerX = viewportRect.left + viewportRect.width / 2;
    const items = viewport.querySelectorAll<HTMLElement>('.home-brand__item');
    if (items.length === 0) return;

    let closestIdx = 0;
    let closestDist = Infinity;
    const brandCount = brands.length;

    items.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(itemCenter - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i % brandCount;
      }
    });

    if (closestIdx !== lastCenterRef.current) {
      lastCenterRef.current = closestIdx;
      onBrandClick(closestIdx);
    }
  }, [brands.length, onBrandClick]);

  useEffect(() => {
    const tick = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const list = track.querySelector<HTMLElement>('.home-brand__list');
      if (list && listWidthRef.current === 0) {
        listWidthRef.current = list.offsetWidth;
      }
      const listWidth = listWidthRef.current;

      if (listWidth > 0) {
        offsetRef.current -= SCROLL_SPEED;
        if (offsetRef.current <= -listWidth) {
          offsetRef.current += listWidth;
        }
        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      detectCenter();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [detectCenter]);

  return (
    <div className="home-brand">
      <div ref={viewportRef} className="home-brand__viewport">
        <div ref={trackRef} className="home-brand__track">
          {[0, 1, 2].map((setIdx) => (
            <div key={setIdx} className="home-brand__list" aria-hidden={setIdx > 0}>
              {brands.map((brand, i) => (
                <button
                  key={`${setIdx}-${brand.key}`}
                  type="button"
                  className={`home-brand__item ${
                    i === activeIndex ? 'home-brand__item--active' : ''
                  }`}
                  onClick={() => onBrandClick?.(i)}
                >
                  <img
                    className="home-brand__logo"
                    src={getAssetPath(brand.logo)}
                    alt={brand.name}
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBrand;
