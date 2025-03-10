import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';

import enNavbar from './en/about.json';
import uzNavbar from './uz/about.json';
import enSpeakers from '../pages/Speakers/langs/en.json';
import uzSpeakers from '../pages/Speakers/langs/uz.json';

/**
 * {@link https://www.i18next.com/overview/configuration-options}
 * {@link https://github.com/i18next/i18next-browser-languageDetector}
 * */
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        navbar: enNavbar,
        about: enNavbar,
        // events: enEvents,
        // news: enNews,
        speakers: enSpeakers
      },
      uz: {
        navbar: uzNavbar,
        about: uzNavbar,
        // aboutUs: enAboutUs,
        // events: enEvents,
        // news: enNews,
        speakers: uzSpeakers
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    ns: ['about','navbar', 'speakers'],
    defaultNS: 'about',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default () => {
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    if (!['uz', 'en'].includes(i18nInstance.language)) {
      i18nInstance.changeLanguage('en');
    }
  }, []);
};
