import React from 'react';
// import './styles/modal.css';

const Modal = ({ onClose, children, title }) => {
  return (
<dialog open>
  <article>
    <h4>{title}</h4>
    <p>
      {children}
    </p>
    <footer>
      <a href="#" role="button" onClick={onClose}>CLOSE</a>
    </footer>
  </article>
</dialog>
  );
};

export default Modal;