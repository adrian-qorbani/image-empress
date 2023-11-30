import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.scss";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr'], 
    fallbackLng: 'en', 
    debug: false,
    interpolation: {
      escapeValue: false, 
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
