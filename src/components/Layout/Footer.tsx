import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../config/routes';
import { getAssetPath } from '../../utils/path';
import './Footer.css';

const { Footer: AntFooter } = Layout;

const FOOTER_NAV = [
  { label: '??', path: routes.home },
  { label: 'FDE????', path: routes.fde },
  { label: 'MAAS', path: routes.maas },
  { label: '??', path: routes.products },
  { label: '????', path: routes.about },
] as const;

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AntFooter className="app-footer">
      <div className="app-footer__inner">
        <header className="app-footer__top">
          <div className="app-footer__logo" onClick={() => navigate(routes.home)}>
            <img src={getAssetPath('/images/home/logo_write.png')} alt="" />
          </div>
          <nav className="app-footer__nav">
            {FOOTER_NAV.map((item, index) => (
              <span key={item.path}>
                {index > 0 && <span className="app-footer__nav-sep">|</span>}
                <button
                  type="button"
                  className="app-footer__nav-link"
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              </span>
            ))}
          </nav>
        </header>

        <div className="app-footer__middle">
          <div className="app-footer__cta">
            <h2 className="app-footer__cta-title">
              ????????AI?????
            </h2>
            <p className="app-footer__cta-desc">
              ?RAG pipeline????????????????,
              ????????AI Agents, ???????
            </p>
          </div>
          <div className="app-footer__contact">
            <div className="app-footer__contact-body">
              <div className="app-footer__qr-wrap">
                <img
                  className="app-footer__qr-img"
                  src={getAssetPath('/images/home/qr_code.png')}
                  alt="???"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="app-footer__qr-label">???</span>
              </div>
              <div className="app-footer__contact-info">
                <h3 className="app-footer__contact-title">????</h3>
                <div className="app-footer__contact-list">
                  <p>????: 18751969612</p>
                  <p>????: m278398343@163.com</p>
                  <p>
                    ????: ?????????????????6?
                    ????????B?6?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="app-footer__bottom">
          <p className="app-footer__copyright">
            © 2025 Breakthrough Energy, LLC. All Rights Reserved
          </p>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
