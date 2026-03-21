import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';

const STORAGE_KEY = 'language';
const storedLanguage = localStorage.getItem(STORAGE_KEY);
const initialLanguage = storedLanguage === 'en-US' ? 'en-US' : 'zh-CN';

i18n.use(initReactI18next).init({
  resources: {
    'zh-CN': {
      translation: zhCN,
    },
    'en-US': {
      translation: enUS,
    },
  },
  lng: initialLanguage,
  fallbackLng: 'zh-CN',
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = initialLanguage === 'zh-CN' ? 'zh-CN' : 'en';

export default i18n;
