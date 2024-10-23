// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Translation resources for different languages
const resources = {
  en: {
    translation: {
      login: {
        title: 'Login',
        username: 'Username',
        password: 'Password',
        submit: 'Login',
      },
      dashboard: {
        welcome: 'Welcome to the Admin Dashboard!',
      },
      register: {
        title: 'Register',
      },
      logout: 'Logout',
    },
  },
  si: {
    translation: {
      login: {
        title: 'ඇතුල්වීම',
        username: 'පරිශීලක නාමය',
        password: 'මුරපදය',
        submit: 'ඇතුල්වීම',
      },
      dashboard: {
        welcome: 'පරිපාලක පුවරුවට සාදරයෙන් පිළිගනිමු!',
      },
      register: {
        title: 'ලියාපදිංචි වීම',
      },
      logout: 'ඉවත්වීම',
    },
  },
  ta: {
    translation: {
      login: {
        title: 'உள்நுழை',
        username: 'பயனர் பெயர்',
        password: 'கடவுச்சொல்',
        submit: 'உள்நுழை',
      },
      dashboard: {
        welcome: 'நிர்வாக டாஷ்போர்டுக்கு வரவேற்கிறோம்!',
      },
      register: {
        title: 'பதிவு செய்க',
      },
      logout: 'வெளியேறு',
    },
  },
};

// Initialize i18n
i18n
  .use(HttpApi) // Load translations from files or backend (if needed)
  .use(LanguageDetector) // Detects the user's language preference
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
