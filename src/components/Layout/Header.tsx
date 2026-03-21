import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routes } from '../../config/routes';
import MessageBoard from '../../pages/MessageBoard';
import CTAButton from '../common/CTAButton';
import { getAssetPath } from '../../utils/path';
import { useAppLanguage } from '../../hooks/useAppLanguage';
import './Header.css';

const { Header: AntHeader } = Layout;

const MINI_SCROLL_THRESHOLD = 40;

type HeaderMenuItem = {
  key: string;
  label: string;
  path: string;
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { language, toggleLanguage } = useAppLanguage();
  const [isMiniHeader, setIsMiniHeader] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const miniStateRef = useRef(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;

    const syncHeaderMode = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;
      let nextMini = miniStateRef.current;

      if (currentScrollY <= MINI_SCROLL_THRESHOLD) {
        nextMini = false;
      } else if (currentScrollY > prevScrollY) {
        nextMini = true;
      } else if (currentScrollY < prevScrollY) {
        nextMini = false;
      }

      if (miniStateRef.current !== nextMini) {
        miniStateRef.current = nextMini;
        setIsMiniHeader(nextMini);
      }
      lastScrollYRef.current = currentScrollY;
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(syncHeaderMode);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    lastScrollYRef.current = window.scrollY;
    syncHeaderMode();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [location.pathname]);

  const menuItems = useMemo<HeaderMenuItem[]>(
    () => [
      { key: 'home', label: t('layout.header.nav.home'), path: routes.home },
      { key: 'fde-solutions', label: t('layout.header.nav.fde'), path: routes.fde },
      { key: 'maas', label: t('layout.header.nav.maas'), path: routes.maas },
      { key: 'products', label: t('layout.header.nav.products'), path: routes.products },
      { key: 'about', label: t('layout.header.nav.about'), path: routes.about },
    ],
    [t]
  );

  const selectedMenuKey = menuItems.find((item) => {
    if (item.path === routes.home) {
      return location.pathname === routes.home;
    }
    return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
  })?.key;

  const languageLabel = language === 'zh-CN' ? t('common.languageCurrentZh') : t('common.languageCurrentEn');

  return (
    <>
      <AntHeader className={`app-header ${isMiniHeader ? 'app-header--mini' : ''}`}>
        <div className="header-content">
          <div className={`header-normal ${isMiniHeader ? 'header-normal--hidden' : ''}`}>
            <div className="header-brand" onClick={() => navigate(routes.home)}>
              <img src={getAssetPath('/images/home/logo.png')} alt="VERT" />
            </div>

            <div className="header-center-group">
              <div className="header-nav-pill">
                <nav className="header-menu" aria-label={t('layout.header.navAria')}>
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`header-menu-item ${selectedMenuKey === item.key ? 'is-active' : ''}`}
                      onClick={() => navigate(item.path)}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <button
                type="button"
                className="header-language-btn"
                aria-label={languageLabel}
                onClick={toggleLanguage}
              >
                <span>{languageLabel}</span>
              </button>
            </div>

            <div className="header-balance" aria-hidden="true">
              <img src={getAssetPath('/images/home/logo.png')} alt="" />
            </div>
          </div>

          <div className={`header-mini ${isMiniHeader ? 'header-mini--visible' : ''}`}>
            <div className="header-mini-pill">
              <div className="header-mini-logo" onClick={() => navigate(routes.home)}>
                <img src={getAssetPath('/images/home/logo.png')} alt="VERT" />
              </div>
              <CTAButton className="header-mini-cta" onClick={() => setIsMessageOpen(true)}>
                {t('layout.header.miniCta')}
              </CTAButton>
            </div>
          </div>
        </div>
      </AntHeader>
      <MessageBoard open={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
    </>
  );
};

export default Header;
