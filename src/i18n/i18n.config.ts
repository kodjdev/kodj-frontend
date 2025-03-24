import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';

import enNavbar from './en/about.json';
import uzNavbar from './uz/about.json';
import enSpeakers from '../pages/Speakers/langs/en.json';
import uzSpeakers from '../pages/Speakers/langs/uz.json';
import enEventRegister from '../pages/EventRegister/langs/en.json';
import uzEventRegister from '../pages/EventRegister/langs/uz.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'about';
    resources: {
      navbar: typeof enNavbar;
      about: typeof enNavbar;
      eventRegister: typeof enEventRegister;
      speakers: typeof enSpeakers;
    };
  }
}

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
        eventRegister: enEventRegister,
        // events: enEvents,
        // news: enNews,
        speakers: enSpeakers
      },
      uz: {
        navbar: uzNavbar,
        about: uzNavbar,
        eventRegister: uzEventRegister,
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
    ns: ['about','navbar', 'speakers', 'eventRegister'],
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
