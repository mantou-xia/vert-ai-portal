import React, { useState, useEffect } from 'react';
import { FloatButton, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  CustomerServiceOutlined,
  PhoneOutlined,
  WechatOutlined,
  VideoCameraOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { getAssetPath } from '../../utils/path';
import './FloatingTools.css';

const FloatingTools: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wechatContent = (
    <div className="wechat-popover">
      <img
        src={getAssetPath('/images/sidebar/wechat_code.png')}
        alt={t('layout.floating.wechatQrAlt')}
        style={{ width: 150, height: 150 }}
        onError={(e) => {
          e.currentTarget.src =
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V2VDaGF0PC90ZXh0Pjwvc3ZnPg==';
        }}
      />
      <p>{t('layout.floating.wechatQrHint')}</p>
    </div>
  );

  return (
    <div className="floating-tools">
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24, bottom: 24 }}
        icon={<CustomerServiceOutlined />}
      >
        <Popover content={wechatContent} title={t('layout.floating.wechatConsult')} placement="left">
          <FloatButton icon={<WechatOutlined />} tooltip={t('layout.floating.wechatConsult')} />
        </Popover>
        <FloatButton
          icon={<PhoneOutlined />}
          tooltip={t('layout.floating.phoneConsult')}
          onClick={() => {
            window.location.href = 'tel:400-880-0750';
          }}
        />
        <FloatButton
          icon={<VideoCameraOutlined />}
          tooltip={t('layout.floating.demo')}
          onClick={() => window.open('/demo', '_blank')}
        />
      </FloatButton.Group>

      {visible && (
        <FloatButton
          icon={<UpOutlined />}
          type="primary"
          style={{ right: 24, bottom: 100 }}
          onClick={scrollToTop}
          tooltip={t('layout.floating.backToTop')}
        />
      )}
    </div>
  );
};

export default FloatingTools;
