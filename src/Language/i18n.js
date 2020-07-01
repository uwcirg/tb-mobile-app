//From example https://itnext.io/ultimate-localization-of-react-mobx-app-with-i18next-efab77712149
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from "i18next-browser-languagedetector";

const backendOpts = {
  loadPath: `/locales/{{lng}}/{{ns}}.json`
}

i18n.init({
  backend: backendOpts
})

i18n.use(XHR)
.use(LanguageDetector)
.init({
  fallbackLng: "en",
  ns: ['translation','onboarding','reminders'],
  load: "languageOnly",
  debug: false
});

export default i18n;