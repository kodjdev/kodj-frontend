import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';

import uzHome from '@/pages/Home/langs/uz-home.json';
import enHome from '@/pages/Home/langs/en-home.json';
import enSpeakers from '@/pages/Speakers/langs/en-speakers.json';
import uzSpeakers from '@/pages/Speakers/langs/uz-speakers.json';
import enEventRegister from '@/pages/Events/EventRegister/langs/en-register.json';
import uzEventRegister from '@/pages/Events/EventRegister/langs/uz-register.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'about';
        resources: {
            home: typeof enHome;
            speakers: typeof enSpeakers;
            eventRegister: typeof enEventRegister;
        };
    }
}

/**
 * {@link https://www.i18next.com/overview/configuration-options}
 * {@link https://github.com/i18next/i18next-browser-languageDetector}
 * */
i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                home: enHome,
                speakers: enSpeakers,
                eventRegister: enEventRegister,
            },
            uz: {
                home: uzHome,
                speakers: uzSpeakers,
                eventRegister: uzEventRegister,
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        ns: ['home', 'speakers', 'eventRegister'],
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
    }, [i18nInstance]);
};
