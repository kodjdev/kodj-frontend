import { Resource } from 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof import('./locales/en/common.json');
      eventRegister: typeof import('./locales/en/eventRegister.json');
    };
  }
}

export const resources: Resource = {
  en: {
    common: require('./locales/en/common.json'),
    eventRegister: require('./locales/en/eventRegister.json'),
  },
  ko: {
    common: require('./locales/ko/common.json'),
    eventRegister: require('./locales/ko/eventRegister.json'),
  },
} as const; 