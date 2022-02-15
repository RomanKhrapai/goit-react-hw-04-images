import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Overlay } from './Overlay.styles';
import { ModalWindow } from './ModalWindow.styles';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  const hendeleKeyDoun = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const hendleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', hendeleKeyDoun);
    return () => {
      window.removeEventListener('keydown', hendeleKeyDoun);
    };
  });

  return createPortal(
    <Overlay onClick={hendleBackDropClick}>
      <ModalWindow> {children} </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

export default Modal;
