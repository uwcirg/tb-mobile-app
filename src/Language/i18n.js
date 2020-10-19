//From example https://itnext.io/ultimate-localization-of-react-mobx-app-with-i18next-efab77712149
import i18n from 'i18next';
import English from "./Locales/en/translation.json"
import Spanish from "./Locales/es-AR/translation.json"
import { initReactI18next } from "react-i18next";

// import XHR from 'i18next-xhr-backend';
// const backendOpts = {
//   loadPath: `/locales/{{lng}}/{{ns}}.json`
// }

const resources = {
  en: {translation: English }
  ,
  "es-AR": {translation: Spanish}
};

// const getLanguage = () => {
// if(!window || !window._env || !window._env.DEFAULT_LOCALE){
//   return "en"
// }else{
//   return window._env.DEFAULT_LOCALE
// }
// }
//  lng: getLanguage(),

i18n.use(initReactI18next)
.init({
  resources,
  fallbackLng: "en",
  ns: ['translation'],
  debug: true
});

export default i18n;