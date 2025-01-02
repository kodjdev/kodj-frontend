import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "../@types/resources";

export const defaultNS = "about";

i18next.use(initReactI18next).init({
  lng: "uz", // if you're using a language detector, do not define the lng option
  fallbackLng: "uz",
  debug: true,
  defaultNS,
  resources,
});

export default i18next;
