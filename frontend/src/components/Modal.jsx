import React from 'react';
import { useTranslation } from "react-i18next";

// import './styles/modal.css';

const Modal = ({ onClose, children, title }) => {
  const { t } = useTranslation();
  return (
<dialog open>
  <article>
    <h4>{title}</h4>
    <p>
      {children}
    </p>
    <footer>
      <a href="#" role="button" onClick={onClose}>{t("pref-close")}</a>
    </footer>
  </article>
</dialog>
  );
};

export default Modal;