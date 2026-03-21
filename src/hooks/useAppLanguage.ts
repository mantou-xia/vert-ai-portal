import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type AppLanguage = 'zh-CN' | 'en-US';

const STORAGE_KEY = 'language';

const normalizeLanguage = (value: string | null): AppLanguage =>
  value === 'en-US' ? 'en-US' : 'zh-CN';

export const useAppLanguage = () => {
  const { i18n } = useTranslation();

  const language = useMemo<AppLanguage>(
    () => normalizeLanguage(i18n.language),
    [i18n.language]
  );

  const setLanguage = useCallback(
    (nextLanguage: AppLanguage) => {
      if (i18n.language !== nextLanguage) {
        void i18n.changeLanguage(nextLanguage);
      }
      localStorage.setItem(STORAGE_KEY, nextLanguage);
      document.documentElement.lang = nextLanguage === 'zh-CN' ? 'zh-CN' : 'en';
    },
    [i18n]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'zh-CN' ? 'en-US' : 'zh-CN');
  }, [language, setLanguage]);

  return {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en-US',
  };
};

