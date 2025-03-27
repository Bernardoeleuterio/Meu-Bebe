import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { welcome: "Welcome", login: "Login" } },
  pt: { translation: { welcome: "Bem-vindo", login: "Entrar" } },
  es: { translation: { welcome: "Bienvenido", login: "Iniciar sesión" } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: navigator.language || "en",
  interpolation: { escapeValue: false },
});

export default i18n;
