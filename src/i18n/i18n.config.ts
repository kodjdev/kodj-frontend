import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffect } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';

import uzHome from '@/pages/Home/langs/uz-home.json';
import enHome from '@/pages/Home/langs/en-home.json';
import enAbout from '@/pages/About/langs/en-about.json';
import uzAbout from '@/pages/About/langs/uz-about.json';
import uzBenefits from '@/pages/Home/langs/uz-benefits.json';
import enBenefits from '@/pages/Home/langs/en-benefits.json';
import enSpeakers from '@/pages/Speakers/langs/en-speakers.json';
import uzSpeakers from '@/pages/Speakers/langs/uz-speakers.json';
import enEvents from '@/pages/Events/langs/en-events.json';
import uzEvents from '@/pages/Events/langs/uz-events.json';
import enEventRegister from '@/pages/Events/EventRegister/langs/en-register.json';
import uzEventRegister from '@/pages/Events/EventRegister/langs/uz-register.json';
import enAuth from '@/pages/Auth/langs/en-auth.json';
import uzAuth from '@/pages/Auth/langs/uz-auth.json';
import enMypage from '@/pages/MyPage/langs/en-mypage.json';
import uzMypage from '@/pages/MyPage/langs/uz-mypage.json';
import enNews from '@/pages/News/langs/en-news.json';
import uzNews from '@/pages/News/langs/uz-news.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'about';
        resources: {
            home: typeof enHome;
            about: typeof enAbout;
            news: typeof enNews;
            benefits: typeof enBenefits;
            speakers: typeof enSpeakers;
            events: typeof enEvents;
            eventRegister: typeof enEventRegister;
            auth: typeof enAuth;
            mypage: typeof enMypage;
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
                about: enAbout,
                news: enNews,
                benefits: enBenefits,
                speakers: enSpeakers,
                events: enEvents,
                eventRegister: enEventRegister,
                auth: enAuth,
                mypage: enMypage,
            },
            uz: {
                home: uzHome,
                about: uzAbout,
                news: uzNews,
                benefits: uzBenefits,
                speakers: uzSpeakers,
                events: uzEvents,
                eventRegister: uzEventRegister,
                auth: uzAuth,
                mypage: uzMypage,
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        ns: ['home', 'about', 'news', 'benefits', 'speakers', 'events', 'eventRegister', 'auth', 'mypage'],
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
